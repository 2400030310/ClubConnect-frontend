import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  to,
  onClick,
  disabled = false,
  loading = false,
  className,
  ...props 
}) => {
  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 relative overflow-hidden',
    {
      // Primary variants
      'bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:shadow-lg hover:shadow-primary-500/30': variant === 'primary',
      'bg-gradient-to-r from-secondary-500 to-secondary-700 text-white hover:shadow-lg hover:shadow-secondary-500/30': variant === 'secondary',
      
      // Outline variants
      'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900': variant === 'outline',
      'border-2 border-white text-white hover:bg-white hover:text-primary-600': variant === 'outline-light',
      
      // Ghost variants
      'bg-muted text-muted-foreground hover:bg-muted/80': variant === 'ghost',
      'text-white hover:bg-white/20': variant === 'ghost-light',
      'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800': variant === 'ghost-dark',
      
      // Danger variant
      'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30': variant === 'danger',
      
      // Success variant
      'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30': variant === 'success',
      
      // Sizes
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
      'px-10 py-5 text-xl': size === 'xl',
      
      // Disabled state
      'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading,
    },
    className
  )

  const content = (
    <>
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span>{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick} {...props}>
        {content}
      </a>
    )
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}

export default Button