import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/features', async (req, res) => {
  const { rows } = await query('select * from features order by id asc')
  res.json(rows)
})

router.get('/partners', async (req, res) => {
  const { rows } = await query('select * from partners order by id asc')
  res.json(rows)
})

router.get('/stories', async (req, res) => {
  const { rows } = await query('select * from stories order by id asc')
  res.json(rows)
})

router.get('/stats', async (req, res) => {
  const { rows } = await query('select * from testimonial_stats where id = 1')
  res.json(rows[0] || null)
})

export default router