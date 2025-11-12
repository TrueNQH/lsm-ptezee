import express from 'express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'
import { initSchema } from './db.js'
import supportRouter from './routes/support.js'
import homeRouter from './routes/home.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import materialsRouter from './routes/materials.js'

dotenv.config()

const app = express()
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

// Ensure uploads directory exists and serve static files
const uploadsDir = path.join(process.cwd(), 'uploads')
const uploadsVideosDir = path.join(uploadsDir, 'videos')
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)
  if (!fs.existsSync(uploadsVideosDir)) fs.mkdirSync(uploadsVideosDir)
} catch (e) {
  console.warn('Failed to ensure uploads directories:', e?.message || e)
}
app.use('/uploads', express.static(uploadsDir))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' })
})

app.use('/api/support', supportRouter)
app.use('/api/home', homeRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/materials', materialsRouter)

const port = process.env.PORT || 4000

initSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend server listening on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to init schema', err)
    process.exit(1)
  })