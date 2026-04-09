import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiUsers, 
  FiMusic, 
  FiCamera, 
  FiMic, 
  FiHeart,
  FiBookOpen,
  FiCpu,
  FiActivity,
  FiTrendingUp,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiStar,
  FiUsers as FiGroup,
  FiGlobe,
  FiAward
} from 'react-icons/fi'

const Communities = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [joinedCommunities, setJoinedCommunities] = useState([])

  const categories = [
    'all',
    'Technology',
    'Music',
    'Arts',
    'Business',
    'Sports',
    'Gaming',
    'Literature',
    'Health & Wellness'
  ]

  const cities = [
    'all',
    'Mumbai',
    'Bengaluru',
    'Delhi',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Jaipur',
    'Ahmedabad',
    'Online'
  ]

  const communities = [
    // Technology Communities
    {
      id: 1,
      name: 'AI & ML Enthusiasts',
      category: 'Technology',
      description: 'Community for artificial intelligence and machine learning enthusiasts. Weekly workshops, hackathons, and research discussions.',
      members: 12500,
      location: 'Bengaluru',
      city: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 45,
      founded: '2020',
      lead: ['Dr. Priya Sharma', 'Rahul Verma'],
      tags: ['AI', 'Machine Learning', 'Deep Learning', 'Workshops'],
      social: {
        telegram: '@aimlcommunity',
        discord: 'discord.gg/aiml',
        instagram: '@aiml_india'
      }
    },
    {
      id: 2,
      name: 'Web Developers India',
      category: 'Technology',
      description: 'Largest community of web developers in India. Learn, build, and grow together.',
      members: 25700,
      location: 'Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      events: 78,
      founded: '2018',
      lead: ['Akash Singh', 'Neha Gupta'],
      tags: ['React', 'Node.js', 'JavaScript', 'Mentorship'],
      social: {
        telegram: '@webdevindia',
        discord: 'discord.gg/webdev',
        github: 'github.com/webdevindia'
      }
    },
    {
      id: 3,
      name: 'Cybersecurity Forum',
      category: 'Technology',
      description: 'Ethical hacking, cybersecurity discussions, and CTF competitions.',
      members: 8900,
      location: 'Hyderabad',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format',
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      featured: false,
      events: 23,
      founded: '2021',
      lead: ['Vikram Reddy', 'Anjali Krishnan'],
      tags: ['Cybersecurity', 'Ethical Hacking', 'CTF', 'Workshops'],
      social: {
        telegram: '@cybersecindia',
        discord: 'discord.gg/cybersec'
      }
    },

    // Music Communities
    {
      id: 4,
      name: 'Bollywood Music Lovers',
      category: 'Music',
      description: 'Community for Bollywood music enthusiasts. Singing sessions, music discussions, and composer meetups.',
      members: 34200,
      location: 'Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: true,
      events: 56,
      founded: '2017',
      lead: ['Amit Kumar', 'Shreya Ghoshal'],
      tags: ['Bollywood', 'Singing', 'Music Production', 'Live Sessions'],
      social: {
        telegram: '@bollywoodmusic',
        discord: 'discord.gg/bollywoodmusic',
        instagram: '@bollywoodmusicclub'
      }
    },
    {
      id: 5,
      name: 'Indian Classical Music Circle',
      category: 'Music',
      description: 'Preserving and promoting Indian classical music. Monthly concerts, workshops, and artist interactions.',
      members: 15600,
      location: 'Chennai',
      city: 'Chennai',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      featured: true,
      events: 34,
      founded: '2015',
      lead: ['Ustad Zakir Hussain', 'Bombay Jayashree'],
      tags: ['Carnatic', 'Hindustani', 'Tabla', 'Vocal'],
      social: {
        telegram: '@classicalmusic',
        instagram: '@classicalmusiccircle'
      }
    },
    {
      id: 6,
      name: 'EDM Producers India',
      category: 'Music',
      description: 'Community for electronic music producers. Collaborate, share tracks, and learn music production.',
      members: 18700,
      location: 'Goa',
      city: 'Goa',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      events: 42,
      founded: '2019',
      lead: ['Nucleya', 'Lost Stories'],
      tags: ['EDM', 'Music Production', 'DAW', 'Collaboration'],
      social: {
        telegram: '@edmproducers',
        discord: 'discord.gg/edm',
        soundcloud: 'soundcloud.com/edm-india'
      }
    },

    // Arts Communities
    {
      id: 7,
      name: 'Indian Photography Network',
      category: 'Arts',
      description: 'Community for photographers across India. Photo walks, workshops, and exhibitions.',
      members: 45300,
      location: 'Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format',
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 89,
      founded: '2016',
      lead: ['Rathika Ramasamy', 'Sudhir Shivaram'],
      tags: ['Photography', 'Photo Walks', 'Workshops', 'Exhibitions'],
      social: {
        telegram: '@indianphotography',
        instagram: '@indianphotographynetwork',
        flickr: 'flickr.com/groups/indianphoto'
      }
    },
    {
      id: 8,
      name: 'Street Art India',
      category: 'Arts',
      description: 'Community for street artists and graffiti enthusiasts. Murals, public art projects, and festivals.',
      members: 12300,
      location: 'Delhi',
      city: 'Delhi',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4910?w=600&auto=format',
      icon: <FiCamera className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      featured: false,
      events: 28,
      founded: '2018',
      lead: ['Daku', 'Anpu Varghese'],
      tags: ['Street Art', 'Graffiti', 'Murals', 'Public Art'],
      social: {
        telegram: '@streetartindia',
        instagram: '@streetartindia'
      }
    },

    // Business Communities
    {
      id: 9,
      name: 'Young Entrepreneurs Circle',
      category: 'Business',
      description: 'Community for aspiring and young entrepreneurs. Mentorship, funding opportunities, and networking.',
      members: 28900,
      location: 'Bengaluru',
      city: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format',
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 67,
      founded: '2017',
      lead: ['Kunal Shah', 'Ghazal Alagh'],
      tags: ['Entrepreneurship', 'Startups', 'Funding', 'Mentorship'],
      social: {
        telegram: '@yecindia',
        discord: 'discord.gg/yec',
        linkedin: 'linkedin.com/company/yec-india'
      }
    },
    {
      id: 10,
      name: 'Investment & Finance Club',
      category: 'Business',
      description: 'Learn about investing, stock markets, and personal finance. Weekly discussions and expert sessions.',
      members: 34500,
      location: 'Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format',
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      events: 52,
      founded: '2016',
      lead: ['Rachana Ranade', 'Akshat Shrivastava'],
      tags: ['Investing', 'Stock Market', 'Personal Finance', 'Trading'],
      social: {
        telegram: '@financeclub',
        youtube: 'youtube.com/financeclub',
        discord: 'discord.gg/finance'
      }
    },

    // Sports Communities
    {
      id: 11,
      name: 'Cricket Lovers India',
      category: 'Sports',
      description: 'India\'s largest cricket community. Local tournaments, discussion forums, and meetups.',
      members: 56700,
      location: 'Mumbai',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 95,
      founded: '2015',
      lead: ['Sachin Tendulkar', 'Virat Kohli'],
      tags: ['Cricket', 'Tournaments', 'Coaching', 'Fantasy League'],
      social: {
        telegram: '@cricketlovers',
        discord: 'discord.gg/cricket',
        instagram: '@cricketloversindia'
      }
    },
    {
      id: 12,
      name: 'Basketball India Network',
      category: 'Sports',
      description: 'Community for basketball players and fans. Training sessions, 3x3 tournaments, and leagues.',
      members: 18700,
      location: 'Chennai',
      city: 'Chennai',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      featured: false,
      events: 34,
      founded: '2018',
      lead: ['Satnam Singh', 'Prashanti Singh'],
      tags: ['Basketball', 'Training', 'Tournaments', '3x3'],
      social: {
        telegram: '@basketballindia',
        instagram: '@basketballindianetwork'
      }
    },

    // Gaming Communities
    {
      id: 13,
      name: 'BGMI Pro Players',
      category: 'Gaming',
      description: 'Elite BGMI gaming community. Scrims, tournaments, and team recruitment.',
      members: 67800,
      location: 'Hyderabad',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 156,
      founded: '2019',
      lead: ['ScoutOP', 'Mortal'],
      tags: ['BGMI', 'Esports', 'Tournaments', 'Scrims'],
      social: {
        telegram: '@bgmiindia',
        discord: 'discord.gg/bgmi',
        youtube: 'youtube.com/bgmiindia'
      }
    },
    {
      id: 14,
      name: 'Valorant India',
      category: 'Gaming',
      description: 'Valorant gaming community with regular tournaments, coaching, and team recruitment.',
      members: 45600,
      location: 'Online',
      city: 'Online',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format',
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      featured: false,
      events: 89,
      founded: '2020',
      lead: ['Global Esports', 'Velocity Gaming'],
      tags: ['Valorant', 'Esports', 'Tournaments', 'Coaching'],
      social: {
        telegram: '@valorantindia',
        discord: 'discord.gg/valorantindia',
        twitch: 'twitch.tv/valorantindia'
      }
    },

    // Literature Communities
    {
      id: 15,
      name: 'Hindi Sahitya Sabha',
      category: 'Literature',
      description: 'Community for Hindi literature lovers. Kavi sammelan, book discussions, and writing workshops.',
      members: 23400,
      location: 'Delhi',
      city: 'Delhi',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format',
      icon: <FiBookOpen className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      featured: true,
      events: 45,
      founded: '2014',
      lead: ['Kumar Vishwas', 'Gulzar'],
      tags: ['Hindi Literature', 'Poetry', 'Kavi Sammelan', 'Writing'],
      social: {
        telegram: '@hindisahitya',
        instagram: '@hindisahityasabha'
      }
    },
    {
      id: 16,
      name: 'English Book Club',
      category: 'Literature',
      description: 'Monthly book readings, author interactions, and literary discussions.',
      members: 18900,
      location: 'Bengaluru',
      city: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format',
      icon: <FiBookOpen className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      featured: false,
      events: 67,
      founded: '2017',
      lead: ['Chetan Bhagat', 'Amish Tripathi'],
      tags: ['Books', 'Reading', 'Author Meets', 'Discussions'],
      social: {
        telegram: '@englishbookclub',
        discord: 'discord.gg/books',
        instagram: '@englishbookclubindia'
      }
    },

    // Health & Wellness
    {
      id: 17,
      name: 'Yoga & Meditation Circle',
      category: 'Health & Wellness',
      description: 'Daily yoga sessions, meditation workshops, and wellness retreats.',
      members: 31200,
      location: 'Rishikesh',
      city: 'Rishikesh',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format',
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      featured: true,
      events: 78,
      founded: '2016',
      lead: ['Baba Ramdev', 'Sadhguru'],
      tags: ['Yoga', 'Meditation', 'Ayurveda', 'Wellness'],
      social: {
        telegram: '@yogaindia',
        instagram: '@yogacircle',
        youtube: 'youtube.com/yogaindia'
      }
    }
  ]

  // Filter communities
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory
    const matchesCity = selectedCity === 'all' || community.city === selectedCity
    
    return matchesSearch && matchesCategory && matchesCity
  })

  const toggleJoin = (communityId) => {
    setJoinedCommunities(prev =>
      prev.includes(communityId)
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedCity('all')
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
              Find Your Community
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-purple-100 text-lg mb-8"
            >
              Connect with like-minded students across India
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
                placeholder="Search communities by name, interests, or tags..."
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

            {/* Filters */}
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

              {(selectedCategory !== 'all' || selectedCity !== 'all' || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-black hover:text-purple-600 flex items-center gap-1"
                >
                  <FiX className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count and View Toggle */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-black">
                {filteredCommunities.length} communities found
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

        {/* Communities Grid/List */}
        {filteredCommunities.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCommunities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Trending Badge */}
                      {community.trending && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                      
                      {/* Member Count */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                        <FiUsers className="w-4 h-4" />
                        <span>{(community.members / 1000).toFixed(1)}K members</span>
                      </div>

                      {/* Category Tag */}
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                        {community.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${community.color} flex items-center justify-center text-white`}>
                            {community.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {community.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {community.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {community.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{community.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiMapPin className="w-4 h-4 text-purple-400" />
                          <span>{community.location}</span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'
                          }`}
                        >
                          Join Community
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-48 h-32 md:h-auto relative overflow-hidden">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      {community.trending && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full">
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${community.color} flex items-center justify-center text-white text-xs`}>
                              {community.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                          </div>
                          <p className="text-sm text-gray-500">{community.category} • {community.location}</p>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md`}
                        >
                          Join
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {community.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiUsers className="w-4 h-4 text-purple-400" />
                          {(community.members / 1000).toFixed(1)}K members
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4 text-pink-400" />
                          {community.events} events
                        </span>
                        <span className="flex items-center gap-1">
                          <FiAward className="w-4 h-4 text-purple-400" />
                          Since {community.founded}
                        </span>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Featured Communities Section */}
        {filteredCommunities.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communities.filter(c => c.featured).slice(0, 2).map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-bold rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-white/80">{community.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{community.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1">
                        <FiUsers className="w-4 h-4" />
                        {(community.members / 1000).toFixed(1)}K members
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        {community.city}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Communities