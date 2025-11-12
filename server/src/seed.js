import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { initSchema, query } from './db.js'
import bcrypt from 'bcryptjs'

// Allow importing mock modules from frontend src/mock
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Dynamic import to avoid bundling issues
const rootDir = path.resolve(__dirname, '../../')
const supportMock = await import(pathToFileURL(path.join(rootDir, 'src/mock/support.js')).href)
const homeMock = await import(pathToFileURL(path.join(rootDir, 'src/mock/home.js')).href)
const userMock = await import(pathToFileURL(path.join(rootDir, 'src/mock/user.js')).href)

async function seedSupport() {
  const { faqData, supportCategories, contactInfo, chatResponses, quickActions, supportStats } = supportMock

  for (const f of faqData) {
    await query(
      'insert into faq (id, category, question, answer) values ($1,$2,$3,$4) on conflict (id) do update set category=excluded.category, question=excluded.question, answer=excluded.answer',
      [f.id, f.category, f.question, f.answer]
    )
  }

  for (const c of supportCategories) {
    await query(
      'insert into support_categories (value, label) values ($1,$2) on conflict (value) do update set label=excluded.label',
      [c.value, c.label]
    )
  }

  await query(
    `insert into contact_info (id, email, phone, address, weekdays, weekends, resp_email, resp_phone, resp_chat)
     values (1,$1,$2,$3,$4,$5,$6,$7,$8)
     on conflict (id) do update set email=excluded.email, phone=excluded.phone, address=excluded.address, weekdays=excluded.weekdays, weekends=excluded.weekends, resp_email=excluded.resp_email, resp_phone=excluded.resp_phone, resp_chat=excluded.resp_chat`,
    [
      contactInfo.email,
      contactInfo.phone,
      contactInfo.address,
      contactInfo.businessHours?.weekdays || null,
      contactInfo.businessHours?.weekends || null,
      contactInfo.responseTime?.email || null,
      contactInfo.responseTime?.phone || null,
      contactInfo.responseTime?.chat || null
    ]
  )

  for (const cr of chatResponses) {
    await query(
      'insert into chat_responses (id, message, timestamp, sender, typing) values ($1,$2,$3,$4,$5) on conflict (id) do update set message=excluded.message, timestamp=excluded.timestamp, sender=excluded.sender, typing=excluded.typing',
      [cr.id, cr.message, cr.timestamp, cr.sender, cr.typing]
    )
  }

  for (const qa of quickActions) {
    await query(
      'insert into quick_actions (title, description, icon, action) values ($1,$2,$3,$4)',
      [qa.title, qa.description, qa.icon, qa.action]
    )
  }

  await query(
    `insert into support_stats (id, average_response_time, satisfaction_rate, resolved_tickets, active_agents)
     values (1,$1,$2,$3,$4)
     on conflict (id) do update set average_response_time=excluded.average_response_time, satisfaction_rate=excluded.satisfaction_rate, resolved_tickets=excluded.resolved_tickets, active_agents=excluded.active_agents`,
    [supportStats.averageResponseTime, supportStats.satisfactionRate, supportStats.resolvedTickets, supportStats.activeAgents]
  )
}

async function seedHome() {
  const { features, partners, stories, testimonialStats } = homeMock

  for (const f of features) {
    await query(
      'insert into features (id, title, description, icon, color) values ($1,$2,$3,$4,$5) on conflict (id) do update set title=excluded.title, description=excluded.description, icon=excluded.icon, color=excluded.color',
      [f.id, f.title, f.description, f.icon, f.color]
    )
  }

  for (const p of partners) {
    await query(
      'insert into partners (id, name, logo) values ($1,$2,$3) on conflict (id) do update set name=excluded.name, logo=excluded.logo',
      [p.id, p.name, p.logo]
    )
  }

  for (const s of stories) {
    await query(
      'insert into stories (id, name, role, avatar, quote, score, country) values ($1,$2,$3,$4,$5,$6,$7) on conflict (id) do update set name=excluded.name, role=excluded.role, avatar=excluded.avatar, quote=excluded.quote, score=excluded.score, country=excluded.country',
      [s.id, s.name, s.role, s.avatar, s.quote, s.score, s.country]
    )
  }

  await query(
    `insert into testimonial_stats (id, total_students, average_improvement, success_rate, countries)
     values (1,$1,$2,$3,$4)
     on conflict (id) do update set total_students=excluded.total_students, average_improvement=excluded.average_improvement, success_rate=excluded.success_rate, countries=excluded.countries`,
    [testimonialStats.totalStudents, testimonialStats.averageImprovement, testimonialStats.successRate, testimonialStats.countries]
  )
}

async function seedUser() {
  const { user } = userMock

  const userRes = await query(
    `insert into users (name, email, phone, date_of_birth, nationality, avatar, consent_given, ui_language, email_notifications, sms_notifications, test_reminders, class_reminders, progress_reminders, two_factor_enabled, role)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     returning id`,
    [
      user.name,
      user.email,
      user.phone,
      user.dateOfBirth,
      user.nationality,
      user.avatar,
      user.consentGiven,
      user.uiLanguage,
      user.emailNotifications,
      user.smsNotifications,
      user.testReminders,
      user.classReminders,
      user.progressReminders,
      user.twoFactorEnabled,
      'student'
    ]
  )
  const userId = userRes.rows[0].id

  for (const lh of user.loginHistory) {
    await query(
      'insert into login_history (id, user_id, date, ip, device) values ($1,$2,$3,$4,$5) on conflict (id) do update set user_id=excluded.user_id, date=excluded.date, ip=excluded.ip, device=excluded.device',
      [lh.id, userId, lh.date, lh.ip, lh.device]
    )
  }

  for (const sf of user.skillFocus) {
    await query(
      'insert into skill_focus (user_id, value) values ($1,$2) on conflict (user_id, value) do nothing',
      [userId, sf]
    )
  }

  // Seed admin user and demo student
  const adminPasswordHash = await bcrypt.hash('admin123', 10)
  const { rows: adminRows } = await query('select id from users where email = $1 limit 1', ['admin@dla.com'])
  if (adminRows[0]?.id) {
    await query('update users set name = $1, role = $2, password_hash = $3 where id = $4', ['Administrator', 'admin', adminPasswordHash, adminRows[0].id])
  } else {
    await query('insert into users (name, email, role, password_hash) values ($1,$2,$3,$4)', ['Administrator', 'admin@dla.com', 'admin', adminPasswordHash])
  }

  const studentPasswordHash = await bcrypt.hash('student123', 10)
  const { rows: studentRows } = await query('select id from users where email = $1 limit 1', ['student@dla.com'])
  if (studentRows[0]?.id) {
    await query('update users set name = $1, role = $2, password_hash = $3 where id = $4', ['PTEZEE Student', 'student', studentPasswordHash, studentRows[0].id])
  } else {
    await query('insert into users (name, email, role, password_hash) values ($1,$2,$3,$4)', ['PTEZEE Student', 'student@dla.com', 'student', studentPasswordHash])
  }
}

async function main() {
  await initSchema()
  await seedSupport()
  await seedHome()
  await seedUser()
  console.log('Seed completed.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})