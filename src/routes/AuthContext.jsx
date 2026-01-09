import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('plc_auth')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('plc_auth', JSON.stringify(user))
    else localStorage.removeItem('plc_auth')
  }, [user])

  const login = ({ email, role, name }) => {
    setUser({ email, role, name: name || 'Member' })
  }

  const signup = ({ email, role, name, institution }) => {
    setUser({ email, role, name, institution: institution || null })
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout, signup }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
