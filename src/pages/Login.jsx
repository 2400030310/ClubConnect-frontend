import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiEye, 
  FiEyeOff,
  FiUser,
  FiShield,
  FiAlertCircle
} from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student', // 'student' or 'admin'
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    
    try {
      const result = await login(formData.email.trim(), formData.password.trim())

      if (result.success) {
        alert('Login successful!')

        if (result.user?.role === 'ADMIN') {
          navigate('/admin/dashboard')
        } else {
          navigate('/student/dashboard')
        }
      } else {
        alert('Invalid email or password')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Brand Message */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block pr-12"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Welcome back to
            </h1>
            <h2 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ClubConnect
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light italic mt-2">
              Beyond Academics
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Continue your journey of professional growth and connect with ambitious students and administrators.
          </p>

          <div className="space-y-4">
            {[
              'Access exclusive industry events',
              'Track your career milestones',
              formData.userType === 'admin' ? 'Manage students and activities' : 'Get personalized recommendations'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                </div>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
        >
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-1">Sign In</h3>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          {/* User Type Selector - Admin/Student Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a
            </label>
            <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.userType === 'student'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <FiUser className="w-5 h-5" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'admin' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.userType === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <FiShield className="w-5 h-5" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={formData.userType === 'admin' ? 'admin@example.com' : 'student@example.com'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm flex items-start gap-2"
              >
                <FiAlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link 
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In as {formData.userType === 'admin' ? 'Admin' : 'Student'}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Create one now
              </Link>
            </p>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login