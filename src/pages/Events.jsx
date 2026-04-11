import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCalendar, 
  FiUsers, 
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiStar,
  FiHeart,
  FiShare2,
  FiBookmark,
  FiTrendingUp,
  FiMusic,
  FiCpu,
  FiCamera,
  FiMic,
  FiActivity,
  FiAward
} from 'react-icons/fi'

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [bookmarked, setBookmarked] = useState([])
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // All Events Data - Comprehensive list with Indian context
  const allEvents = [
    // Technology Events
    {
      id: 1,
      name: 'KL University Tech Fest 2024',
      category: 'Technology',
      date: '2024-03-15',
      endDate: '2024-03-17',
      time: '10:00 AM',
      location: 'Guntur',
      venue: 'KL University Campus',
      city: 'Guntur',
      spots: 5000,
      registered: 3456,
      price: '₹999',
      priceValue: 999,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      organizer: 'KL University',
      description: 'Asia\'s largest science and technology festival featuring 50+ workshops, 100+ competitions, and exhibitions from leading tech companies.',
      speakers: ['Narayana Murthy', 'Kiran Mazumdar-Shaw', 'Bhavish Aggarwal'],
      highlights: ['Robotics Competition', 'AI Summit', 'Startup Expo', 'Tech Talks']
    },
    {
      id: 2,
      name: 'AI & Robotics Hackathon',
      category: 'Technology',
      date: '2024-03-18',
      time: '9:00 AM',
      location: 'Guntur',
      venue: 'MLR Convention Center',
      city: 'Guntur',
      spots: 200,
      registered: 156,
      price: 'Free',
      priceValue: 0,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      organizer: 'Microsoft Research',
      description: '48-hour hackathon focused on AI and robotics solutions for real-world problems. Win exciting prizes and mentorship opportunities.',
      speakers: ['Sundar Pichai', 'Sam Altman'],
      highlights: ['Hardware Lab Access', 'Mentorship', 'Cash Prizes', 'Internship Opportunities']
    },
    {
      id: 3,
      name: 'Google Cloud Summit',
      category: 'Technology',
      date: '2024-04-05',
      time: '10:00 AM',
      location: 'Guntur',
      venue: 'HICC',
      city: 'Guntur',
      spots: 1000,
      registered: 678,
      price: '₹499',
      priceValue: 499,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      featured: false,
      organizer: 'Google',
      description: 'Learn about cloud computing, AI/ML, and career opportunities at Google. Network with Google engineers and cloud experts.',
      speakers: ['Google Engineers'],
      highlights: ['Hands-on Workshops', 'Certification', 'Networking', 'Goodies']
    },

    // Music Events
    {
      id: 4,
      name: 'Sunburn Music Festival',
      category: 'Music',
      date: '2024-04-05',
      endDate: '2024-04-07',
      time: '4:00 PM',
      location: 'Guntur',
      venue: 'Candolim Beach',
      city: 'Guntur',
      spots: 25000,
      registered: 18765,
      price: '₹2,499',
      priceValue: 2499,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: true,
      organizer: 'Sunburn',
      description: 'Asia\'s biggest electronic music festival featuring international and Indian artists spread across 3 days of non-stop music.',
      artists: ['Martin Garrix', 'Nucleya', 'Divine', 'Marshmello'],
      highlights: ['3 Days Pass', 'Camping', 'Food Festival', 'Art Installations']
    },
    {
      id: 5,
      name: 'Bollywood Music Night',
      category: 'Music',
      date: '2024-03-25',
      time: '7:00 PM',
      location: 'Guntur',
      venue: 'Jio Garden',
      city: 'Guntur',
      spots: 5000,
      registered: 3890,
      price: '₹999',
      priceValue: 999,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      organizer: 'Zee Live',
      description: 'Night of Bollywood hits with live performances by top playback singers.',
      artists: ['Arijit Singh', 'Shreya Ghoshal', 'Neha Kakkar'],
      highlights: ['Live Band', 'Food Stalls', 'Photo Booth', 'Meet & Greet']
    },
    {
      id: 6,
      name: 'Classical Music Concert',
      category: 'Music',
      date: '2024-04-12',
      time: '6:00 PM',
      location: 'Guntur',
      venue: 'Music Academy',
      city: 'Guntur',
      spots: 2000,
      registered: 1234,
      price: '₹599',
      priceValue: 599,
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      featured: false,
      organizer: 'Madras Music Academy',
      description: 'Evening of classical Carnatic music by renowned artists.',
      artists: ['Bombay Jayashree', 'T.M. Krishna'],
      highlights: ['Traditional Setting', 'Live Recording', 'Artist Interaction']
    },

    // Sports Events
    {
      id: 7,
      name: 'Inter-KL University Sports Meet',
      category: 'Sports',
      date: '2024-04-20',
      endDate: '2024-04-24',
      time: '8:00 AM',
      location: 'Guntur',
      venue: 'KL University Sports Complex',
      city: 'Guntur',
      spots: 2000,
      registered: 1567,
      price: 'Free',
      priceValue: 0,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: false,
      organizer: 'KL University',
      description: 'Annual sports competition hosted by KL University featuring multiple disciplines.',
      speakers: ['University Sports Council', 'National Referees Panel'],
      highlights: ['Athletics', 'Swimming', 'Basketball', 'Football', 'Tennis']
    },
    {
      id: 8,
      name: 'Mumbai Marathon 2024',
      category: 'Sports',
      date: '2024-05-15',
      time: '5:00 AM',
      location: 'Guntur',
      venue: 'Bandra Reclamation',
      city: 'Guntur',
      spots: 50000,
      registered: 34567,
      price: '₹799',
      priceValue: 799,
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd0facb5?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: true,
      organizer: 'Procam International',
      description: 'India\'s largest marathon with full marathon, half marathon, and 10K runs.',
      speakers: ['Marathon Race Directors', 'Elite Pacers Team'],
      highlights: ['Full Marathon', 'Half Marathon', '10K Run', 'Fun Run']
    },

    // Business Events
    {
      id: 9,
      name: 'Startup India Pitch Fest',
      category: 'Business',
      date: '2024-05-02',
      time: '10:00 AM',
      location: 'Guntur',
      venue: 'India Habitat Centre',
      city: 'Guntur',
      spots: 500,
      registered: 432,
      price: 'Free',
      priceValue: 0,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format',
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: true,
      organizer: 'Startup India',
      description: 'Pitch your startup idea to top VCs and angel investors. Get funding and mentorship opportunities.',
      speakers: ['Kunal Shah', 'Vijay Shekhar Sharma'],
      highlights: ['Pitch Session', 'VC Networking', 'Workshops', 'Exhibition']
    },
    {
      id: 10,
      name: 'Young Entrepreneurs Summit',
      category: 'Business',
      date: '2024-05-20',
      time: '9:00 AM',
      location: 'Guntur',
      venue: 'Sheraton Grand',
      city: 'Guntur',
      spots: 1000,
      registered: 678,
      price: '₹299',
      priceValue: 299,
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format',
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      featured: false,
      organizer: 'TiE',
      description: 'Learn from successful entrepreneurs and network with peers.',
      speakers: ['Bhavish Aggarwal', 'Falguni Nayar'],
      highlights: ['Keynote Speeches', 'Panel Discussions', 'Networking']
    },

    // Gaming Events
    {
      id: 11,
      name: 'BGMI Pro League',
      category: 'Gaming',
      date: '2024-05-25',
      endDate: '2024-05-28',
      time: '11:00 AM',
      location: 'Guntur',
      venue: 'HITEX Exhibition Center',
      city: 'Guntur',
      spots: 5000,
      registered: 4321,
      price: '₹499',
      priceValue: 499,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      organizer: 'Krafton',
      description: 'India\'s biggest BGMI tournament with ₹50L prize pool.',
      artists: ['Pro Team Captains', 'Esports Casters'],
      highlights: ['Grand Finals', 'Cosplay', 'Merchandise', 'Meet & Greet']
    },
    {
      id: 12,
      name: 'Valorant Campus Clash',
      category: 'Gaming',
      date: '2024-06-15',
      time: '2:00 PM',
      location: 'Guntur',
      venue: 'Online',
      city: 'Guntur',
      spots: 1000,
      registered: 876,
      price: 'Free',
      priceValue: 0,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      organizer: 'Riot Games',
      description: 'Inter-college Valorant tournament with cash prizes.',
      artists: ['Riot Tournament Staff', 'Esports Commentators'],
      highlights: ['Online Qualifiers', 'Live Stream', 'Cash Prizes']
    },

    // Arts & Cultural
    {
      id: 13,
      name: 'Lakme Fashion Week',
      category: 'Fashion',
      date: '2024-05-10',
      endDate: '2024-05-14',
      time: '7:00 PM',
      location: 'Guntur',
      venue: 'Jio World Convention Centre',
      city: 'Guntur',
      spots: 3000,
      registered: 2345,
      price: '₹4,999',
      priceValue: 4999,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format',
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      organizer: 'Lakme',
      description: 'India\'s premier fashion event featuring top designers.',
      designers: ['Sabyasachi', 'Manish Malhotra', 'Masaba Gupta'],
      highlights: ['Designer Showcases', 'Celebrity Appearances', 'Shopping']
    },
    {
      id: 14,
      name: 'Jaipur Literature Festival',
      category: 'Literary',
      date: '2024-06-20',
      endDate: '2024-06-24',
      time: '9:00 AM',
      location: 'Guntur',
      venue: 'Diggi Palace',
      city: 'Guntur',
      spots: 10000,
      registered: 7890,
      price: 'Free',
      priceValue: 0,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format',
      icon: <FiBookmark className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: true,
      organizer: 'Teamwork Arts',
      description: 'World\'s largest free literary festival with authors from around the world.',
      speakers: ['Chetan Bhagat', 'Ruskin Bond', 'William Dalrymple'],
      highlights: ['Book Readings', 'Panel Discussions', 'Book Signing']
    },

    // Health & Wellness
    {
      id: 15,
      name: 'Yoga & Wellness Retreat',
      category: 'Health',
      date: '2024-04-02',
      endDate: '2024-04-04',
      time: '6:00 AM',
      location: 'Guntur',
      venue: 'Parmarth Niketan Ashram',
      city: 'Guntur',
      spots: 100,
      registered: 78,
      price: '₹4,999',
      priceValue: 4999,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format',
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: false,
      organizer: 'Patanjali',
      description: '3-day yoga and meditation retreat in the yoga capital of the world.',
      speakers: ['Certified Yoga Trainers', 'Ayurveda Experts'],
      highlights: ['Yoga Sessions', 'Meditation', 'Ayurvedic Food', 'Ganga Aarti']
    }
  ]

  // Get unique values for filters
  const categories = ['all', ...new Set(allEvents.map(event => event.category))]
  const cities = ['all', ...new Set(allEvents.map(event => event.city))]
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'under500', label: 'Under ₹500' },
    { value: '500to2000', label: '₹500 - ₹2,000' },
    { value: 'above2000', label: 'Above ₹2,000' }
  ]
  const dateRanges = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' }
  ]

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesCity = selectedCity === 'all' || event.city === selectedCity
    
    let matchesPrice = true
    if (selectedPrice === 'free') matchesPrice = event.price === 'Free'
    else if (selectedPrice === 'under500') matchesPrice = event.priceValue < 500
    else if (selectedPrice === '500to2000') matchesPrice = event.priceValue >= 500 && event.priceValue <= 2000
    else if (selectedPrice === 'above2000') matchesPrice = event.priceValue > 2000
    
    let matchesDate = true
    const today = new Date()
    const eventDate = new Date(event.date)
    if (selectedDate === 'today') {
      matchesDate = eventDate.toDateString() === today.toDateString()
    } else if (selectedDate === 'tomorrow') {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      matchesDate = eventDate.toDateString() === tomorrow.toDateString()
    } else if (selectedDate === 'thisWeek') {
      const weekLater = new Date(today)
      weekLater.setDate(weekLater.getDate() + 7)
      matchesDate = eventDate >= today && eventDate <= weekLater
    } else if (selectedDate === 'thisMonth') {
      matchesDate = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
    }
    
    return matchesSearch && matchesCategory && matchesCity && matchesPrice && matchesDate
  })

  const toggleBookmark = (eventId) => {
    setBookmarked(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedCity('all')
    setSelectedPrice('all')
    setSelectedDate('all')
  }

  const openEventDetails = (event) => {
    setSelectedEvent(event)
    setShowEventDetailsModal(true)
  }

  const closeEventDetails = () => {
    setShowEventDetailsModal(false)
    setSelectedEvent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Discover Amazing Events
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-purple-100 text-lg mb-8"
            >
              Find and join the best events happening across India
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by name, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-black font-medium"
            >
              <FiFilter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <FiChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters - Desktop always visible, Mobile toggle */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:flex lg:items-center gap-4 w-full lg:w-auto`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="all">All Cities</option>
                {cities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              {(selectedCategory !== 'all' || selectedCity !== 'all' || selectedPrice !== 'all' || selectedDate !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-black hover:text-purple-600 flex items-center gap-1"
                >
                  <FiX className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* View Toggle and Results Count */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-black">
                {filteredEvents.length} events found
              </span>
              <div className="flex items-center gap-2 border-l pl-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredEvents.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Trending Badge */}
                      {event.trending && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                      
                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(event.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                      >
                        <FiHeart className={`w-4 h-4 ${
                          bookmarked.includes(event.id) ? 'fill-pink-500 text-pink-500' : 'text-white'
                        }`} />
                      </button>

                      {/* Category Tag */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        {event.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                          {event.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-purple-400" />
                          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-pink-400" />
                          {event.city}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-purple-600">{event.price}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {event.registered} going
                          </span>
                        </div>
                        <button
                          onClick={() => openEventDetails(event)}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-48 h-32 md:h-auto relative overflow-hidden rounded-l-xl">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      {event.trending && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full">
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {event.name}
                          </h3>
                          <p className="text-sm text-gray-500">{event.category} • {event.organizer}</p>
                        </div>
                        <button
                          onClick={() => toggleBookmark(event.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <FiHeart className={`w-5 h-5 ${
                            bookmarked.includes(event.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
                          }`} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="text-purple-500" />
                          <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="text-pink-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiMapPin className="text-purple-500" />
                          <span>{event.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiUsers className="text-pink-500" />
                          <span>{event.registered}/{event.spots}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-purple-600">{event.price}</span>
                        <button
                          onClick={() => openEventDetails(event)}
                          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                        >
                          View Details
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          // No Results
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Featured Events Section */}
        {filteredEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allEvents.filter(e => e.featured).slice(0, 2).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-bold rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-white/80">{event.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        {event.city}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showEventDetailsModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeEventDetails}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${selectedEvent.color} p-6 text-white`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEvent.name}</h3>
                    <p className="text-white/90 text-sm mt-1">{selectedEvent.category} • {selectedEvent.organizer}</p>
                  </div>
                  <button onClick={closeEventDetails} className="text-white/80 hover:text-white text-sm font-medium">Close</button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <p className="text-gray-700">{selectedEvent.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.date}{selectedEvent.endDate ? ` - ${selectedEvent.endDate}` : ''}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Venue</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.venue}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Attendees</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.registered}/{selectedEvent.spots}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    {selectedEvent.speakers ? 'Featured Speakers' : selectedEvent.artists ? 'Featured Artists' : selectedEvent.designers ? 'Featured Designers' : 'Featured Team'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedEvent.speakers || selectedEvent.artists || selectedEvent.designers || []).map((person) => (
                      <span key={person} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{person}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.highlights.map((highlight) => (
                      <span key={highlight} className="text-xs bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">{highlight}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={closeEventDetails}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Events