'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  full_name: string
  role: 'student' | 'teacher'
  student_id?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, role: 'student' | 'teacher', studentId?: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'teacher@acadex.com',
    full_name: 'Dr. Sarah Johnson',
    role: 'teacher'
  },
  {
    id: '2',
    email: 'student@acadex.com',
    full_name: 'John Smith',
    role: 'student',
    student_id: 'STU001'
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('acadex_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call your API
    const foundUser = mockUsers.find(u => u.email === email)
    
    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    // Mock password validation (in real app, this would be properly hashed)
    if (password !== 'password123') {
      throw new Error('Invalid email or password')
    }

    setUser(foundUser)
    localStorage.setItem('acadex_user', JSON.stringify(foundUser))
  }

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    role: 'student' | 'teacher', 
    studentId?: string
  ) => {
    // Mock registration - in real app, this would call your API
    const newUser: User = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      role,
      student_id: studentId
    }

    // Add to mock users array
    mockUsers.push(newUser)
    
    setUser(newUser)
    localStorage.setItem('acadex_user', JSON.stringify(newUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('acadex_user')
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}