// This file is no longer needed as auth logic is moved to auth-context.tsx
// Keeping it for backward compatibility but all functions are now in the context

export const signIn = async (email: string, password: string) => {
  // This function is now handled by the AuthProvider context
  throw new Error('Please use the useAuth hook instead')
}

export const signUp = async (email: string, password: string, fullName: string, role: 'student' | 'teacher', studentId?: string) => {
  // This function is now handled by the AuthProvider context
  throw new Error('Please use the useAuth hook instead')
}

export const signOut = async () => {
  // This function is now handled by the AuthProvider context
  throw new Error('Please use the useAuth hook instead')
}

export const getCurrentUser = async () => {
  // This function is now handled by the AuthProvider context
  throw new Error('Please use the useAuth hook instead')
}