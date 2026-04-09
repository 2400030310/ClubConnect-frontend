import React, { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user')
    const savedUserType = localStorage.getItem('userType')
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)

      const trimmedEmail = email.trim().toLowerCase()
      const trimmedPassword = password.trim()

      if (!trimmedEmail || !trimmedPassword) {
        return { success: false, error: 'Missing required fields' }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(trimmedEmail)) {
        return { success: false, error: 'Invalid email format' }
      }

      if (trimmedPassword.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }

      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: 'Invalid email or password' }
      }

      const normalizedRole = (data?.role || '').toString().toLowerCase()
      const derivedUserType = normalizedRole === 'admin' ? 'admin' : 'student'

      setUser(data)
      setUserType(derivedUserType)
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('userType', derivedUserType)

      return { success: true, user: data }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      
      // Validation
      if (!userData.fullName || !userData.email || !userData.password) {
        throw new Error('Missing required fields')
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format')
      }
      
      // Password validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      return { success: true, user: data }
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    toast.success('Logged out successfully!')
  }

  const updateUser = async (updatedUser) => {
    try {
      if (!user?.id) {
        return { success: false, error: 'No authenticated user found' }
      }

      setLoading(true)

      const response = await fetch(`http://localhost:8080/api/users/update/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        return { success: false, error: data?.message || 'Failed to update user' }
      }

      const nextUser = Object.keys(data || {}).length ? data : { ...user, ...updatedUser }
      setUser(nextUser)
      localStorage.setItem('user', JSON.stringify(nextUser))

      return { success: true, user: nextUser }
    } catch (error) {
      console.error('Update user error:', error)
      return { success: false, error: error.message || 'Failed to update user' }
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id) => {
    try {
      const targetId = id || user?.id
      if (!targetId) {
        return { success: false, error: 'User id is required' }
      }

      setLoading(true)

      const response = await fetch(`http://localhost:8080/api/users/delete/${targetId}`, {
        method: 'DELETE'
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        return { success: false, error: data?.message || 'Failed to delete user' }
      }

      if (user?.id === targetId) {
        setUser(null)
        setUserType(null)
        localStorage.removeItem('user')
        localStorage.removeItem('userType')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Delete user error:', error)
      return { success: false, error: error.message || 'Failed to delete user' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    deleteUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}