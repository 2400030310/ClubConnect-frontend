import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, 
  FiUser, 
  FiLogIn, 
  FiLogOut,
  FiBell,
  FiSettings,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiCalendar,
  FiAward,
  FiUsers
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import Button from './Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, userType, logout, isAuthenticated } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowNotifications(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    ...(userType === 'student' ? [
      { path: '/student/dashboard', label: 'Dashboard', icon: <FiUser /> },
      { path: '/student/activities', label: 'Activities', icon: <FiCalendar /> },
      { path: '/student/achievements', label: 'Achievements', icon: <FiAward /> }
    ] : []),
    ...(userType === 'admin' ? [
      { path: '/admin/dashboard', label: 'Dashboard', icon: <FiSettings /> },
      { path: '/admin/activities', label: 'Manage', icon: <FiCalendar /> },
      { path: '/admin/users', label: 'Users', icon: <FiUsers /> }
    ] : [])
  ]

  const notifications = [
    { id: 1, title: 'New Event', message: 'Basketball tournament registration open', time: '5 min ago' },
    { id: 2, title: 'Reminder', message: 'Music club meeting today at 4 PM', time: '1 hour ago' },
    { id: 3, title: 'Achievement', message: 'You earned a new badge!', time: '2 hours ago' }
  ]

  // Determine logo colors based on scroll and theme
  const getLogoColors = () => {
    if (scrolled) {
      // When scrolled, use solid colors that contrast with white/gray background
      return {
        club: 'text-primary-600 dark:text-primary-400',
        connect: 'text-gray-900 dark:text-white'
      }
    } else {
      // When at top, use colors that contrast with the hero background
      return {
        club: 'text-white',
        connect: 'text-white'
      }
    }
  }

  const logoColors = getLogoColors()

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Fixed Visibility */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
            >
              <span className={logoColors.club}>
                Club
              </span>
              <span className={logoColors.connect}>
                Connect
              </span>
            </motion.div>
            {!scrolled && (
              <span className="hidden sm:inline-block text-xs text-white/80 font-light italic ml-2">
                Beyond Academics
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? scrolled 
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-white bg-white/20'
                      : scrolled
                        ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg transition-colors relative ${
                    scrolled
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <FiBell size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <p className="font-medium text-gray-900 dark:text-white">{notif.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{notif.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Auth Buttons - UPDATED SECTION */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                  <span className={`text-sm ${
                    scrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  }`}>
                    Welcome, {user?.name}
                  </span>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <FiLogOut />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant={scrolled ? "outline" : "outline-light"} 
                    size="sm"
                  >
                    <FiLogIn className="mr-2" /> Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="primary" 
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons - UPDATED */}
                {!isAuthenticated && (
                  <div className="pt-4 space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="md" className="w-full">
                        <FiLogIn className="mr-2" /> Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="primary" size="md" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar