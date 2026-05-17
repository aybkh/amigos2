import { useState, useEffect, useContext, createContext } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    authService.getSession().then(setSession)
    const { data: { subscription } } = authService.onAuthStateChange(setSession)
    return () => subscription.unsubscribe()
  }, [])

  const login = (email, password) => authService.login(email, password)
  const logout = () => authService.logout()

  return (
    <AuthContext.Provider value={{ session, loading: session === undefined, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
