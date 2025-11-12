import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { query } from '../db.js'

const router = Router()

// Configure multer storage to save videos under uploads/videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads', 'videos'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4'
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_')
    const unique = Date.now()
    cb(null, `${base}-${unique}${ext}`)
  }
})

const upload = multer({ storage })

// Simple admin guard using headers (mock auth)
function requireAdmin(req, res, next) {
  const role = (req.headers['x-user-role'] || '').toString()
  if (role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin role required' })
  }
  next()
}

// List videos
router.get('/videos', async (req, res) => {
  const { rows } = await query(`
    select id, title, description, url,
           course_id, skill, level, cefr_level, tags,
           thumbnail, completed, chapters, notes, subtitles,
           created_by, created_at
    from materials_videos
    order by created_at desc
  `)
  const videos = rows.map(r => ({
    id: r.id,
    courseId: r.course_id ?? null,
    title: r.title,
    description: r.description ?? '',
    skill: r.skill ?? '',
    level: r.level ?? '',
    cefrLevel: r.cefr_level ?? '',
    tags: Array.isArray(r.tags) ? r.tags : (r.tags ? r.tags : []),
    thumbnail: r.thumbnail ?? '',
    videoUrl: r.url,
    completed: r.completed ?? false,
    chapters: Array.isArray(r.chapters) ? r.chapters : (r.chapters ? r.chapters : []),
    notes: Array.isArray(r.notes) ? r.notes : (r.notes ? r.notes : []),
    subtitles: Array.isArray(r.subtitles) ? r.subtitles : (r.subtitles ? r.subtitles : []),
    createdBy: r.created_by ?? null,
    createdAt: r.created_at
  }))
  res.json({ success: true, videos })
})

// Get one video by id
router.get('/videos/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await query(`
    select id, title, description, url,
           course_id, skill, level, cefr_level, tags,
           thumbnail, completed, chapters, notes, subtitles,
           created_by, created_at
    from materials_videos
    where id = $1
    limit 1
  `, [id])
  const r = rows[0]
  if (!r) return res.status(404).json({ success: false, message: 'Video not found' })
  const video = {
    id: r.id,
    courseId: r.course_id ?? null,
    title: r.title,
    description: r.description ?? '',
    skill: r.skill ?? '',
    level: r.level ?? '',
    cefrLevel: r.cefr_level ?? '',
    tags: Array.isArray(r.tags) ? r.tags : (r.tags ? r.tags : []),
    thumbnail: r.thumbnail ?? '',
    videoUrl: r.url,
    completed: r.completed ?? false,
    chapters: Array.isArray(r.chapters) ? r.chapters : (r.chapters ? r.chapters : []),
    notes: Array.isArray(r.notes) ? r.notes : (r.notes ? r.notes : []),
    subtitles: Array.isArray(r.subtitles) ? r.subtitles : (r.subtitles ? r.subtitles : []),
    createdBy: r.created_by ?? null,
    createdAt: r.created_at
  }
  res.json({ success: true, video })
})

// Upload new video (admin)
router.post('/videos', requireAdmin, upload.single('video'), async (req, res) => {
  try {
    const b = req.body || {}
    // Validate required fields
    const required = ['title','description','skill','level','cefrLevel','tags','thumbnail','completed','chapters','subtitles']
    const missing = required.filter(k => !(k in b))
    if (missing.length) return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(', ')}` })
    if (!req.file) return res.status(400).json({ success: false, message: 'Missing video file' })

    const publicUrl = `/uploads/videos/${req.file.filename}`
    const headerUserId = req.headers['x-user-id']
    const createdBy = headerUserId ? Number(headerUserId) : (b.userId ? Number(b.userId) : null)

    // Parse types
    const courseId = (b.courseId !== undefined && b.courseId !== '') ? Number(b.courseId) : null
    const completed = String(b.completed).toLowerCase() === 'true'
    const tags = safeJsonArray(b.tags)
    const chapters = safeJsonArray(b.chapters)
    const notes = safeJsonArray(b.notes ?? '[]')
    const subtitles = safeJsonArray(b.subtitles)

    // Insert
    const insert = await query(
      `insert into materials_videos (
        title, description, url, created_by,
        course_id, skill, level, cefr_level, tags,
        thumbnail, completed,
        chapters, notes, subtitles
      ) values (
        $1,$2,$3,$4,
        $5,$6,$7,$8,$9::jsonb,
        $10,$11,
        $12::jsonb,$13::jsonb,$14::jsonb
      )
      returning id, title, description, url, created_by, created_at,
        course_id, skill, level, cefr_level, tags,
        thumbnail, completed,
        chapters, notes, subtitles`,
      [
        b.title, b.description, publicUrl, createdBy,
        courseId, b.skill, b.level, b.cefrLevel, JSON.stringify(tags),
        b.thumbnail, completed,
        JSON.stringify(chapters), JSON.stringify(notes), JSON.stringify(subtitles)
      ]
    )

    const r = insert.rows[0]
    const video = {
      id: r.id,
      courseId: r.course_id,
      title: r.title,
      description: r.description,
      skill: r.skill,
      level: r.level,
      cefrLevel: r.cefr_level,
      tags: r.tags,
      thumbnail: r.thumbnail,
      videoUrl: r.url,
      completed: r.completed,
      chapters: r.chapters,
      notes: r.notes,
      subtitles: r.subtitles,
      createdBy: r.created_by,
      createdAt: r.created_at
    }
    res.status(201).json({ success: true, video })
  } catch (e) {
    res.status(500).json({ success: false, message: e?.message || 'Upload failed' })
  }
})

function safeJsonArray(val) {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    const s = val.trim()
    if (!s) return []
    // allow comma separated strings for tags
    if (!s.startsWith('[')) {
      return s.split(',').map(x => x.trim()).filter(Boolean)
    }
    try { const parsed = JSON.parse(s); return Array.isArray(parsed) ? parsed : [] } catch { return [] }
  }
  if (val && typeof val === 'object') return [val]
  return []
}

export default router