import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/profile', async (req, res) => {
  const { rows } = await query('select * from users limit 1')
  res.json(rows[0] || null)
})

router.get('/login-history', async (req, res) => {
  const { rows: users } = await query('select id from users limit 1')
  const userId = users[0]?.id
  const { rows } = await query('select * from login_history where user_id = $1 order by id asc', [userId || 1])
  res.json(rows)
})

router.get('/skills', async (req, res) => {
  const { rows: users } = await query('select id from users limit 1')
  const userId = users[0]?.id
  const { rows } = await query('select value from skill_focus where user_id = $1 order by value asc', [userId || 1])
  res.json(rows.map(r => r.value))
})

export default router