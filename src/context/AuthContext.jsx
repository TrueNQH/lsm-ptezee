import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Demo accounts
const DEMO_ACCOUNTS = {
  'admin@dla.com': {
    password: 'admin123',
    user: { id: 'admin', name: 'Administrator', role: 'admin', email: 'admin@dla.com' },
    redirect: '/admin'
  },
  'student@dla.com': {
    password: 'student123', 
    user: { id: 'premium', name: 'PTEZEE Student', role: 'premium', email: 'student@dla.com' },
    redirect: '/student/overview'
  },
  'demo@dla.com': {
    password: 'demo123',
    user: { id: 'demo', name: 'Demo User', role: 'student', email: 'demo@dla.com' },
    redirect: '/student/overview'
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ id: 'guest', name: 'Guest', role: 'guest', email: '' })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dla_user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('dla_user')
      }
    }
  }, [])

  const login = (email, password) => {
    const account = DEMO_ACCOUNTS[email]
    
    if (account && account.password === password) {
      setUser(account.user)
      // Save to localStorage
      localStorage.setItem('dla_user', JSON.stringify(account.user))
      return { ok: true, redirect: account.redirect }
    }
    
    return { ok: false, error: 'Email hoặc mật khẩu không đúng. Vui lòng sử dụng tài khoản demo.' }
  }

  const logout = () => {
    setUser({ id: 'guest', name: 'Guest', role: 'guest', email: '' })
    localStorage.removeItem('dla_user')
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}