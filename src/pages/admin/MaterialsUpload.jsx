import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { postForm, get, API_BASE } from '../../services/api'

export default function MaterialsUpload() {
  const { user, token } = useAuth()
  const [title, setTitle] = useState('Introduction to English Grammar')
  const [description, setDescription] = useState('Learn the core parts of speech and basic sentence structure.')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [error, setError] = useState('')
  // Extended metadata fields
  const [courseId, setCourseId] = useState(1)
  const [skill, setSkill] = useState('grammar')
  const [level, setLevel] = useState('beginner')
  const [cefrLevel, setCefrLevel] = useState('A1')
  const [tags, setTags] = useState('parts of speech, sentence basics')

  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60')
  const [completed, setCompleted] = useState(false)

  // Non-IT friendly editors
  const [chaptersArr, setChaptersArr] = useState([
    { title: 'Welcome & goals', start: 0 },
    { title: 'Parts of speech', start: 75 },
    { title: 'Simple sentences', start: 420 },
    { title: 'Wrap-up', start: 870 }
  ])
  const [subtitlesArr, setSubtitlesArr] = useState([
    { start: 0, end: 5, text: 'Welcome to English Grammar basics.' },
    { start: 5, end: 10, text: "Today we'll learn about sentence structure." }
  ])
  const [notesArr, setNotesArr] = useState([''])
  // External transcription (ngrok FastAPI)
  const [language, setLanguage] = useState('vi')
  const [transcribeLoading, setTranscribeLoading] = useState(false)
  const [transcribeError, setTranscribeError] = useState('')
  const [transcribeResult, setTranscribeResult] = useState(null)
  const [autoFillInfo, setAutoFillInfo] = useState(null)

  const fetchVideos = async () => {
    try {
      const res = await get('/api/materials/videos')
      setVideos(res.videos || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchVideos() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title || !file || !description || !skill || !level || !cefrLevel || !tags ||  !thumbnail) {
      setError('Vui lòng điền đầy đủ tất cả thông tin theo định dạng yêu cầu')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
     
      form.append('skill', skill)
      form.append('level', level)
      form.append('cefrLevel', cefrLevel)
      form.append('tags', tags)

      form.append('thumbnail', thumbnail)
      form.append('completed', String(completed))
   
      form.append('chapters', JSON.stringify(chaptersArr))
      form.append('notes', JSON.stringify(notesArr))
      form.append('subtitles', JSON.stringify(subtitlesArr))
      if (user?.id) form.append('userId', String(user.id))
      form.append('video', file)
      const headers = {
        'x-user-role': user?.role || '',
        'x-user-id': user?.id ? String(user.id) : '',
        'authorization': token ? `Bearer ${token}` : ''
      }
      const res = await postForm('/api/materials/videos', form, headers)
      setTitle('Introduction to English Grammar')
      setDescription('Learn the core parts of speech and basic sentence structure.')
      setFile(null)
      setCourseId(1)
      setSkill('grammar')
      setLevel('beginner')
      setCefrLevel('A1')
      setTags('parts of speech, sentence basics')

      setCompleted(false)
    
      setChaptersArr([
        { title: 'Welcome & goals', start: 0 },
        { title: 'Parts of speech', start: 75 },
        { title: 'Simple sentences', start: 420 },
        { title: 'Wrap-up', start: 870 }
      ])
      setSubtitlesArr([
        { start: 0, end: 5, text: 'Welcome to English Grammar basics.' },
        { start: 5, end: 10, text: "Today we'll learn about sentence structure." }
      ])
      setNotesArr([''])
      await fetchVideos()
    } catch (e) {
      setError(e?.message || 'Upload thất bại')
    } finally {
      setLoading(false)
    }
  }

  // Map transcription result into form inputs
  const applyTranscriptionToForm = (data) => {
    if (!data) return
    try {
      // Title from filename (without extension)
      if (data.filename) {
        const base = data.filename.replace(/\.[^/.]+$/, '')
        setTitle(base || data.filename)
      }
      // Prefer explicit fields if provided
      if (data.Title) setTitle(String(data.Title))
      if (data.Description) setDescription(String(data.Description))
      if (data.Skill) setSkill(String(data.Skill))
      if (data.Level) setLevel(String(data.Level))
      if (data['CEFR Level']) setCefrLevel(String(data['CEFR Level']))
      if (data.Tags) setTags(String(data.Tags))
      // Language into lang input
      if (data.language) setLanguage(String(data.language))
      // Notes from full transcript
      if (data.fullTranscript) setNotesArr([String(data.fullTranscript)])
      // Subtitles from segments
      if (Array.isArray(data.segments) && data.segments.length > 0) {
        const mapped = data.segments.map(s => ({
          start: typeof s.start === 'number' ? s.start : parseFloat(s.start) || 0,
          end: typeof s.end === 'number' ? s.end : parseFloat(s.end) || 0,
          text: s.text ? String(s.text) : ''
        }))
        setSubtitlesArr(mapped)
      }
      // Info for UI summary
      setAutoFillInfo({
        duration: typeof data.duration === 'number' ? data.duration : null,
        segments: Array.isArray(data.segments) ? data.segments.length : 0,
        model: data.model || null,
        filename: data.filename || null,
        language: data.language || null,
        summary: data.Summary || null,
      })
    } catch (err) {
      console.error('Failed to apply transcription to form:', err)
    }
  }

  // Send file to external FastAPI via ngrok for transcription
  const analyzeWithNgrok = async () => {
    setTranscribeError('')
    setTranscribeResult(null)
    try {
      if (!file) {
        setTranscribeError('Vui lòng chọn video trước khi phân tích')
        return
      }
      setTranscribeLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      // Tên trường 'lang' phải khớp với tham số trong FastAPI: lang: str = Form("vi")
      formData.append('lang', language)
      const API_URL = 'https://5b97bc98a6e8.ngrok-free.app/transcribe'
      const res = await fetch(API_URL, {
        method: 'POST',
        // Không thiết lập Content-Type thủ công; để FormData tự xử lý multipart/form-data
        headers: { 'ngrok-skip-browser-warning': 'true' },
        body: formData,
      })
      if (!res.ok) {
        const text = await res.text()
        console.log('Response text:', text)
        throw new Error(`Phân tích lỗi (${res.status}): ${text}`)
      }
      // Thử parse JSON, nếu thất bại thì lấy text
      let data = null
      try {
        data = await res.json()
      } catch {
        data = { result: await res.text() }
      }
      setTranscribeResult(data)
      // Auto-apply into inputs when shape matches expected
      if (data && (data.filename || data.fullTranscript || data.segments)) {
        applyTranscriptionToForm(data)
      }
    } catch (e) {
      setTranscribeError(e?.message || 'Phân tích thất bại')
    } finally {
      setTranscribeLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Video Materials</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg border">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {/* Upload section moved to top and restyled */}
        <div className="space-y-2 p-4 rounded border bg-gray-50 dark:bg-gray-800/40">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Upload video & phân tích</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Video file</label>
              <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
              <input value={language} onChange={(e)=>setLanguage(e.target.value)} className="w-full border rounded px-3 py-2 mb-2" placeholder="vi" />
              <button type="button" onClick={analyzeWithNgrok} disabled={transcribeLoading || !file} className="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50">
                {transcribeLoading ? 'Đang phân tích...' : 'Phân tích'}
              </button>
              {transcribeError && <span className="block mt-1 text-xs text-red-600">{transcribeError}</span>}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Ví dụ: Grammar Intro" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} placeholder="Mô tả ngắn" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <div>
            <label className="block text-sm font-medium mb-1">Skill</label>
            <input value={skill} onChange={(e)=>setSkill(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <input value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CEFR Level</label>
            <input value={cefrLevel} onChange={(e)=>setCefrLevel(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (phân cách bằng dấu phẩy)</label>
            <input value={tags} onChange={(e)=>setTags(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
         
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
            <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex items-center gap-2">
            <input id="completed" type="checkbox" checked={completed} onChange={(e)=>setCompleted(e.target.checked)} />
            <label htmlFor="completed" className="text-sm">Completed</label>
          </div>
         
        </div>
        {/* Chapters Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Chapters</label>
            <button type="button" onClick={()=>setChaptersArr([...chaptersArr, { title: '', start: 0 }])} className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">+ Thêm chapter</button>
          </div>
          {chaptersArr.map((ch, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Tiêu đề"
                value={ch.title} onChange={(e)=>{
                  const next = [...chaptersArr]; next[idx] = { ...ch, title: e.target.value }; setChaptersArr(next)
                }} />
              <input type="number" className="border rounded px-3 py-2" placeholder="Bắt đầu (giây)"
                value={ch.start} onChange={(e)=>{
                  const next = [...chaptersArr]; next[idx] = { ...ch, start: Number(e.target.value) || 0 }; setChaptersArr(next)
                }} />
              <button type="button" onClick={()=>{
                const next = chaptersArr.filter((_, i)=> i !== idx); setChaptersArr(next)
              }} className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">Xóa</button>
            </div>
          ))}
        </div>
        {/* Subtitles Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Subtitles</label>
            <button type="button" onClick={()=>setSubtitlesArr([...subtitlesArr, { start: 0, end: 0, text: '' }])} className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">+ Thêm subtitle</button>
          </div>
          {subtitlesArr.map((sb, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input type="number" className="border rounded px-3 py-2" placeholder="Bắt đầu"
                value={sb.start} onChange={(e)=>{
                  const next = [...subtitlesArr]; next[idx] = { ...sb, start: Number(e.target.value) || 0 }; setSubtitlesArr(next)
                }} />
              <input type="number" className="border rounded px-3 py-2" placeholder="Kết thúc"
                value={sb.end} onChange={(e)=>{
                  const next = [...subtitlesArr]; next[idx] = { ...sb, end: Number(e.target.value) || 0 }; setSubtitlesArr(next)
                }} />
              <input className="border rounded px-3 py-2" placeholder="Nội dung"
                value={sb.text} onChange={(e)=>{
                  const next = [...subtitlesArr]; next[idx] = { ...sb, text: e.target.value }; setSubtitlesArr(next)
                }} />
              <button type="button" onClick={()=>{
                const next = subtitlesArr.filter((_, i)=> i !== idx); setSubtitlesArr(next)
              }} className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">Xóa</button>
            </div>
          ))}
        </div>
        {/* Notes Editor (textarea) + Summary */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Notes</label>
          <textarea rows={6} className="w-full border rounded px-3 py-2" placeholder="Ghi chú"
            value={notesArr[0] || ''}
            onChange={(e)=> setNotesArr([e.target.value])}
          />
          {autoFillInfo?.summary && (
            <div className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded border">
              <div className="font-medium mb-1">Summary (từ phân tích)</div>
              <p className="whitespace-pre-wrap">{autoFillInfo.summary}</p>
            </div>
          )}
        </div>
        {/* Removed Kết quả phân tích block; controls moved above */}
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Đang upload...' : 'Upload'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Danh sách video đã upload</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map(v => (
            <div key={v.id} className="border rounded-lg p-3 bg-white dark:bg-gray-800">
              <div className="font-medium">{v.title}</div>
              {v.description && <div className="text-sm text-gray-600 mb-2">{v.description}</div>}
             
              <video src={`${API_BASE}${v.videoUrl || v.url}`} controls className="w-full rounded" />
              <div className="text-xs text-gray-500 mt-1">#{v.id} • CEFR {v.cefrLevel}</div>
            </div>
          ))}
          {videos.length === 0 && (
            <div className="text-sm text-gray-600">Chưa có video nào.</div>
          )}
        </div>
      </div>
    </div>
  )
}