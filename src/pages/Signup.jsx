import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiBriefcase,
  FiCalendar,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiShield,
  FiSmartphone,
  FiMapPin,
  FiAward,
  FiBookOpen
} from 'react-icons/fi'

const Register = () => {
  const [formData, setFormData] = useState({
    // Account Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Professional Info
    userType: 'student',
    institution: '',
    graduationYear: '',
    city: '',
    interests: [],
    
    // Agreements
    agreeTerms: false,
    agreeUpdates: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const navigate = useNavigate()

  const institutions = [
    'KL University',
    'Other'
  ]

  const cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad',
    'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Other'
  ]

  const interestOptions = [
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'arts', label: 'Arts', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '📊' },
    { id: 'writing', label: 'Writing', icon: '✍️' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'dance', label: 'Dance', icon: '💃' },
    { id: 'yoga', label: 'Yoga', icon: '🧘' },
    { id: 'cooking', label: 'Cooking', icon: '🍳' },
    { id: 'travel', label: 'Travel', icon: '✈️' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Check password strength
    if (name === 'password') {
      let strength = 0
      if (value.length >= 8) strength += 25
      if (value.match(/[a-z]+/)) strength += 25
      if (value.match(/[A-Z]+/)) strength += 25
      if (value.match(/[0-9]+/)) strength += 25
      setPasswordStrength(strength)
    }
  }

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const validateForm = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        toast.error('Full name is required')
        return false
      }
      if (!formData.email.trim()) {
        toast.error('Email is required')
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address')
        return false
      }
      if (!formData.password) {
        toast.error('Password is required')
        return false
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.institution) {
        toast.error('Please select an institution')
        return false
      }
      if (!formData.city) {
        toast.error('Please select a city')
        return false
      }
    } else if (currentStep === 3) {
      if (!formData.agreeTerms) {
        toast.error('Please agree to the terms and conditions')
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const { register } = require('../hooks/useAuth')()  // This will be called properly in component
      // For now, we'll use the inline version
      // Simulate API call and register
      setTimeout(() => {
        toast.success('Account created successfully!')
        setIsLoading(false)
        navigate('/login')
      }, 1500)
    } catch (err) {
      toast.error('Registration failed. Please try again.')
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (!validateForm()) {
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500'
    if (passwordStrength <= 50) return 'bg-orange-500'
    if (passwordStrength <= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak'
    if (passwordStrength <= 50) return 'Fair'
    if (passwordStrength <= 75) return 'Good'
    return 'Strong'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block pr-12 sticky top-8"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Join the
            </h1>
            <h2 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                ClubConnect
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light italic mt-2">
              Beyond Academics
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Create your profile and unlock a world of professional opportunities tailored for Indian students.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: '🚀',
                title: 'Personalized Recommendations',
                description: 'Get matched with opportunities that fit your goals'
              },
              {
                icon: '🌐',
                title: 'Pan-India Network',
                description: 'Connect with students from 500+ colleges across India'
              },
              {
                icon: '📈',
                title: 'Placement Assistance',
                description: 'Access ₹25L+ placement opportunities and training'
              },
              {
                icon: '🏆',
                title: 'Exclusive Events',
                description: 'Attend KL University workshops and industry meetups'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-xl border border-indigo-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {['P','R','A','K'][i-1]}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <FiAward className="text-indigo-500" />
              <span>Trusted by KL University</span>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-white rounded-xl border border-indigo-100"
          >
            <p className="text-sm text-gray-600 italic mb-2">
              "ClubConnect helped me prepare for placements. Got placed at Microsoft with ₹45L package!"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-sky-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                PS
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Priya Sharma</p>
                <p className="text-xs text-gray-500">KL University, CSE</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
        >
          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-1">Create Account</h3>
            <p className="text-gray-500">Join India's fastest growing student community</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm hidden sm:block ${
                    currentStep >= step ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step === 1 ? 'Account' : step === 2 ? 'Profile' : 'Interests'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${
                    currentStep > step ? 'bg-gradient-to-r from-indigo-600 to-sky-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Information */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* User Type Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, userType: 'student' }))}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                          formData.userType === 'student'
                            ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:text-indigo-600'
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
                            ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:text-indigo-600'
                        }`}
                      >
                        <FiShield className="w-5 h-5" />
                        Admin
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
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
                    
                    {/* Password Strength */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getPasswordStrengthColor()} transition-all`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700">
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Use 8+ characters with uppercase, lowercase & numbers
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
                  >
                    Continue
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Institution */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution / University <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none bg-white text-gray-900"
                        required
                      >
                        <option value="" className="text-gray-500">Select your institution</option>
                        {institutions.map(inst => (
                          <option key={inst} value={inst} className="text-gray-900">{inst}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none bg-white text-gray-900"
                        required
                      >
                        <option value="" className="text-gray-500">Select year</option>
                        {[2024,2025,2026,2027,2028,2029,2030].map(year => (
                          <option key={year} value={year} className="text-gray-900">{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none bg-white text-gray-900"
                        required
                      >
                        <option value="" className="text-gray-500">Select your city</option>
                        {cities.map(city => (
                          <option key={city} value={city} className="text-gray-900">{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-sky-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Continue
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Interests */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select your interests <span className="text-gray-500">(choose multiple)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-1 ${
                            formData.interests.includes(interest.id)
                              ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white border-transparent shadow-lg'
                              : 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                          }`}
                        >
                          <span className="text-xl">{interest.icon}</span>
                          <span className="text-xs font-medium">{interest.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Agreements */}
                  <div className="space-y-3 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeUpdates"
                        checked={formData.agreeUpdates}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-600">
                        I want to receive updates about events and opportunities (optional)
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !formData.agreeTerms}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-sky-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Create Account
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Back to Home */}
            <div className="text-center mt-4">
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

export default Register