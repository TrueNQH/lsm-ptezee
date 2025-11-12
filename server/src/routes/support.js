import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/faq', async (req, res) => {
  const { rows } = await query('select * from faq order by id asc')
  res.json(rows)
})

router.get('/categories', async (req, res) => {
  const { rows } = await query('select * from support_categories order by label asc')
  res.json(rows)
})

router.get('/contact', async (req, res) => {
  const { rows } = await query('select * from contact_info where id = 1')
  res.json(rows[0] || null)
})

router.get('/chat', async (req, res) => {
  const { rows } = await query('select * from chat_responses order by id asc')
  res.json(rows)
})

router.get('/quick-actions', async (req, res) => {
  const { rows } = await query('select * from quick_actions order by id asc')
  res.json(rows)
})

router.get('/stats', async (req, res) => {
  const { rows } = await query('select * from support_stats where id = 1')
  res.json(rows[0] || null)
})

export default router