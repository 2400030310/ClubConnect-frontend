import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const Card = ({ 
  children, 
  className, 
  hoverable = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      className={clsx(
        'bg-card text-card-foreground rounded-lg border border-border shadow-sm',
        hoverable && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card