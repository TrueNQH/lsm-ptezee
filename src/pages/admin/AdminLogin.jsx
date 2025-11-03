import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@dla.com')
  const [password, setPassword] = useState('admin123')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const res = login(email, password)
    if (res.ok) navigate(res.redirect || '/admin')
    else alert(res.error)
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-lg border p-6">
      <h1 className="text-xl font-bold">Admin Sign in (mock)</h1>
      <input className="w-full rounded-md border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full rounded-md border px-3 py-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <button className="w-full rounded-md bg-brand px-3 py-2 text-white" type="submit">Sign in</button>
    </form>
  )
}