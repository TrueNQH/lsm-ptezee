import { Router } from 'express'
import { query } from '../db.js'
import bcrypt from 'bcryptjs'

const router = Router()

// Demo credentials mapping
const DEMO_ACCOUNTS = {
  'admin@dla.com': { password: 'admin123' },
  'student@dla.com': { password: 'student123' },
  'demo@dla.com': { password: 'demo123' },
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing email or password' })
  }

  // Try DB-based authentication first
  const { rows } = await query('select id, name, email, role, password_hash from users where email = $1 limit 1', [email])
  const user = rows[0]
  if (user?.password_hash) {
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    const { password_hash, ...safeUser } = user
    return res.json({ success: true, user: safeUser, token: 'mock-jwt-token' })
  }

  // Fallback to demo credentials if no password_hash in DB
  const demo = DEMO_ACCOUNTS[email]
  if (!demo || demo.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  if (!user) {
    // Fallback minimal user with role derived from email
    const role = email === 'admin@dla.com' ? 'admin' : 'student'
    return res.json({ success: true, user: { id: 'demo', name: 'Demo User', email, role }, token: 'mock-jwt-token' })
  }

  const { password_hash, ...safeUser } = user
  return res.json({ success: true, user: safeUser, token: 'mock-jwt-token' })
})

export default router