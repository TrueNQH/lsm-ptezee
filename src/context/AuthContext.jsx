import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { post } from '../services/api'

const AuthContext = createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useState({ id: 'guest', name: 'Guest', role: 'guest', email: '' })
  const [token, setToken] = useState('')

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dla_user')
    const savedToken = localStorage.getItem('dla_token')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('dla_user')
      }
    }
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const res = await post('/api/auth/login', { email, password })
      if (res?.success && res?.user) {
        const u = res.user
        setUser(u)
        localStorage.setItem('dla_user', JSON.stringify(u))
        if (res?.token) {
          setToken(res.token)
          localStorage.setItem('dla_token', res.token)
        }
        const redirect = u.role === 'admin' ? '/admin' : '/student/overview'
        return { ok: true, redirect }
      }
      return { ok: false, error: res?.message || 'Đăng nhập thất bại' }
    } catch (err) {
      return { ok: false, error: err?.message || 'Đăng nhập thất bại' }
    }
  }

  const logout = () => {
    setUser({ id: 'guest', name: 'Guest', role: 'guest', email: '' })
    setToken('')
    localStorage.removeItem('dla_user')
    localStorage.removeItem('dla_token')
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}