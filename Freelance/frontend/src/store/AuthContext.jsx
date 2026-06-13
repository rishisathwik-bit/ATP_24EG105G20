import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { authService } from '../services/api'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService
      .me()
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (payload) => {
    const data = await authService.login(payload)
    setUser(data.user)
    toast.success('Welcome back')
    return data.user
  }

  const register = async (payload) => {
    const data = await authService.register(payload)
    setUser(data.user)
    toast.success('Account created')
    return data.user
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    toast.success('Logged out')
  }

  const value = useMemo(
    () => ({ user, setUser, loading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
