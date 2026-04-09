import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiGithub,
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin 
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FiFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub' }
  ]

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/activities', label: 'Activities' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ]

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Campus
              </span>
              <span className="text-foreground">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-4">
              Empowering students to discover their passion beyond academics.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary-500 hover:border-primary-500 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <FiMapPin className="mt-1 flex-shrink-0 text-primary-500" />
                <span>123 University Ave, Campus City</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <FiPhone className="text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <FiMail className="text-primary-500" />
                <span>support@campusconnect.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest updates on events and activities
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-full bg-background border border-border focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            &copy; {currentYear} CampusConnect. Made with{' '}
            <FiHeart className="text-red-500 animate-pulse" /> for students
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer