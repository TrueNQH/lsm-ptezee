// API Test Script → save one JSON report per run
// Usage:
//   node src/test/api.js
//   node src/test/api.js --out logs --name dla-lms
import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API_BASE = process.env.API_BASE || `http://localhost:${process.env.PORT || 4000}`

// -------- simple argv parsing --------
const args = (() => {
  const a = { out: 'logs', name: 'api-test' }
  for (let i = 2; i < process.argv.length; i++) {
    const [k, v] = process.argv[i].includes('=')
      ? process.argv[i].split('=')
      : [process.argv[i], process.argv[i + 1]]
    if (k === '--out') a.out = v, i += !process.argv[i].includes('=') ? 1 : 0
    if (k === '--name') a.name = v, i += !process.argv[i].includes('=') ? 1 : 0
  }
  return a
})()

// -------- console helpers (unchanged) --------
function logHeader(title) {
  console.log('\n' + '='.repeat(80))
  console.log(title)
  console.log('='.repeat(80))
}
function logRequest({ name, method, url, headers, body }) {
  logHeader(`REQUEST: ${name}`)
  console.log('Method:', method)
  console.log('URL   :', url)
  if (headers) console.log('Headers:', headers)
  if (body !== undefined) console.log('Body   :', JSON.stringify(body, null, 2))
}
function logResponseToConsole(r) {
  console.log('Status :', r.status, r.statusText)
  console.log('CT     :', r.contentType)
  console.log('Body   :', r.isJson ? JSON.stringify(r.body, null, 2) : r.body)
}

// -------- report collector --------
const REPORT = {
  meta: {
    startedAt: new Date().toISOString(),
    apiBase: API_BASE,
    node: process.version,
    platform: process.platform,
    argv: process.argv.slice(2),
  },
  steps: [],
  summary: { total: 0, ok: 0, fail: 0, durationMs: 0 },
}

function nowIso() { return new Date().toISOString() }

async function readResponse(res) {
  const headers = Object.fromEntries(res.headers.entries())
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const text = await res.text().catch(() => '')
  let parsed = null
  if (isJson) {
    try { parsed = JSON.parse(text) } catch { parsed = null }
  }
  return {
    status: res.status,
    statusText: res.statusText,
    headers,
    contentType,
    isJson,
    body: isJson ? parsed : text,
  }
}

async function call({ name, path: p, method = 'GET', body }) {
  const url = `${API_BASE}${p}`
  const headers = { 'Content-Type': 'application/json' }
  logRequest({ name, method, url, headers, body })

  const started = Date.now()
  const step = {
    name,
    timestamp: nowIso(),
    request: { method, url, headers, body: body ?? null },
    response: null,
    error: null,
    durationMs: 0,
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    const data = await readResponse(res)
    step.response = data
    logResponseToConsole(data)
  } catch (err) {
    step.error = { message: err?.message || String(err) }
    console.error('ERROR  :', step.error.message)
  } finally {
    step.durationMs = Date.now() - started
    REPORT.steps.push(step)
    REPORT.summary.total += 1
    if (step.response && step.response.status >= 200 && step.response.status < 400) {
      REPORT.summary.ok += 1
    } else {
      REPORT.summary.fail += 1
    }
  }
}

async function saveReport() {
  REPORT.meta.endedAt = new Date().toISOString()
  REPORT.summary.durationMs =
    new Date(REPORT.meta.endedAt).getTime() - new Date(REPORT.meta.startedAt).getTime()

  const ts = REPORT.meta.endedAt.replace(/[:.]/g, '-')
  const fileName = `${args.name}-${ts}.json`
  const outDir = path.resolve(process.cwd(), args.out)
  const outPath = path.join(outDir, fileName)

  await mkdir(outDir, { recursive: true })
  await writeFile(outPath, JSON.stringify(REPORT, null, 2), 'utf8')
  console.log(`\nSaved report → ${outPath}`)
}

async function main() {
  console.log('API_BASE =', API_BASE)

  // Health
  await call({ name: 'Health', path: '/api/health' })

  // Auth login (demo)
  await call({ name: 'Auth Login (Admin)', path: '/api/auth/login', method: 'POST', body: { email: 'admin@dla.com', password: 'admin123' } })
  await call({ name: 'Auth Login (Student)', path: '/api/auth/login', method: 'POST', body: { email: 'student@dla.com', password: 'student123' } })
  await call({ name: 'Auth Login (Invalid)', path: '/api/auth/login', method: 'POST', body: { email: 'invalid@dla.com', password: 'wrong' } })

  // User
  await call({ name: 'User Profile', path: '/api/user/profile' })
  await call({ name: 'User Login History', path: '/api/user/login-history' })
  await call({ name: 'User Skills', path: '/api/user/skills' })

  // Support
  await call({ name: 'Support FAQ', path: '/api/support/faq' })
  await call({ name: 'Support Categories', path: '/api/support/categories' })
  await call({ name: 'Support Contact', path: '/api/support/contact' })
  await call({ name: 'Support Chat Presets', path: '/api/support/chat' })
  await call({ name: 'Support Quick Actions', path: '/api/support/quick-actions' })
  await call({ name: 'Support Stats', path: '/api/support/stats' })

  // Home
  await call({ name: 'Home Features', path: '/api/home/features' })
  await call({ name: 'Home Partners', path: '/api/home/partners' })
  await call({ name: 'Home Stories', path: '/api/home/stories' })
  await call({ name: 'Home Testimonial Stats', path: '/api/home/stats' })

  console.log('\nAll tests completed.')
  await saveReport()
}

main().catch(async (e) => {
  console.error('Test runner failed:', e)
  REPORT.steps.push({
    name: 'RunnerError',
    timestamp: nowIso(),
    request: null,
    response: null,
    error: { message: e?.message || String(e) },
    durationMs: 0,
  })
  await saveReport()
  process.exit(1)
})