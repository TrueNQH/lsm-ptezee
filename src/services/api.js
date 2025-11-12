// Simple API client for frontend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`
  const isFormData = options?.body && typeof FormData !== 'undefined' && options.body instanceof FormData
  const headers = options.headers || (isFormData ? {} : { 'Content-Type': 'application/json' })
  const res = await fetch(url, {
    headers,
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`)
  }
  return res.json()
}

export async function get(path) {
  return request(path)
}

export async function post(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

export async function postForm(path, formData, headers = {}) {
  return request(path, { method: 'POST', body: formData, headers })
}

export { API_BASE }