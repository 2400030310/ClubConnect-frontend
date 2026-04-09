import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiUsers, FiMapPin, FiArrowRight, FiSearch } from 'react-icons/fi'

const Activities = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const activities = [
    {
      id: 1,
      name: 'Bollywood Music Club',
      members: '5.2k',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format',
      tags: ['Studio Access', 'Live Performances'],
      trend: '+65% this month',
      location: 'Mumbai',
      description: 'Join India\'s premier music community for Bollywood enthusiasts'
    },
    {
      id: 2,
      name: 'Bollywood Photography',
      members: '3.8k',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format',
      tags: ['Film Shoots', 'Workshops'],
      trend: '+72% this month',
      location: 'Mumbai',
      description: 'Learn professional photography through Bollywood-inspired projects'
    },
    {
      id: 3,
      name: 'AI & Robotics Club',
      members: '4.1k',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      tags: ['Hackathons', 'Mentorship'],
      trend: '+89% this month',
      location: 'Bengaluru',
      description: 'Innovation hub for AI and robotics enthusiasts across India'
    },
    {
      id: 4,
      name: 'Hindi Creative Writing',
      members: '2.2k',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format',
      tags: ['Kavi Sammelan', 'Contests'],
      trend: '+44% this month',
      location: 'Delhi',
      description: 'Celebrate Hindi literature and creative expression'
    },
    {
      id: 5,
      name: 'Yoga & Wellness',
      members: '6.7k',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format',
      tags: ['Ayurveda', 'Meditation'],
      trend: '+91% this month',
      location: 'Rishikesh',
      description: 'Traditional Indian wellness practices for modern students'
    },
    {
      id: 6,
      name: 'BGMI Gaming Community',
      members: '12.5k',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      tags: ['Tournaments', 'Live Streams'],
      trend: '+156% this month',
      location: 'Hyderabad',
      description: 'Largest BGMI esports community for Indian students'
    }
  ]

  const filtered = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <span className="text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Club
                </span>
                <span className="text-gray-900">Connect</span>
              </span>
            </Link>
            <Link to="/">
              <motion.button 
                className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                ← Back Home
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-gray-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trending{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Communities
            </span>
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-600 max-w-3xl mx-auto font-light mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of students in the most active communities across India
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:border-purple-500 focus:outline-none shadow-lg text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Location Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs border border-white/30">
                    <FiMapPin className="w-3 h-3" /> {activity.location}
                  </div>
                  
                  {/* Trending Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-sm shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {activity.trend}
                  </motion.div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{activity.name}</h3>
                    <p className="text-white/80 text-sm mb-3">{activity.description}</p>
                    
                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                      {activity.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm flex items-center gap-1">
                        <FiUsers className="inline" /> {activity.members} members
                      </span>
                      <motion.button 
                        className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Join</span>
                        <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-2xl text-gray-500">No communities found matching your search</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Activities
