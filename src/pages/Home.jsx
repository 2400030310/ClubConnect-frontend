import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiUsers, 
  FiCalendar, 
  FiAward, 
  FiMusic,
  FiCamera,
  FiMic,
  FiArrowRight,
  FiStar,
  FiMapPin,
  FiClock,
  FiHeart,
  FiBookOpen,
  FiZap,
  FiTrendingUp,
  FiGlobe,
  FiCpu,
  FiSmile,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX
} from 'react-icons/fi'

const Home = () => {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 })
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  
  // Mouse follow effect for hero
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const inverseSpringX = useTransform(springX, v => -v)
  const inverseSpringY = useTransform(springY, v => -v)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x * 30)
        mouseY.set(y * 30)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Communities', path: '/communities' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
  ]

  const features = [
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Real-time updates and instant notifications',
      gradient: 'from-purple-500 to-pink-500',
      stats: '0.5s response time'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Placement Assistance',
      description: 'Track your growth with AI insights',
      gradient: 'from-purple-500 to-pink-500',
      stats: '₹25L+ packages'
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: 'AI Recommendations',
      description: 'Personalized activity suggestions',
      gradient: 'from-pink-500 to-purple-500',
      stats: 'Powered by GPT-4'
    }
  ]

  const activities = [
    {
      icon: <FiMusic />,
      name: 'Bollywood Music Club',
      members: '5.2k',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format',
      color: 'from-purple-500 to-pink-500',
      tags: ['Studio Access', 'Live Performances'],
      trend: '+65% this month',
      location: 'Mumbai'
    },
    {
      icon: <FiCamera />,
      name: 'Bollywood Photography',
      members: '3.8k',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format',
      color: 'from-pink-500 to-purple-500',
      tags: ['Film Shoots', 'Workshops'],
      trend: '+72% this month',
      location: 'Mumbai'
    },
    {
      icon: <FiMic />,
      name: 'AI & Robotics Club',
      members: '4.1k',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      color: 'from-purple-500 to-pink-500',
      tags: ['Hackathons', 'Mentorship'],
      trend: '+89% this month',
      location: 'Bengaluru'
    },
    {
      icon: <FiBookOpen />,
      name: 'Hindi Creative Writing',
      members: '2.2k',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format',
      color: 'from-pink-500 to-purple-500',
      tags: ['Kavi Sammelan', 'Contests'],
      trend: '+34% this month',
      location: 'Delhi'
    },
    {
      icon: <FiHeart />,
      name: 'Yoga & Wellness',
      members: '6.7k',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format',
      color: 'from-purple-500 to-pink-500',
      tags: ['Ayurveda', 'Meditation'],
      trend: '+91% this month',
      location: 'Rishikesh'
    },
    {
      icon: <FiSmile />,
      name: 'BGMI Gaming Community',
      members: '12.5k',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      color: 'from-pink-500 to-purple-500',
      tags: ['Tournaments', 'Live Streams'],
      trend: '+156% this month',
      location: 'Hyderabad'
    }
  ]

  const events = [
    {
      title: 'KL University Tech Fest 2024',
      date: 'March 15-17, 2024',
      time: '10:00 AM',
      location: 'Guntur',
      attendees: 8500,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
      category: 'Technology',
      speakers: ['Narayana Murthy', 'Kiran Mazumdar-Shaw', 'Bhavish Aggarwal'],
      price: '₹999 Early Bird'
    },
    {
      title: 'Sunburn Music Festival',
      date: 'April 5-7, 2024',
      time: '4:00 PM',
      location: 'Guntur',
      attendees: 25000,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
      category: 'Music',
      artists: ['Nucleya', 'Divine', 'Diljit Dosanjh'],
      price: 'From ₹2,499'
    },
    {
      title: 'AI & Data Science Summit',
      date: 'April 20, 2024',
      time: '9:00 AM',
      location: 'Guntur',
      attendees: 4200,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      category: 'AI',
      speakers: ['Sundar Pichai', 'Sam Altman'],
      price: 'Virtual ₹499'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'KL University, CSE',
      image: 'https://images.unsplash.com/photo-1494790108777-847fd61a7487?w=200&auto=format',
      quote: 'ClubConnect helped me prepare for placements. Got placed at Microsoft with ₹45L package!',
      rating: 5,
      achievement: 'Microsoft SDE 2024'
    },
    {
      name: 'Rahul Verma',
      role: 'KL University, MBA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format',
      quote: 'Started my fintech startup with co-founders I met here. Now valued at ₹100Cr!',
      rating: 5,
      achievement: 'Founder @PayTech'
    },
    {
      name: 'Anjali Patel',
      role: 'KL University, Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format',
      quote: 'Won multiple design awards through competitions listed on this platform.',
      rating: 5,
      achievement: 'Adobe Design Award'
    }
  ]

  const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
          transition: { duration: 0.3 }
        }}
        className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_70px_-15px_rgba(168,85,247,0.3)] transition-all duration-500 border border-purple-100/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-t-3xl`} />
        <motion.div 
          className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white relative overflow-hidden`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
          {feature.icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600 mb-4 text-lg">{feature.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent px-4 py-2 rounded-full border border-purple-200`}>
            {feature.stats}
          </span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowRight className="text-purple-400 w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-[40rem] h-[40rem] bg-purple-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[35rem] h-[35rem] bg-pink-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-orange-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], x: [0, 150, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      {/* Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-10">
              <span className="text-3xl font-black tracking-tight text-black">
                ClubConnect
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`transition-colors font-medium tracking-wide ${
                    scrolled ? 'text-gray-600 hover:text-purple-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <motion.button 
                  className={`px-6 py-2.5 font-medium rounded-xl flex items-center gap-2 transition-all ${
                    scrolled 
                      ? 'text-gray-700 hover:text-purple-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogIn className="w-5 h-5" />
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button 
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUserPlus className="w-5 h-5" />
                  Sign Up
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 py-4 px-4 shadow-lg"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-3 text-gray-700 hover:text-purple-600 font-medium rounded-xl flex items-center justify-center gap-2 border border-gray-200">
                      <FiLogIn className="w-5 h-5" />
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl flex items-center justify-center gap-2">
                      <FiUserPlus className="w-5 h-5" />
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background - Pink Purple Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700"
          style={{ y: heroY, scale: heroScale }}
        >
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" patternUnits="userSpaceOnUse">
              <defs>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
        </motion.div>

        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-40 left-40 w-96 h-96"
          style={{ x: springX, y: springY }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse" />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 right-40 w-[30rem] h-[30rem]"
          style={{ x: inverseSpringX, y: inverseSpringY }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-20 blur-3xl animate-pulse animation-delay-2000" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center max-w-7xl mx-auto">
            {/* Main Title */}
            <motion.h1 
              className="text-8xl md:text-[10rem] font-black mb-6 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300">
                Beyond
              </span>
              <br />
              <span className="text-white inline-block">
                Academics
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mr-2"
              >
              </motion.span>
              College's Premier Student Platform
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-2"
              >
              </motion.span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/register">
                <motion.button 
                  className="group relative px-12 py-6 bg-white text-purple-700 font-bold rounded-2xl text-xl shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute inset-0 bg-purple-200/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl">🇮🇳</span>
                    Start Your Journey
                    <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button 
                  className="group relative px-12 py-6 bg-transparent border-2 border-white text-white font-bold rounded-2xl text-xl hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-2xl backdrop-blur-sm overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    Explore Events
                    <FiGlobe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <motion.div 
              className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3"
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-white/60 text-sm mt-3 tracking-widest font-light">SCROLL TO EXPLORE</p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold tracking-widest shadow-lg mb-8"
              whileHover={{ scale: 1.1 }}
            >
              ✦ REVOLUTIONARY FEATURES ✦
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Next-Gen{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campus Platform
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">
              Experience the future of student engagement with AI-driven insights and real-time collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-32 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Trending{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Communities
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Join thousands of students in the most active communities across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.3)] transition-all duration-500"
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{activity.name}</h3>
                        <p className="text-white/80 text-sm flex items-center gap-1">
                          <FiUsers className="inline" /> {activity.members} members
                        </p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-2 mb-3">
                      {activity.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button 
                      className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Join Community</span>
                      <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-6">
              Epic{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience world-class events happening across India
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-sm shadow-lg">
                      {event.category}
                    </span>
                    
                    {/* Price Tag */}
                    <span className="absolute bottom-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md text-white font-bold rounded-full text-sm border border-white/30">
                      {event.price}
                    </span>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-3/5 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-600 flex items-center gap-2">
                        <FiCalendar className="text-purple-500" /> {event.date}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FiClock className="text-purple-500" /> {event.time}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FiMapPin className="text-purple-500" /> {event.location}
                      </p>
                    </div>
                    
                    {/* Speakers/Artists */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {event.speakers ? 'Featured Speakers:' : 'Featured Artists:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(event.speakers || event.artists || []).map((person, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FiUsers className="text-purple-500" /> {event.attendees.toLocaleString()} attending
                      </span>
                      <motion.button 
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Book Now</span>
                        <FiArrowRight className="group/btn:translate-x-2 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/events">
              <motion.button 
                className="px-10 py-5 border-2 border-purple-600 text-purple-600 font-bold rounded-2xl text-xl hover:bg-purple-600 hover:text-white transition-all flex items-center gap-3 mx-auto group"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -15px rgba(168,85,247,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore All 1000+ Events</span>
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <path d="M30 30 L45 45 M30 30 L15 45 M30 30 L30 15" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
              Student{' '}
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto font-light">
              Real students, real achievements, extraordinary outcomes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-300"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <p className="text-white/70">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-lg mb-4 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-pink-300 fill-current" />
                  ))}
                </div>
                
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-sm">
                  {testimonial.achievement}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="text-8xl mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🇮🇳
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8">
              Ready to Make History?
            </h2>
            
            <Link to="/register">
              <motion.button 
                className="group relative px-16 py-8 bg-white text-purple-900 font-black rounded-3xl text-3xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 bg-purple-200/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-4">
                  Begin Your Journey <FiArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                </span>
              </motion.button>
            </Link>
            
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home