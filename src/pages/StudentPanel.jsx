import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCalendar,
  FiUsers,
  FiAward,
  FiClock,
  FiMapPin,
  FiBookOpen,
  FiTrendingUp,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiStar,
  FiHeart,
  FiCamera,
  FiMic,
  FiMusic,
  FiCpu,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiEye,
  FiCheckSquare,
  FiSquare,
  FiCompass,
  FiTarget,
  FiBriefcase,
  FiPieChart,
  FiBarChart2,
  FiCode,
  FiPenTool,
  FiPlus,
  FiHeadphones,
  FiDollarSign,
  FiShoppingBag,
  FiFilm,
  FiSmartphone,
  FiGlobe,
  FiLock,
  FiDatabase,
  FiCloud,
  FiTerminal
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const StudentDashboard = () => {
  const { logout } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const notificationsSectionRef = useRef(null)

  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  if (!user) {
    return <h2>Please login</h2>
  }

  const [myParticipationData] = useState([
    {
      id: 1,
      eventName: 'KL University Tech Fest 2024',
      category: 'Technology',
      joinedOn: '2024-02-26',
      date: '2024-03-15',
      role: 'Participant',
      hours: 6,
      status: 'Completed',
      certificate: true,
      contribution: 'Built an IoT prototype and presented in demo showcase'
    },
    {
      id: 2,
      eventName: 'AI & Robotics Hackathon',
      category: 'Technology',
      joinedOn: '2024-03-01',
      date: '2024-03-18',
      role: 'Team Member',
      hours: 12,
      status: 'Completed',
      certificate: true,
      contribution: 'Developed ML model for predictive analytics challenge'
    },
    {
      id: 3,
      eventName: 'Startup India Pitch Fest',
      category: 'Business',
      joinedOn: '2024-04-10',
      date: '2024-05-02',
      role: 'Presenter',
      hours: 4,
      status: 'Upcoming',
      certificate: false,
      contribution: 'Preparing investor pitch deck and product roadmap'
    },
    {
      id: 4,
      eventName: 'Inter-KL University Sports Meet',
      category: 'Sports',
      joinedOn: '2024-03-28',
      date: '2024-04-20',
      role: 'Volunteer',
      hours: 5,
      status: 'Completed',
      certificate: true,
      contribution: 'Coordinated track events and participant management'
    },
    {
      id: 5,
      eventName: 'Google Cloud Summit',
      category: 'Technology',
      joinedOn: '2024-03-12',
      date: '2024-04-05',
      role: 'Attendee',
      hours: 7,
      status: 'Completed',
      certificate: true,
      contribution: 'Completed cloud labs and earned hands-on badge'
    },
    {
      id: 6,
      eventName: 'Young Entrepreneurs Summit',
      category: 'Business',
      joinedOn: '2024-04-15',
      date: '2024-05-20',
      role: 'Delegate',
      hours: 6,
      status: 'Upcoming',
      certificate: false,
      contribution: 'Networking with founders and startup mentors'
    }
  ])

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [eventToRegister, setEventToRegister] = useState(null)
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    paymentId: '',
    agreeTerms: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showSuggestEventModal, setShowSuggestEventModal] = useState(false)
  const [suggestEventData, setSuggestEventData] = useState({
    name: '',
    category: '',
    date: '',
    capacity: '',
    price: '',
    description: ''
  })
  const [suggestEventErrors, setSuggestEventErrors] = useState({})

  const [selectedCareer, setSelectedCareer] = useState(null)
  const [showCareerDetails, setShowCareerDetails] = useState(false)

  const [expandedSkill, setExpandedSkill] = useState(null)
  const [skillViewMode, setSkillViewMode] = useState('grid')
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all')

  const [selectedCareerForRecs, setSelectedCareerForRecs] = useState(null)
  const [recommendationView, setRecommendationView] = useState(() => {
    const storedView = localStorage.getItem('recommendationView')
    return storedView === 'list' ? 'list' : 'grid'
  })
  const [showGapDetails, setShowGapDetails] = useState(false)
  const [selectedGapSkill, setSelectedGapSkill] = useState(null)
  const [recommendationFilters, setRecommendationFilters] = useState({
    difficulty: 'all',
    duration: 'all',
    format: 'all'
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Event Added',
      message: 'Bollywood Music Festival registrations are now open!',
      time: '5 min ago',
      read: false,
      type: 'event'
    },
    {
      id: 2,
      title: 'Registration Confirmed',
      message: 'You have successfully registered for Tech Fest 2024',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: '⏰ Tomorrow: AI & Robotics Hackathon',
      message: 'Your event starts tomorrow at 9:00 AM. Don\'t forget!',
      time: '1 day ago',
      read: true,
      type: 'reminder'
    }
  ])
  const [hasLoadedExtraNotifications, setHasLoadedExtraNotifications] = useState(false)

  const [allEvents, setAllEvents] = useState([
    {
      id: 1,
      name: 'KL University Tech Fest 2024',
      category: 'Technology',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Guntur',
      spots: 5000,
      registered: true,
      selected: false,
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹999',
      organizer: 'KL University',
      description: 'Asia\'s largest science and technology festival featuring workshops, competitions, and exhibitions.',
      speakers: ['Narayana Murthy', 'Kiran Mazumdar-Shaw', 'Bhavish Aggarwal']
    },
    {
      id: 2,
      name: 'AI & Robotics Hackathon',
      category: 'Technology',
      date: '2024-03-18',
      time: '9:00 AM',
      location: 'Guntur',
      spots: 200,
      registered: true,
      selected: false,
      icon: <FiCpu className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Microsoft Research',
      description: '48-hour hackathon focused on AI and robotics solutions.',
      speakers: ['Sundar Pichai', 'Sam Altman']
    },
    {
      id: 3,
      name: 'Google Cloud Summit',
      category: 'Technology',
      date: '2024-04-05',
      time: '10:00 AM',
      location: 'Guntur',
      spots: 1000,
      registered: true,
      selected: false,
      icon: <FiCloud className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹499',
      organizer: 'Google',
      description: 'Learn about cloud computing, AI/ML, and career opportunities.',
      speakers: ['Google Engineers']
    },
    {
      id: 4,
      name: 'Sunburn Music Festival',
      category: 'Music',
      date: '2024-04-05',
      time: '4:00 PM',
      location: 'Guntur',
      spots: 25000,
      registered: false,
      selected: false,
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹2,499',
      organizer: 'Sunburn',
      description: 'Asia\'s biggest electronic music festival.',
      artists: ['Nucleya', 'Divine', 'Martin Garrix']
    },
    {
      id: 5,
      name: 'Bollywood Music Night',
      category: 'Music',
      date: '2024-03-25',
      time: '7:00 PM',
      location: 'Guntur',
      spots: 5000,
      registered: false,
      selected: false,
      icon: <FiHeadphones className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹999',
      organizer: 'Zee Live',
      description: 'Night of Bollywood hits with live performances.',
      artists: ['Arijit Singh', 'Shreya Ghoshal']
    },
    {
      id: 6,
      name: 'Classical Music Concert',
      category: 'Music',
      date: '2024-04-12',
      time: '6:00 PM',
      location: 'Guntur',
      spots: 2000,
      registered: false,
      selected: false,
      icon: <FiMusic className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: false,
      price: '₹599',
      organizer: 'Madras Music Academy',
      description: 'Evening of classical Carnatic music.',
      artists: ['Bombay Jayashree', 'T.M. Krishna']
    },
    {
      id: 7,
      name: 'Inter-KL University Sports Meet',
      category: 'Sports',
      date: '2024-04-20',
      time: '8:00 AM',
      location: 'Guntur',
      spots: 2000,
      registered: false,
      selected: false,
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: 'Free',
      organizer: 'KL University',
      description: 'Annual sports competition hosted by KL University.'
    },
    {
      id: 8,
      name: 'Mumbai Marathon 2024',
      category: 'Sports',
      date: '2024-05-15',
      time: '5:00 AM',
      location: 'Guntur',
      spots: 50000,
      registered: false,
      selected: false,
      icon: <FiActivity className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹799',
      organizer: 'Procam International',
      description: 'India\'s largest marathon.'
    },
    {
      id: 9,
      name: 'Startup India Pitch Fest',
      category: 'Business',
      date: '2024-05-02',
      time: '10:00 AM',
      location: 'Guntur',
      spots: 500,
      registered: true,
      selected: false,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Startup India',
      description: 'Pitch your startup idea to top VCs.',
      speakers: ['Kunal Shah', 'Vijay Shekhar Sharma']
    },
    {
      id: 10,
      name: 'Young Entrepreneurs Summit',
      category: 'Business',
      date: '2024-05-20',
      time: '9:00 AM',
      location: 'Guntur',
      spots: 1000,
      registered: false,
      selected: false,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: false,
      price: '₹299',
      organizer: 'TiE',
      description: 'Learn from successful entrepreneurs.',
      speakers: ['Bhavish Aggarwal', 'Falguni Nayar']
    },
    {
      id: 11,
      name: 'Investment Banking Workshop',
      category: 'Business',
      date: '2024-06-05',
      time: '11:00 AM',
      location: 'Guntur',
      spots: 200,
      registered: false,
      selected: false,
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹999',
      organizer: 'Goldman Sachs',
      description: 'Workshop on investment banking careers.'
    },
    {
      id: 12,
      name: 'BGMI Pro League',
      category: 'Gaming',
      date: '2024-05-25',
      time: '11:00 AM',
      location: 'Guntur',
      spots: 5000,
      registered: false,
      selected: false,
      icon: <FiSmartphone className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹499',
      organizer: 'Krafton',
      description: 'India\'s biggest BGMI tournament.'
    },
    {
      id: 13,
      name: 'Valorant Campus Clash',
      category: 'Gaming',
      date: '2024-06-15',
      time: '2:00 PM',
      location: 'Guntur',
      spots: 1000,
      registered: false,
      selected: false,
      icon: <FiSmartphone className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Riot Games',
      description: 'Inter-college Valorant tournament.'
    },
    {
      id: 14,
      name: 'Lakme Fashion Week',
      category: 'Fashion',
      date: '2024-05-10',
      time: '7:00 PM',
      location: 'Guntur',
      spots: 3000,
      registered: false,
      selected: false,
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trending: true,
      price: '₹4,999',
      organizer: 'Lakme',
      description: 'India\'s premier fashion event.'
    },
    {
      id: 15,
      name: 'Jaipur Literature Festival',
      category: 'Literary',
      date: '2024-06-20',
      time: '9:00 AM',
      location: 'Guntur',
      spots: 10000,
      registered: false,
      selected: false,
      icon: <FiBookOpen className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'Teamwork Arts',
      description: 'World\'s largest free literary festival.',
      speakers: ['Chetan Bhagat', 'Ruskin Bond']
    },
    {
      id: 16,
      name: 'Yoga & Wellness Retreat',
      category: 'Health',
      date: '2024-04-02',
      time: '6:00 AM',
      location: 'Guntur',
      spots: 100,
      registered: false,
      selected: false,
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: '₹4,999',
      organizer: 'Patanjali',
      description: '3-day yoga and meditation retreat.'
    },
    {
      id: 17,
      name: 'Mental Health Summit',
      category: 'Health',
      date: '2024-05-30',
      time: '10:00 AM',
      location: 'Guntur',
      spots: 5000,
      registered: false,
      selected: false,
      icon: <FiHeart className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      trending: true,
      price: 'Free',
      organizer: 'YourDOST',
      description: 'Summit on mental health awareness.'
    }
  ])

  const [myRegistrations, setMyRegistrations] = useState(allEvents.filter(event => event.registered))
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: 'Coding Club',
      description: 'Learn, code, innovate - Join the coding revolution',
      category: 'Technical',
      memberCount: 250,
      image: '💻',
      color: 'from-blue-500 to-purple-500',
      isMember: false,
      events: [1, 2]
    },
    {
      id: 2,
      name: 'Music Club',
      description: 'Explore your musical talents',
      category: 'Cultural',
      memberCount: 180,
      image: '🎵',
      color: 'from-pink-500 to-red-500',
      isMember: true,
      events: [4, 5]
    },
    {
      id: 3,
      name: 'Sports Club',
      description: 'Stay active and competitive',
      category: 'Sports',
      memberCount: 320,
      image: '⚽',
      color: 'from-green-500 to-emerald-500',
      isMember: false,
      events: [7, 8]
    }
  ])
  const [myClubs, setMyClubs] = useState(clubs.filter(club => club.isMember))
  const [selectedClub, setSelectedClub] = useState(null)
  const [showClubDetails, setShowClubDetails] = useState(false)

  const careerData = {
    activitySkills: {
      'KL University Tech Fest 2024': [
        { name: 'Technical Knowledge', level: 85, category: 'Technical', icon: '💻' },
        { name: 'Problem Solving', level: 90, category: 'Analytical', icon: '🧩' },
        { name: 'Innovation', level: 88, category: 'Creative', icon: '💡' },
        { name: 'Project Management', level: 75, category: 'Management', icon: '📋' },
        { name: 'Team Collaboration', level: 80, category: 'Soft Skills', icon: '🤝' }
      ],
      'AI & Robotics Hackathon': [
        { name: 'Python Programming', level: 95, category: 'Technical', icon: '🐍' },
        { name: 'Machine Learning', level: 92, category: 'Technical', icon: '🤖' },
        { name: 'Algorithm Design', level: 90, category: 'Analytical', icon: '📊' },
        { name: 'Data Structures', level: 88, category: 'Technical', icon: '🗂️' },
        { name: 'Team Collaboration', level: 85, category: 'Soft Skills', icon: '🤝' }
      ],
      'Google Cloud Summit': [
        { name: 'Cloud Computing', level: 92, category: 'Technical', icon: '☁️' },
        { name: 'DevOps', level: 85, category: 'Technical', icon: '🔄' },
        { name: 'System Architecture', level: 88, category: 'Technical', icon: '🏗️' },
        { name: 'Technical Documentation', level: 75, category: 'Communication', icon: '📝' },
        { name: 'Industry Knowledge', level: 90, category: 'Knowledge', icon: '📚' }
      ],
      'Sunburn Music Festival': [
        { name: 'Event Management', level: 95, category: 'Management', icon: '🎪' },
        { name: 'Crowd Management', level: 92, category: 'Operations', icon: '👥' },
        { name: 'Artist Coordination', level: 90, category: 'Management', icon: '🎤' },
        { name: 'Marketing', level: 85, category: 'Marketing', icon: '📢' },
        { name: 'Logistics Planning', level: 88, category: 'Operations', icon: '📦' }
      ],
      'Bollywood Music Night': [
        { name: 'Performance', level: 92, category: 'Artistic', icon: '🎭' },
        { name: 'Stage Management', level: 88, category: 'Management', icon: '🎬' },
        { name: 'Audience Engagement', level: 90, category: 'Communication', icon: '👏' },
        { name: 'Creative Direction', level: 85, category: 'Creative', icon: '✨' },
        { name: 'Sound Engineering', level: 80, category: 'Technical', icon: '🔊' }
      ],
      'Classical Music Concert': [
        { name: 'Artistic Excellence', level: 95, category: 'Artistic', icon: '🎨' },
        { name: 'Discipline', level: 98, category: 'Soft Skills', icon: '⏰' },
        { name: 'Cultural Knowledge', level: 92, category: 'Knowledge', icon: '🏛️' },
        { name: 'Performance', level: 94, category: 'Artistic', icon: '🎵' },
        { name: 'Attention to Detail', level: 96, category: 'Soft Skills', icon: '🔍' }
      ],
      'Inter-KL University Sports Meet': [
        { name: 'Leadership', level: 90, category: 'Management', icon: '👑' },
        { name: 'Teamwork', level: 95, category: 'Soft Skills', icon: '🤝' },
        { name: 'Discipline', level: 98, category: 'Soft Skills', icon: '⏰' },
        { name: 'Competitive Spirit', level: 92, category: 'Soft Skills', icon: '🏆' },
        { name: 'Time Management', level: 88, category: 'Soft Skills', icon: '⏱️' }
      ],
      'Mumbai Marathon 2024': [
        { name: 'Endurance', level: 95, category: 'Physical', icon: '🏃' },
        { name: 'Goal Setting', level: 92, category: 'Soft Skills', icon: '🎯' },
        { name: 'Self-Motivation', level: 94, category: 'Soft Skills', icon: '🔥' },
        { name: 'Physical Fitness', level: 96, category: 'Physical', icon: '💪' },
        { name: 'Community Engagement', level: 85, category: 'Social', icon: '🌍' }
      ],
      'Startup India Pitch Fest': [
        { name: 'Business Planning', level: 92, category: 'Business', icon: '📈' },
        { name: 'Pitching', level: 98, category: 'Communication', icon: '🎯' },
        { name: 'Market Research', level: 90, category: 'Analytical', icon: '🔍' },
        { name: 'Investor Relations', level: 88, category: 'Business', icon: '💰' },
        { name: 'Entrepreneurship', level: 95, category: 'Business', icon: '🚀' }
      ],
      'Young Entrepreneurs Summit': [
        { name: 'Networking', level: 95, category: 'Social', icon: '🤝' },
        { name: 'Business Strategy', level: 92, category: 'Business', icon: '📊' },
        { name: 'Leadership', level: 90, category: 'Management', icon: '👑' },
        { name: 'Brand Building', level: 88, category: 'Marketing', icon: '🏷️' },
        { name: 'Startup Management', level: 94, category: 'Business', icon: '🚀' }
      ],
      'Investment Banking Workshop': [
        { name: 'Financial Modeling', level: 96, category: 'Finance', icon: '📊' },
        { name: 'Valuation', level: 94, category: 'Finance', icon: '💰' },
        { name: 'Deal Structuring', level: 92, category: 'Finance', icon: '🤝' },
        { name: 'Market Analysis', level: 90, category: 'Analytical', icon: '📈' },
        { name: 'Risk Assessment', level: 88, category: 'Analytical', icon: '⚠️' }
      ],
      'BGMI Pro League': [
        { name: 'Strategic Planning', level: 94, category: 'Analytical', icon: '🧠' },
        { name: 'Quick Reflexes', level: 96, category: 'Physical', icon: '⚡' },
        { name: 'Team Coordination', level: 92, category: 'Soft Skills', icon: '🤝' },
        { name: 'Pressure Management', level: 90, category: 'Soft Skills', icon: '😮‍💨' },
        { name: 'Tournament Strategy', level: 88, category: 'Analytical', icon: '🏆' }
      ],
      'Valorant Campus Clash': [
        { name: 'Tactical Thinking', level: 94, category: 'Analytical', icon: '🧠' },
        { name: 'Communication', level: 96, category: 'Communication', icon: '💬' },
        { name: 'Team Synergy', level: 92, category: 'Soft Skills', icon: '🤝' },
        { name: 'Adaptability', level: 90, category: 'Soft Skills', icon: '🔄' },
        { name: 'Competitive Gaming', level: 88, category: 'Gaming', icon: '🎮' }
      ],
      'Lakme Fashion Week': [
        { name: 'Fashion Design', level: 94, category: 'Creative', icon: '👗' },
        { name: 'Trend Forecasting', level: 92, category: 'Analytical', icon: '🔮' },
        { name: 'Creative Direction', level: 96, category: 'Creative', icon: '✨' },
        { name: 'Brand Management', level: 88, category: 'Business', icon: '🏷️' },
        { name: 'Visual Aesthetics', level: 94, category: 'Creative', icon: '🎨' }
      ],
      'Jaipur Literature Festival': [
        { name: 'Creative Writing', level: 94, category: 'Creative', icon: '✍️' },
        { name: 'Critical Analysis', level: 92, category: 'Analytical', icon: '🔍' },
        { name: 'Research', level: 90, category: 'Analytical', icon: '📚' },
        { name: 'Public Speaking', level: 88, category: 'Communication', icon: '🎤' },
        { name: 'Literary Knowledge', level: 94, category: 'Knowledge', icon: '📖' }
      ],
      'Yoga & Wellness Retreat': [
        { name: 'Wellness Coaching', level: 94, category: 'Health', icon: '🧘' },
        { name: 'Stress Management', level: 96, category: 'Health', icon: '😌' },
        { name: 'Holistic Health', level: 92, category: 'Health', icon: '🌿' },
        { name: 'Meditation', level: 98, category: 'Health', icon: '🧠' },
        { name: 'Lifestyle Guidance', level: 90, category: 'Health', icon: '🌟' }
      ],
      'Mental Health Summit': [
        { name: 'Counseling', level: 94, category: 'Health', icon: '💚' },
        { name: 'Psychology', level: 92, category: 'Knowledge', icon: '🧠' },
        { name: 'Empathy', level: 98, category: 'Soft Skills', icon: '💕' },
        { name: 'Crisis Management', level: 90, category: 'Management', icon: '🚨' },
        { name: 'Mental Health Awareness', level: 96, category: 'Knowledge', icon: '📚' }
      ]
    },
    skillToCareer: {
      'Python Programming': [
        { role: 'Software Engineer', match: 95, demand: 'Very High', salary: '₹8-25L' },
        { role: 'Data Scientist', match: 92, demand: 'Very High', salary: '₹10-30L' },
        { role: 'AI/ML Engineer', match: 98, demand: 'Very High', salary: '₹12-35L' },
        { role: 'Backend Developer', match: 94, demand: 'Very High', salary: '₹8-22L' }
      ],
      'Machine Learning': [
        { role: 'AI/ML Engineer', match: 98, demand: 'Very High', salary: '₹12-35L' },
        { role: 'Data Scientist', match: 95, demand: 'Very High', salary: '₹10-30L' },
        { role: 'Research Scientist', match: 90, demand: 'High', salary: '₹10-28L' },
        { role: 'Computer Vision Engineer', match: 94, demand: 'High', salary: '₹12-30L' }
      ],
      'Algorithm Design': [
        { role: 'Software Engineer', match: 92, demand: 'Very High', salary: '₹8-25L' },
        { role: 'Data Scientist', match: 90, demand: 'Very High', salary: '₹10-30L' },
        { role: 'Quantitative Analyst', match: 94, demand: 'High', salary: '₹15-35L' },
        { role: 'AI Research Scientist', match: 96, demand: 'High', salary: '₹15-40L' }
      ],
      'Data Structures': [
        { role: 'Software Engineer', match: 94, demand: 'Very High', salary: '₹8-25L' },
        { role: 'Backend Developer', match: 92, demand: 'Very High', salary: '₹8-22L' },
        { role: 'Systems Engineer', match: 88, demand: 'High', salary: '₹8-20L' }
      ],
      'Cloud Computing': [
        { role: 'Cloud Architect', match: 98, demand: 'Very High', salary: '₹15-40L' },
        { role: 'DevOps Engineer', match: 95, demand: 'Very High', salary: '₹10-28L' },
        { role: 'Site Reliability Engineer', match: 92, demand: 'High', salary: '₹12-30L' },
        { role: 'Cloud Developer', match: 90, demand: 'Very High', salary: '₹10-25L' }
      ],
      'DevOps': [
        { role: 'DevOps Engineer', match: 98, demand: 'Very High', salary: '₹10-28L' },
        { role: 'Site Reliability Engineer', match: 95, demand: 'High', salary: '₹12-30L' },
        { role: 'Platform Engineer', match: 92, demand: 'High', salary: '₹10-28L' }
      ],
      'System Architecture': [
        { role: 'Solutions Architect', match: 98, demand: 'Very High', salary: '₹15-38L' },
        { role: 'Technical Lead', match: 94, demand: 'High', salary: '₹12-32L' }
      ],
      'Event Management': [
        { role: 'Event Manager', match: 98, demand: 'Medium', salary: '₹5-15L' },
        { role: 'Wedding Planner', match: 95, demand: 'Medium', salary: '₹5-20L' },
        { role: 'PR Manager', match: 88, demand: 'High', salary: '₹8-22L' }
      ],
      'Business Planning': [
        { role: 'Entrepreneur', match: 98, demand: 'Medium', salary: '₹10-100L+' },
        { role: 'Business Analyst', match: 92, demand: 'Very High', salary: '₹8-20L' },
        { role: 'Management Consultant', match: 90, demand: 'High', salary: '₹12-30L' }
      ],
      'Financial Modeling': [
        { role: 'Investment Banker', match: 98, demand: 'High', salary: '₹15-40L' },
        { role: 'Financial Analyst', match: 97, demand: 'Very High', salary: '₹8-20L' },
        { role: 'Portfolio Manager', match: 95, demand: 'Medium', salary: '₹12-35L' }
      ],
      'Leadership': [
        { role: 'Project Manager', match: 92, demand: 'High', salary: '₹10-28L' },
        { role: 'Team Lead', match: 95, demand: 'High', salary: '₹10-25L' },
        { role: 'CEO/Founder', match: 98, demand: 'Medium', salary: '₹15-100L+' }
      ],
      'Creative Writing': [
        { role: 'Content Writer', match: 98, demand: 'High', salary: '₹4-12L' },
        { role: 'Journalist', match: 95, demand: 'Medium', salary: '₹5-15L' },
        { role: 'Copywriter', match: 96, demand: 'High', salary: '₹5-15L' }
      ],
      'Fashion Design': [
        { role: 'Fashion Designer', match: 98, demand: 'Medium', salary: '₹6-20L' },
        { role: 'Stylist', match: 95, demand: 'Medium', salary: '₹5-15L' },
        { role: 'Fashion Merchandiser', match: 92, demand: 'Medium', salary: '₹6-18L' }
      ],
      'Counseling': [
        { role: 'Psychologist', match: 98, demand: 'High', salary: '₹5-15L' },
        { role: 'School Counselor', match: 95, demand: 'Medium', salary: '₹4-10L' },
        { role: 'Therapist', match: 96, demand: 'High', salary: '₹5-18L' }
      ]
    },
    skillCategories: [
      'Technical', 'Analytical', 'Creative', 'Management', 'Soft Skills',
      'Communication', 'Business', 'Finance', 'Marketing', 'Health',
      'Artistic', 'Physical', 'Knowledge', 'Operations', 'Social', 'Gaming'
    ],
    careerDemand: {
      'Very High': '🔥🔥🔥 (Top 10% growth)',
      'High': '🔥🔥 (Above average)',
      'Medium': '🔥 (Stable)',
      'Growing': '📈 (Emerging field)'
    },
    careerRecommendations: {
      'Software Engineer': ['AI & Robotics Hackathon', 'KL University Tech Fest 2024', 'Google Cloud Summit'],
      'Product Manager': ['Startup India Pitch Fest', 'KL University Tech Fest 2024', 'Young Entrepreneurs Summit'],
      'Data Scientist': ['AI & Robotics Hackathon', 'KL University Tech Fest 2024', 'Investment Banking Workshop'],
      'Entrepreneur': ['Startup India Pitch Fest', 'Young Entrepreneurs Summit', 'Investment Banking Workshop'],
      'Investment Banker': ['Investment Banking Workshop', 'Startup India Pitch Fest', 'Young Entrepreneurs Summit'],
      'Event Manager': ['Sunburn Music Festival', 'Lakme Fashion Week', 'Bollywood Music Night'],
      'Fashion Designer': ['Lakme Fashion Week', 'Bollywood Music Night', 'Jaipur Literature Festival'],
      'Content Writer': ['Jaipur Literature Festival', 'Classical Music Concert', 'Bollywood Music Night'],
      'AI/ML Engineer': ['AI & Robotics Hackathon', 'KL University Tech Fest 2024', 'Google Cloud Summit'],
      'Psychologist': ['Mental Health Summit', 'Yoga & Wellness Retreat', 'Classical Music Concert']
    }
  }

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(allEvents.map(event => event.category))]
  const completedParticipation = myParticipationData.filter(item => item.status === 'Completed')
  const upcomingParticipation = myParticipationData.filter(item => item.status === 'Upcoming')
  const totalParticipationHours = myParticipationData.reduce((acc, item) => acc + item.hours, 0)
  const certificatesEarned = myParticipationData.filter(item => item.certificate).length

  const [stats] = useState({
    totalActivities: allEvents.length,
    myRegistrations: myRegistrations.length,
    upcomingEvents: myRegistrations.filter(a => new Date(a.date) > new Date()).length,
    completedEvents: myRegistrations.filter(a => new Date(a.date) < new Date()).length,
    trendingActivities: allEvents.filter(a => a.trending).length
  })

  const studentProfile = {
    name: user?.fullName,
    email: user?.email,
    department: 'B.Tech Computer Science',
    year: '3rd Year',
    location: 'Guntur Campus',
    headline: 'Aspiring Product Engineer & Community Builder',
    bio: 'Passionate about building real-world tech solutions, leading student initiatives, and growing through hackathons, workshops, and innovation challenges.',
    profileCompletion: 92,
    campusRank: 'Top 8% Active Learners',
    strengths: ['Problem Solving', 'Team Leadership', 'Public Speaking', 'Rapid Prototyping'],
    goals: ['Win a national hackathon', 'Publish 2 tech projects this semester', 'Mentor juniors in coding club'],
    achievements: [
      '🏆 Finalist - AI & Robotics Hackathon 2024',
      '🎤 Speaker - Student Innovation Meetup',
      '✅ 5 Certifications in Cloud & AI'
    ]
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif))
  }

  const openNotifications = () => {
    if (!hasLoadedExtraNotifications) {
      const extraNotifications = [
        {
          id: Date.now() + 1,
          title: 'Workshop Reminder',
          message: 'Cloud Computing workshop starts in 2 hours at Seminar Hall 2.',
          time: 'Just now',
          read: false,
          type: 'reminder'
        },
        {
          id: Date.now() + 2,
          title: 'Certificate Available',
          message: 'Your certificate for AI & Robotics Hackathon is now available to download.',
          time: 'Just now',
          read: false,
          type: 'success'
        },
        {
          id: Date.now() + 3,
          title: 'New Club Event',
          message: 'Coding Club added a new event: Competitive Programming Bootcamp.',
          time: 'Just now',
          read: false,
          type: 'event'
        }
      ]

      setNotifications(prev => [...extraNotifications, ...prev])
      setHasLoadedExtraNotifications(true)
      toast.success('New notifications loaded')
    }

    notificationsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleViewAllNotifications = () => {
    openNotifications()
    if (unreadNotificationsCount === 0) {
      toast('No new notifications')
      return
    }
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleRegister = (eventId) => {
    setAllEvents(prev => prev.map(event => event.id === eventId ? { ...event, registered: true } : event))
    const registeredEvent = allEvents.find(e => e.id === eventId)
    setMyRegistrations(prev => [...prev, { ...registeredEvent, registered: true }])
    toast.success('Successfully registered!')
  }

  const handleUnregister = (eventId) => {
    setAllEvents(prev => prev.map(event => event.id === eventId ? { ...event, registered: false } : event))
    setMyRegistrations(prev => prev.filter(reg => reg.id !== eventId))
    toast.success('Unregistered successfully!')
  }

  const handleJoinClub = (clubId) => {
    const joinedClub = clubs.find(club => club.id === clubId)
    if (!joinedClub || joinedClub.isMember) return

    setClubs(prev => prev.map(club => club.id === clubId
      ? { ...club, isMember: true, memberCount: club.memberCount + 1 }
      : club
    ))

    toast.success(`Successfully joined ${joinedClub.name}!`)
  }

  const handleLeaveClub = (clubId) => {
    const leavingClub = clubs.find(club => club.id === clubId)
    if (!leavingClub || !leavingClub.isMember) return

    setClubs(prev => prev.map(club => club.id === clubId
      ? { ...club, isMember: false, memberCount: Math.max(0, club.memberCount - 1) }
      : club
    ))

    toast.success('Left club successfully')
  }

  const handleViewClubDetails = (club) => {
    setSelectedClub(club)
    setShowClubDetails(true)
  }

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event)
    setShowEventDetailsModal(true)
  }

  const closeEventDetailsModal = () => {
    setShowEventDetailsModal(false)
    setSelectedEvent(null)
  }

  const openRegistrationForm = (event) => {
    setEventToRegister(event)
    setRegistrationData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: '',
      college: '',
      year: '',
      paymentId: '',
      agreeTerms: false
    })
    setFormErrors({})
    setShowRegistrationForm(true)
  }

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false)
    setEventToRegister(null)
    setRegistrationData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      paymentId: '',
      agreeTerms: false
    })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleRegistrationInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegistrationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateRegistrationForm = () => {
    const errors = {}

    if (!registrationData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }

    if (!registrationData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(registrationData.email)) {
      errors.email = 'Email is invalid'
    }

    if (!registrationData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^[0-9+\-\s]{10,15}$/.test(registrationData.phone)) {
      errors.phone = 'Phone number is invalid'
    }

    if (!registrationData.college.trim()) {
      errors.college = 'College name is required'
    }

    if (!registrationData.year) {
      errors.year = 'Year of study is required'
    }

    if (eventToRegister?.price !== 'Free' && !registrationData.paymentId.trim()) {
      errors.paymentId = 'Payment ID is required for paid events'
    }

    if (!registrationData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms'
    }

    return errors
  }

  const handleSubmitRegistration = () => {
    const errors = validateRegistrationForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error('Please fill all required fields')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      handleRegister(eventToRegister.id)
      toast.success(`Successfully registered for ${eventToRegister.name}!`)
      closeRegistrationForm()
      setIsSubmitting(false)
    }, 1500)
  }

  const openSuggestEventModal = () => {
    setSuggestEventData({
      name: '',
      category: '',
      date: '',
      capacity: '',
      price: '',
      description: ''
    })
    setSuggestEventErrors({})
    setShowSuggestEventModal(true)
  }

  const closeSuggestEventModal = () => {
    setShowSuggestEventModal(false)
    setSuggestEventErrors({})
  }

  const handleSuggestEventChange = (e) => {
    const { name, value } = e.target
    setSuggestEventData(prev => ({ ...prev, [name]: value }))
    if (suggestEventErrors[name]) {
      setSuggestEventErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSuggestEvent = (eventData) => {
    const errors = {}
    if (!eventData.name.trim()) errors.name = 'Event name is required'
    if (!eventData.category.trim()) errors.category = 'Category is required'
    if (!eventData.date) errors.date = 'Date is required'
    if (!eventData.capacity.trim()) errors.capacity = 'Capacity is required'
    if (!eventData.price.trim()) errors.price = 'Price is required'
    if (!eventData.description.trim()) errors.description = 'Description is required'

    if (Object.keys(errors).length > 0) {
      setSuggestEventErrors(errors)
      toast.error('Please fill all required fields')
      return
    }

    const suggestion = {
      id: Date.now(),
      type: 'event',
      title: 'Event Approval Needed',
      name: eventData.name,
      category: eventData.category,
      date: eventData.date,
      details: `${eventData.capacity} capacity • ${eventData.price}`,
      submittedBy: user?.fullName || 'Student',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: eventData.description
    }

    void suggestion
    toast.success('Event suggestion submitted for admin approval!')
    setShowSuggestEventModal(false)
  }

  const handleSelectActivity = (eventId) => {
    setAllEvents(prev => prev.map(event => event.id === eventId ? { ...event, selected: !event.selected } : event))

    setSelectedActivities(prev => prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId])
  }

  const handleSelectAll = () => {
    const filteredIds = filteredEvents.map(e => e.id)

    if (selectedActivities.length === filteredEvents.length) {
      setAllEvents(prev => prev.map(event => ({ ...event, selected: false })))
      setSelectedActivities([])
    } else {
      setAllEvents(prev => prev.map(event => ({ ...event, selected: filteredIds.includes(event.id) ? true : event.selected })))
      setSelectedActivities(filteredIds)
    }
  }

  const handleBulkRegister = () => {
    if (selectedActivities.length === 0) return

    let registeredCount = 0
    selectedActivities.forEach(id => {
      const event = allEvents.find(e => e.id === id)
      if (!event.registered) {
        setAllEvents(prev => prev.map(e => e.id === id ? { ...e, registered: true } : e))
        const registeredEvent = allEvents.find(e => e.id === id)
        setMyRegistrations(prev => [...prev, { ...registeredEvent, registered: true }])
        registeredCount++
      }
    })

    setAllEvents(prev => prev.map(event => ({ ...event, selected: false })))
    setSelectedActivities([])
    setSelectMode(false)

    toast.success(`Successfully registered for ${registeredCount} activities!`)
  }

  const exitSelectMode = () => {
    setSelectMode(false)
    setAllEvents(prev => prev.map(event => ({ ...event, selected: false })))
    setSelectedActivities([])
  }

  useEffect(() => {
    const upcomingEvents = myRegistrations.filter(e => new Date(e.date) > new Date())

    upcomingEvents.forEach(event => {
      const eventDate = new Date(event.date)
      const today = new Date()
      const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))

      if (daysUntil === 1) {
        const existingNotif = notifications.find(n => n.title.includes(event.name) && n.type === 'reminder')
        if (!existingNotif) {
          setNotifications(prev => [{
            id: Date.now(),
            title: `⏰ Tomorrow: ${event.name}`,
            message: `Don't forget! ${event.name} is tomorrow at ${event.time}`,
            time: 'Just now',
            read: false,
            type: 'reminder'
          }, ...prev])
        }
      }
    })
  }, [myRegistrations])

  useEffect(() => {
    localStorage.setItem('recommendationView', recommendationView)
  }, [recommendationView])

  useEffect(() => {
    setMyClubs(clubs.filter(club => club.isMember))
    if (selectedClub) {
      const updatedClub = clubs.find(club => club.id === selectedClub.id)
      if (updatedClub) {
        setSelectedClub(updatedClub)
      }
    }
  }, [clubs])

  const analyzeCareerReadiness = () => {
    const myActivities = myRegistrations.map(reg => reg.name)

    const skillMap = new Map()
    const skillCategories = {}

    myActivities.forEach(activity => {
      const skills = careerData.activitySkills[activity] || []
      skills.forEach(skill => {
        const key = skill.name
        if (!skillMap.has(key)) {
          skillMap.set(key, {
            ...skill,
            occurrences: 1,
            totalLevel: skill.level
          })
          if (!skillCategories[skill.category]) {
            skillCategories[skill.category] = []
          }
        } else {
          const existing = skillMap.get(key)
          existing.occurrences++
          existing.totalLevel += skill.level
          existing.level = Math.round(existing.totalLevel / existing.occurrences)
        }
      })
    })

    const allSkills = Array.from(skillMap.values())
      .map(s => ({ ...s, level: Math.round(s.totalLevel / s.occurrences) }))
      .sort((a, b) => b.level - a.level)

    allSkills.forEach(skill => {
      if (!skillCategories[skill.category]) {
        skillCategories[skill.category] = []
      }
      skillCategories[skill.category].push(skill)
    })

    const topSkills = allSkills.slice(0, 5).map(s => ({ skill: s.name, count: s.occurrences, level: s.level }))

    const careerScores = {}
    allSkills.forEach(skill => {
      const careers = careerData.skillToCareer[skill.name] || []
      careers.forEach(({ role, match, demand }) => {
        if (!careerScores[role]) {
          careerScores[role] = { total: 0, count: 0, demand }
        }
        careerScores[role].total += match * (skill.level / 100)
        careerScores[role].count += 1
      })
    })

    const careerMatches = Object.entries(careerScores)
      .map(([role, data]) => ({
        role,
        match: Math.round(data.total / data.count),
        demand: data.demand,
        matchingSkills: topSkills.filter(s => careerData.skillToCareer[s.skill]?.some(c => c.role === role)).map(s => s.skill)
      }))
      .sort((a, b) => b.match - a.match)

    return {
      allSkills,
      skillsByCategory: skillCategories,
      topSkills,
      careerMatches: careerMatches.slice(0, 5),
      skillCount: allSkills.length,
      activityCount: myActivities.length
    }
  }

  const analyzeSkillGaps = (targetCareer) => {
    if (!targetCareer) return null

    console.log('Analyzing gaps for:', targetCareer.role)

    const currentSkills = []
    const currentSkillMap = new Map()

    myRegistrations.forEach(activity => {
      const skills = careerData.activitySkills[activity.name] || []
      skills.forEach(skill => {
        const key = skill.name
        if (!currentSkillMap.has(key)) {
          currentSkillMap.set(key, {
            ...skill,
            occurrences: 1,
            totalLevel: skill.level
          })
        } else {
          const existing = currentSkillMap.get(key)
          existing.occurrences++
          existing.totalLevel += skill.level
        }
      })
    })

    currentSkillMap.forEach((value, key) => {
      currentSkills.push({
        name: key,
        level: Math.round(value.totalLevel / value.occurrences),
        category: value.category,
        icon: value.icon
      })
    })

    const requiredSkills = []
    const requiredSkillNames = new Set()

    Object.entries(careerData.skillToCareer).forEach(([skillName, careers]) => {
      careers.forEach(career => {
        if (career.role === targetCareer.role) {
          requiredSkillNames.add(skillName)
          requiredSkills.push({
            name: skillName,
            required: true,
            importance: career.match,
            demand: career.demand,
            salary: career.salary
          })
        }
      })
    })

    void requiredSkillNames

    const skillsWithLevels = requiredSkills.map(required => {
      const yourSkill = currentSkills.find(s => s.name === required.name)
      return {
        ...required,
        current: yourSkill?.level || 0,
        category: yourSkill?.category || 'Unknown',
        icon: yourSkill?.icon || '📊'
      }
    })

    const skillGaps = skillsWithLevels.map(skill => ({
      ...skill,
      gap: Math.max(0, 70 - skill.current),
      status: skill.current >= 70 ? 'mastered' :
        skill.current >= 40 ? 'developing' : 'missing',
      percentComplete: Math.min(100, Math.round((skill.current / 70) * 100))
    }))

    const recommendedActivities = []
    const allActivities = allEvents.filter(e => !e.registered)

    skillGaps.forEach(gap => {
      if (gap.status !== 'mastered') {
        allActivities.forEach(activity => {
          const activitySkills = careerData.activitySkills[activity.name] || []
          activitySkills.forEach(skill => {
            if (skill.name === gap.name) {
              const gain = Math.min(100, gap.current + skill.level * 0.3)
              recommendedActivities.push({
                ...activity,
                relevanceScore: Math.round(skill.level * (1 - gap.current / 100)),
                skillCovered: gap.name,
                currentLevel: gap.current,
                gainAfter: Math.round(gain),
                gapFilled: gain >= 70,
                importance: gap.importance
              })
            }
          })
        })
      }
    })

    const uniqueActivities = []
    const seen = new Map()
    recommendedActivities.forEach(activity => {
      if (!seen.has(activity.id) || seen.get(activity.id).relevanceScore < activity.relevanceScore) {
        seen.set(activity.id, activity)
      }
    })
    seen.forEach(activity => uniqueActivities.push(activity))

    uniqueActivities.sort((a, b) => {
      if (a.gapFilled && !b.gapFilled) return -1
      if (!a.gapFilled && b.gapFilled) return 1
      return b.relevanceScore - a.relevanceScore
    })

    const masteredCount = skillGaps.filter(g => g.status === 'mastered').length
    const totalSkills = skillGaps.length
    const readinessScore = totalSkills > 0 ? Math.round((masteredCount / totalSkills) * 100) : 0

    return {
      skillGaps: skillGaps.filter(g => g.status !== 'mastered'),
      masteredSkills: skillGaps.filter(g => g.status === 'mastered'),
      recommendedActivities: uniqueActivities.slice(0, 8),
      totalGaps: skillGaps.filter(g => g.status !== 'mastered').length,
      totalSkills,
      masteredCount,
      readinessScore,
      careerName: targetCareer.role,
      careerMatch: targetCareer.match
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event': return <FiCalendar className="text-purple-500" />
      case 'success': return <FiCheckCircle className="text-green-500" />
      case 'reminder': return <FiAlertCircle className="text-pink-500" />
      default: return <FiBell className="text-gray-500" />
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technical': return <FiCode className="w-4 h-4" />
      case 'Analytical': return <FiBarChart2 className="w-4 h-4" />
      case 'Creative': return <FiPenTool className="w-4 h-4" />
      case 'Management': return <FiBriefcase className="w-4 h-4" />
      case 'Soft Skills': return <FiUsers className="w-4 h-4" />
      case 'Communication': return <FiMic className="w-4 h-4" />
      case 'Finance': return <FiDollarSign className="w-4 h-4" />
      case 'Marketing': return <FiTrendingUp className="w-4 h-4" />
      case 'Health': return <FiHeart className="w-4 h-4" />
      case 'Artistic': return <FiCamera className="w-4 h-4" />
      case 'Knowledge': return <FiBookOpen className="w-4 h-4" />
      case 'Gaming': return <FiActivity className="w-4 h-4" />
      case 'Operations': return <FiSettings className="w-4 h-4" />
      case 'Social': return <FiUsers className="w-4 h-4" />
      case 'Physical': return <FiActivity className="w-4 h-4" />
      default: return <FiAward className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white text-black [&_.text-gray-900]:text-black [&_.text-gray-800]:text-black [&_.text-gray-700]:text-black [&_.text-gray-600]:text-black [&_.text-gray-500]:text-black [&_.text-gray-400]:text-black [&_.hover\\:text-gray-800:hover]:text-black [&_.hover\\:text-gray-700:hover]:text-black [&_.hover\\:text-gray-600:hover]:text-black">
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-black">ClubConnect</span>
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">Student</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={openNotifications}
                  className="p-2 hover:bg-purple-50 rounded-full transition-colors relative"
                  title="Open notifications"
                >
                  <FiBell className="w-5 h-5 text-gray-600" />
                  {unreadNotificationsCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />}
                </button>
              </div>

              <div className="flex items-center gap-3 pl-4 border-l border-purple-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <button onClick={handleLogout} className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                  <FiLogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.fullName}! 👋</h1>
            <p className="text-purple-100 text-lg max-w-2xl">
              Explore {allEvents.length} events and activities happening across India. Find your next adventure!
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalActivities}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Activities</h3>
            <p className="text-sm text-gray-400 mt-1">Available this month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.myRegistrations}</span>
            </div>
            <h3 className="text-gray-600 font-medium">My Registrations</h3>
            <p className="text-sm text-gray-400 mt-1">Active participations</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Upcoming Events</h3>
            <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.trendingActivities}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Trending Now</h3>
            <p className="text-sm text-gray-400 mt-1">Hot this week</p>
          </motion.div>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto pb-1">
            <button onClick={() => setActiveTab('profile')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'profile' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>My Profile</button>
            <button onClick={() => setActiveTab('participation')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'participation' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FiCheckCircle className="w-4 h-4" /> My Participation
            </button>
            <button onClick={() => setActiveTab('catalog')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'catalog' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>Activity Catalog</button>
            <button onClick={() => setActiveTab('skills')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'skills' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FiAward className="w-4 h-4" /> My Skills
              {myRegistrations.length > 0 && <span className="ml-1 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">{analyzeCareerReadiness().skillCount}</span>}
            </button>
            <button onClick={() => setActiveTab('career')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'career' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FiCompass className="w-4 h-4" /> Career Path
              {myRegistrations.length > 0 && analyzeCareerReadiness().careerMatches.length > 0 && <span className="ml-1 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">{analyzeCareerReadiness().careerMatches[0]?.match}%</span>}
            </button>
            <button onClick={() => setActiveTab('recommendations')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'recommendations' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FiStar className="w-4 h-4" /> Smart Recs
              {myRegistrations.length > 0 && analyzeCareerReadiness().careerMatches.length > 0 && <span className="ml-1 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">{analyzeSkillGaps(analyzeCareerReadiness().careerMatches[0]).totalGaps} gaps</span>}
            </button>
            <button onClick={() => setActiveTab('clubs')} className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'clubs' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <FiUsers className="w-4 h-4" /> Clubs
              {myClubs.length > 0 && <span className="ml-1 bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">{myClubs.length}</span>}
            </button>
          </div>
        </div>

        {activeTab === 'catalog' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <FiBookOpen className="text-purple-600" /> Activity Catalog
                    </h2>
                    <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">{filteredEvents.length} Events</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      />
                    </div>

                    <button
                      onClick={() => selectMode ? exitSelectMode() : setSelectMode(true)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                    >
                      {selectMode ? 'Cancel' : 'Select'}
                    </button>

                    <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="p-2 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors">
                      {viewMode === 'grid' ? <FiList className="w-5 h-5 text-gray-600" /> : <FiGrid className="w-5 h-5 text-gray-600" />}
                    </button>

                    <button
                      onClick={openSuggestEventModal}
                      className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg font-medium flex items-center gap-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      Suggest Event
                    </button>
                  </div>
                </div>

                {selectMode && selectedActivities.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-purple-50 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={handleSelectAll} className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600">
                        {selectedActivities.length === filteredEvents.length ? <FiCheckSquare className="w-5 h-5 text-purple-600" /> : <FiSquare className="w-5 h-5" />}
                        Select All
                      </button>
                      <span className="text-sm text-gray-500">{selectedActivities.length} selected</span>
                    </div>

                    {selectedActivities.length > 0 && (
                      <button onClick={handleBulkRegister} className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:shadow-md transition-all">
                        Register ({selectedActivities.length})
                      </button>
                    )}
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${selectedCategory === category ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'}`}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  ))}
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => { if (selectMode) { handleSelectActivity(event.id) } else { handleViewEventDetails(event) } }}
                      className={`group bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all border ${event.selected ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-100'} ${viewMode === 'grid' ? 'p-4 cursor-pointer' : 'p-4 flex items-start gap-4 cursor-pointer'}`}
                    >
                      {viewMode === 'grid' ? (
                        <>
                          <div className="flex items-start gap-3 mb-3">
                            {selectMode && (
                              <div className="flex-shrink-0 mt-1">
                                {event.selected ? <FiCheckSquare className="w-5 h-5 text-purple-600" /> : <FiSquare className="w-5 h-5 text-gray-400" />}
                              </div>
                            )}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-white flex-shrink-0`}>{event.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">{event.name}</h3>
                                {event.trending && <FiTrendingUp className="w-4 h-4 text-pink-500 flex-shrink-0 ml-1" />}
                              </div>
                              <p className="text-xs text-gray-500">{event.category}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center gap-1 text-xs text-gray-500"><FiCalendar className="text-purple-400 w-3 h-3" /> {event.date}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500"><FiClock className="text-pink-400 w-3 h-3" /> {event.time}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500"><FiMapPin className="text-purple-400 w-3 h-3" /> {event.location.split(',')[0]}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500"><FiUsers className="text-pink-400 w-3 h-3" /> {event.spots} spots</div>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium text-purple-600">{event.price}</span>
                            {!selectMode && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleViewEventDetails(event) }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all inline-flex items-center gap-1"
                                >
                                  <FiEye className="w-3 h-3" />
                                  View
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (event.registered) {
                                      handleUnregister(event.id)
                                    } else {
                                      openRegistrationForm(event)
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${event.registered ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'}`}
                                >
                                  {event.registered ? '✓ Registered' : 'Register'}
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {selectMode && (
                            <div className="flex-shrink-0 mt-2">
                              {event.selected ? <FiCheckSquare className="w-5 h-5 text-purple-600" /> : <FiSquare className="w-5 h-5 text-gray-400" />}
                            </div>
                          )}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-white flex-shrink-0`}>{event.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{event.name}</h3>
                              {event.trending && <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">Trending</span>}
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{event.category} • {event.location}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><FiCalendar className="text-purple-400" /> {event.date}</span>
                              <span className="flex items-center gap-1"><FiClock className="text-pink-400" /> {event.time}</span>
                              <span className="flex items-center gap-1"><FiUsers className="text-purple-400" /> {event.spots} spots</span>
                            </div>
                          </div>
                          {!selectMode && (
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-sm font-medium text-purple-600">{event.price}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleViewEventDetails(event) }}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all inline-flex items-center gap-1"
                              >
                                <FiEye className="w-3 h-3" />
                                View
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (event.registered) {
                                    handleUnregister(event.id)
                                  } else {
                                    openRegistrationForm(event)
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${event.registered ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'}`}
                              >
                                {event.registered ? '✓' : 'Register'}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl shadow-xl p-6" ref={notificationsSectionRef}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiBell className="text-purple-600" />
                    Notifications
                  </h2>
                  <div className="flex gap-2">
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                          toast.success('All notifications marked as read')
                        }}
                        className="text-xs text-purple-600 hover:text-purple-700"
                      >
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={() => setNotifications([])} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                    )}
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${notification.read ? 'bg-gray-50' : 'bg-purple-50'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-pink-500 rounded-full" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiCheckCircle className="text-purple-600" />
                    My Registrations
                  </h2>
                  <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{myRegistrations.length}</span>
                </div>

                {myRegistrations.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {myRegistrations.map((registration, index) => (
                      <motion.div
                        key={registration.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl cursor-pointer hover:shadow-md"
                        onClick={() => handleViewEventDetails(registration)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${registration.color} flex items-center justify-center text-white flex-shrink-0`}>{registration.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm mb-1">{registration.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FiCalendar className="text-purple-400" /> {registration.date}
                              <FiMapPin className="text-pink-400 ml-1" /> {registration.location.split(',')[0]}
                            </div>
                          </div>
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Confirmed</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiCalendar className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No registrations yet</p>
                    <p className="text-xs text-gray-400 mt-1">Browse and register now!</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'participation' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-100">
                <p className="text-xs text-gray-500">Events Joined</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{myRegistrations.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-100">
                <p className="text-xs text-gray-500">Participation Records</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{myParticipationData.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-100">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{completedParticipation.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg border border-purple-100">
                <p className="text-xs text-gray-500">Certificates Earned</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{certificatesEarned}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiCheckCircle className="text-purple-600" />
                  Events You Joined
                </h2>
                <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                  {myRegistrations.length} Active
                </span>
              </div>

              {myRegistrations.length > 0 ? (
                <div className="space-y-3">
                  {myRegistrations.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{event.category} • {event.date} • {event.time}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.location} • {event.organizer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600">{event.price}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Joined</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">No joined events yet.</div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiActivity className="text-purple-600" />
                  My Participation
                </h2>
                <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                  {myParticipationData.length} Records
                </span>
              </div>

              <div className="space-y-3">
                {myParticipationData.map((item) => (
                  <div key={item.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.eventName}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.category} • Role: {item.role}</p>
                        <p className="text-xs text-gray-500 mt-1">Joined: {item.joinedOn} • Event Date: {item.date}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.contribution}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600">{item.hours}h</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {item.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${item.certificate ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.certificate ? 'Certificate' : 'No Certificate'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'skills' && myRegistrations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiAward className="text-purple-600" />
                  My Skills Portfolio
                </h2>
                <p className="text-gray-500 text-sm mt-1">Skills developed from {myRegistrations.length} registered activities</p>
              </div>
            </div>

            {(() => {
              const analysis = analyzeCareerReadiness()
              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">{analysis.skillCount}</p>
                      <p className="text-xs text-gray-600 mt-1">Total Skills</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">{Object.keys(analysis.skillsByCategory).length}</p>
                      <p className="text-xs text-gray-600 mt-1">Categories</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">{analysis.activityCount}</p>
                      <p className="text-xs text-gray-600 mt-1">Activities</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600">{Math.round(analysis.allSkills.reduce((acc, s) => acc + s.level, 0) / analysis.allSkills.length)}%</p>
                      <p className="text-xs text-gray-600 mt-1">Avg. Proficiency</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => setSelectedSkillCategory('all')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${selectedSkillCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                    >
                      All
                    </button>
                    {Object.keys(analysis.skillsByCategory).map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedSkillCategory(category)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${selectedSkillCategory === category ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analysis.allSkills
                      .filter(s => selectedSkillCategory === 'all' || s.category === selectedSkillCategory)
                      .map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.03 }}
                          className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100"
                          onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{skill.icon || '📊'}</span>
                              <span className="font-medium text-gray-900">{skill.name}</span>
                            </div>
                            <span className="text-lg font-bold text-purple-600">{skill.level}%</span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">From {skill.occurrences} activit{skill.occurrences > 1 ? 'ies' : 'y'}</span>
                            <span className="text-purple-600">{skill.category}</span>
                          </div>

                          <AnimatePresence>
                            {expandedSkill === skill.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t border-gray-200"
                              >
                                <p className="text-xs text-gray-600 mb-2">Used in:</p>
                                <div className="space-y-1">
                                  {myRegistrations
                                    .filter(reg => careerData.activitySkills[reg.name]?.some(s => s.name === skill.name))
                                    .map(reg => (
                                      <div key={reg.id} className="text-xs flex items-center gap-2">
                                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                                        <span className="text-gray-700">{reg.name}</span>
                                      </div>
                                    ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}

        {activeTab === 'career' && myRegistrations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiCompass className="text-purple-600" />
                  Career Path Matches
                </h2>
                <p className="text-gray-500 text-sm mt-1">Based on your skills from {myRegistrations.length} activities</p>
              </div>
            </div>

            {(() => {
              const analysis = analyzeCareerReadiness()
              const topMatch = analysis.careerMatches[0]

              return (
                <>
                  {topMatch && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-purple-100 text-sm mb-1">YOUR TOP CAREER MATCH</p>
                          <h3 className="text-3xl font-bold mb-2">{topMatch.role}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <FiTarget className="w-5 h-5" />
                              <span className="text-2xl font-bold">{topMatch.match}%</span>
                              <span className="text-purple-100 text-sm">match</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiTrendingUp className="w-5 h-5" />
                              <span className="text-sm">Demand: {topMatch.demand}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/20 rounded-full p-4">
                          <FiBriefcase className="w-8 h-8" />
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-purple-100 text-sm mb-2">Matching skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {topMatch.matchingSkills.map((skill, i) => (
                            <span key={i} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">✓ {skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3">
                    <h3 className="font-medium text-gray-700 mb-2">Other Career Matches:</h3>
                    {analysis.careerMatches.slice(1).map((career, index) => (
                      <motion.div
                        key={career.role}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => {
                          setSelectedCareer(career)
                          setShowCareerDetails(true)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{career.role}</h4>
                            <p className="text-xs text-gray-500 mt-1">{career.matchingSkills.slice(0, 3).join(' • ')}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-purple-600">{career.match}%</span>
                            <p className="text-xs text-gray-400">match</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}

        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FiStar className="text-purple-600" />
                    Smart Recommendations
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Personalized activity suggestions based on your career goals
                  </p>
                </div>
                {myRegistrations.length === 0 && (
                  <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm">
                    ⚠️ Register for activities to get recommendations
                  </div>
                )}
              </div>

              {myRegistrations.length > 0 ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select a career to analyze your skill gaps:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {analyzeCareerReadiness().careerMatches.map((career, index) => {
                        const gapData = analyzeSkillGaps(career)
                        return (
                          <motion.div
                            key={career.role}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedCareerForRecs?.role === career.role
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedCareerForRecs(career)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{career.role}</h4>
                              <span className="text-lg font-bold text-purple-600">{career.match}%</span>
                            </div>

                            <div className="mb-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500">Readiness</span>
                                <span className={`font-medium ${
                                  gapData?.readinessScore >= 70 ? 'text-green-600' :
                                  gapData?.readinessScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {gapData?.readinessScore || 0}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    gapData?.readinessScore >= 70 ? 'bg-green-500' :
                                    gapData?.readinessScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${gapData?.readinessScore || 0}%` }}
                                ></div>
                              </div>
                            </div>

                            <p className="text-xs text-gray-500">
                              {gapData?.totalGaps || 0} skill gap{(gapData?.totalGaps || 0) !== 1 ? 's' : ''} to fill
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {selectedCareerForRecs && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      {(() => {
                        const gapAnalysis = analyzeSkillGaps(selectedCareerForRecs)

                        if (!gapAnalysis) return null

                        return (
                          <>
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{gapAnalysis.careerName}</h3>
                                <p className="text-sm text-gray-500">Match: {gapAnalysis.careerMatch}% • Readiness: {gapAnalysis.readinessScore}%</p>
                              </div>
                              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                gapAnalysis.readinessScore >= 70 ? 'bg-green-100 text-green-600' :
                                gapAnalysis.readinessScore >= 40 ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'
                              }`}>
                                {gapAnalysis.readinessScore >= 70 ? 'Career Ready!' :
                                  gapAnalysis.readinessScore >= 40 ? 'Making Progress' :
                                    'Needs Work'}
                              </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Overall Progress</span>
                                <span className="text-sm font-medium text-gray-900">
                                  {gapAnalysis.masteredCount}/{gapAnalysis.totalSkills} skills mastered
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                                  style={{ width: `${gapAnalysis.readinessScore}%` }}
                                ></div>
                              </div>
                            </div>

                            {gapAnalysis.skillGaps.length > 0 ? (
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <FiAlertCircle className="text-red-500" />
                                  Skills to Develop ({gapAnalysis.skillGaps.length})
                                </h4>
                                <div className="space-y-4">
                                  {gapAnalysis.skillGaps.map((skill, idx) => (
                                    <motion.div
                                      key={skill.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="bg-white rounded-lg p-4 border-l-4 border-l-red-500 cursor-pointer hover:shadow-md"
                                      onClick={() => {
                                        setSelectedGapSkill(skill)
                                        setShowGapDetails(true)
                                      }}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div>
                                          <span className="font-medium text-gray-900">{skill.name}</span>
                                          <span className="text-xs text-gray-500 ml-2">
                                            {skill.status === 'missing' ? 'Not started' : 'In progress'}
                                          </span>
                                        </div>
                                        <span className="text-sm font-medium text-purple-600">
                                          Need: 70%
                                        </span>
                                      </div>

                                      <div className="mb-2">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                          <span className="text-gray-500">Current: {skill.current}%</span>
                                          <span className="text-red-500">Gap: {skill.gap}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                            style={{ width: `${skill.current}%` }}
                                          ></div>
                                        </div>
                                      </div>

                                      <p className="text-xs text-gray-400">
                                        Importance: {skill.importance >= 90 ? 'Critical' :
                                          skill.importance >= 75 ? 'High' : 'Medium'}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-green-50 rounded-xl p-6 text-center mb-6">
                                <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                <p className="text-green-700 font-medium">You have all required skills!</p>
                                <p className="text-sm text-green-600">You're ready for this career path.</p>
                              </div>
                            )}

                            {gapAnalysis.recommendedActivities.length > 0 && (
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <FiTrendingUp className="text-purple-600" />
                                    Recommended Activities ({gapAnalysis.recommendedActivities.length})
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setRecommendationView('grid')}
                                      className={`p-2 rounded-lg border transition-all ${
                                        recommendationView === 'grid'
                                          ? 'bg-purple-100 text-purple-600 border-purple-200'
                                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                                      }`}
                                      title="Grid view"
                                    >
                                      <FiGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => setRecommendationView('list')}
                                      className={`p-2 rounded-lg border transition-all ${
                                        recommendationView === 'list'
                                          ? 'bg-purple-100 text-purple-600 border-purple-200'
                                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                                      }`}
                                      title="List view"
                                    >
                                      <FiList className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <div className={recommendationView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                                  {gapAnalysis.recommendedActivities.map((activity, idx) => (
                                    <motion.div
                                      key={activity.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.03 }}
                                      className={`bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border ${
                                        activity.gapFilled ? 'border-green-300 bg-green-50' : 'border-gray-200'
                                      } ${recommendationView === 'list' ? 'flex items-start gap-4' : ''}`}
                                      onClick={() => {
                                        setSelectedEvent(activity)
                                        setShowEventDetailsModal(true)
                                      }}
                                    >
                                      <div className={`flex items-start gap-3 ${recommendationView === 'grid' ? 'mb-3' : 'w-72 flex-shrink-0'}`}>
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center text-white`}>
                                          {activity.icon}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-semibold text-gray-900 line-clamp-1">{activity.name}</h5>
                                          <p className="text-xs text-gray-500">{activity.category}</p>
                                        </div>
                                        {activity.gapFilled && (
                                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                            ✓ Fills gap
                                          </span>
                                        )}
                                      </div>

                                      <div className={`mb-2 ${recommendationView === 'list' ? 'flex-1' : ''}`}>
                                        <div className="flex items-center justify-between text-xs mb-1">
                                          <span className="text-gray-600">Fills: {activity.skillCovered}</span>
                                          <span className="font-medium text-purple-600">+{activity.relevanceScore}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                          <div
                                            className={`h-1.5 rounded-full ${
                                              activity.gapFilled ? 'bg-green-500' : 'bg-blue-500'
                                            }`}
                                            style={{ width: `${activity.gainAfter}%` }}
                                          ></div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs mt-1">
                                          <span className="text-gray-500">Current: {activity.currentLevel}%</span>
                                          <span className={activity.gapFilled ? 'text-green-600' : 'text-blue-600'}>
                                            After: {activity.gainAfter}%
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs mt-2">
                                          <span className="text-gray-500">{activity.date}</span>
                                          <span className="text-purple-600">{activity.price}</span>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )
                      })()}
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiStar className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recommendations Yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Register for activities to get personalized recommendations based on your skills.
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                  >
                    Browse Activities
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showGapDetails && selectedGapSkill && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowGapDetails(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl max-w-md w-full p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Skill Gap Details</h3>
                      <button
                        onClick={() => setShowGapDetails(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Skill</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedGapSkill.name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Current Level</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                              style={{ width: `${selectedGapSkill.current}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{selectedGapSkill.current}%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Required Level</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">70%</span>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-red-700 font-medium">Gap to fill: {selectedGapSkill.gap}%</p>
                        <p className="text-xs text-red-600 mt-1">
                          You need {Math.ceil(selectedGapSkill.gap / 20)} more activit{Math.ceil(selectedGapSkill.gap / 20) > 1 ? 'ies' : 'y'} to master this skill
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setShowGapDetails(false)
                            setSearchTerm(selectedGapSkill.name)
                            setActiveTab('catalog')
                          }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                        >
                          Find Activities for {selectedGapSkill.name}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'clubs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FiUsers className="text-purple-600" />
                    University Clubs
                  </h2>
                  <p className="text-gray-500 text-sm">Join clubs and connect with like-minded students</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                    {clubs.length} Active Clubs
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club, index) => (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => handleViewClubDetails(club)}
                  >
                    <div className={`bg-gradient-to-r ${club.color} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <span className="text-4xl">{club.image}</span>
                        {club.isMember && (
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                            Member
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mt-2">{club.name}</h3>
                      <p className="text-white/80 text-xs mt-1">{club.category}</p>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{club.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <FiUsers className="w-4 h-4" />
                          <span>{club.memberCount} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{club.events?.length || 0} events</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewClubDetails(club)
                          }}
                          className="flex-1 px-3 py-2 border border-purple-200 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            club.isMember ? handleLeaveClub(club.id) : handleJoinClub(club.id)
                          }}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                            club.isMember
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'
                          }`}
                        >
                          {club.isMember ? 'Leave' : 'Join'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {myClubs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiHeart className="text-pink-500" />
                  My Clubs ({myClubs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myClubs.map((club, index) => (
                    <motion.div
                      key={club.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl cursor-pointer hover:shadow-md"
                      onClick={() => handleViewClubDetails(club)}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${club.color} flex items-center justify-center text-2xl text-white`}>
                        {club.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{club.name}</h4>
                        <p className="text-xs text-gray-500">{club.memberCount} members</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Member
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab !== 'catalog' && activeTab !== 'profile' && activeTab !== 'participation' && activeTab !== 'recommendations' && activeTab !== 'clubs' && myRegistrations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'skills' && <FiAward className="w-8 h-8 text-purple-600" />}
              {activeTab === 'career' && <FiCompass className="w-8 h-8 text-purple-600" />}
              {activeTab === 'recommendations' && <FiStar className="w-8 h-8 text-purple-600" />}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No data yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">Register for activities to see your {activeTab} analysis.</p>
            <button onClick={() => setActiveTab('catalog')} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium">Browse Activities</button>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                      {studentProfile.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{studentProfile.name}</h2>
                      <p className="text-sm text-gray-600">{studentProfile.headline}</p>
                      <p className="text-xs text-gray-500 mt-1">{studentProfile.department} • {studentProfile.year}</p>
                      <p className="text-xs text-gray-500">{studentProfile.email} • {studentProfile.location}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl px-4 py-3 border border-purple-100">
                    <p className="text-xs text-gray-500">Profile Completion</p>
                    <p className="text-xl font-bold text-purple-600">{studentProfile.profileCompletion}%</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">{studentProfile.campusRank}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-5 leading-relaxed">{studentProfile.bio}</p>

                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  <div className="rounded-xl bg-purple-50 p-3">
                    <p className="text-xs text-gray-500">Activities Joined</p>
                    <p className="text-xl font-bold text-purple-600">{stats.myRegistrations}</p>
                  </div>
                  <div className="rounded-xl bg-pink-50 p-3">
                    <p className="text-xs text-gray-500">Certificates Earned</p>
                    <p className="text-xl font-bold text-pink-600">{certificatesEarned}</p>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-3">
                    <p className="text-xs text-gray-500">Participation Hours</p>
                    <p className="text-xl font-bold text-purple-600">{totalParticipationHours}h</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FiTarget className="text-purple-600" /> Current Goals
                    </h3>
                    <div className="space-y-2">
                      {studentProfile.goals.map((goal) => (
                        <p key={goal} className="text-xs text-gray-600">• {goal}</p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FiAward className="text-pink-600" /> Core Strengths
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {studentProfile.strengths.map((strength) => (
                        <span key={strength} className="text-xs bg-white border border-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Achievements</h3>
                  <div className="space-y-1.5">
                    {studentProfile.achievements.map((achievement) => (
                      <p key={achievement} className="text-sm text-gray-700">{achievement}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FiBell className="text-purple-600" />
                    Notifications
                  </h2>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
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
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={closeEventDetailsModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${selectedEvent.color} p-6 text-white`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">{selectedEvent.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                      <p className="text-white/90 text-sm mt-1">{selectedEvent.category} • {selectedEvent.organizer}</p>
                    </div>
                  </div>
                  <button onClick={closeEventDetailsModal} className="text-white/90 hover:text-white text-sm font-medium">Close</button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700">{selectedEvent.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.date}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.time}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.location}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-semibold text-purple-600">{selectedEvent.price}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills You'll Gain:</h4>
                  <div className="flex flex-wrap gap-2">
                    {careerData.activitySkills[selectedEvent.name]?.map((skill, i) => (
                      <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{skill.name} (+{skill.level}%)</span>
                    ))}
                  </div>
                </div>

                {(selectedEvent.speakers || selectedEvent.artists) && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedEvent.speakers || selectedEvent.artists || []).map((item) => (
                        <span key={item} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={closeEventDetailsModal} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">Close</button>
                  <button
                    onClick={() => {
                      if (selectedEvent.registered) {
                        handleUnregister(selectedEvent.id)
                        closeEventDetailsModal()
                      } else {
                        closeEventDetailsModal()
                        openRegistrationForm(selectedEvent)
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedEvent.registered ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'}`}
                  >
                    {selectedEvent.registered ? 'Unregister' : 'Register Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRegistrationForm && eventToRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeRegistrationForm}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Complete Registration</h3>
                    <p className="text-purple-100 text-sm mt-1">{eventToRegister.name}</p>
                  </div>
                  <button onClick={closeRegistrationForm} className="text-white/80 hover:text-white">
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Event Details</p>
                      <p className="font-semibold text-gray-900">{eventToRegister.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {eventToRegister.date} • {eventToRegister.time} • {eventToRegister.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-xl font-bold text-purple-600">{eventToRegister.price}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={registrationData.fullName}
                    onChange={handleRegistrationInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      formErrors.fullName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationInputChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={registrationData.phone}
                    onChange={handleRegistrationInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      College <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={registrationData.college}
                      onChange={handleRegistrationInputChange}
                      placeholder="College name"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        formErrors.college ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {formErrors.college && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.college}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="year"
                      value={registrationData.year}
                      onChange={handleRegistrationInputChange}
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        formErrors.year ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                    {formErrors.year && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.year}</p>
                    )}
                  </div>
                </div>

                {eventToRegister.price !== 'Free' && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-yellow-700 flex items-center gap-1">
                        <FiAlertCircle className="w-4 h-4" />
                        This is a paid event. Please enter your payment details.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment ID / Transaction ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="paymentId"
                        value={registrationData.paymentId}
                        onChange={handleRegistrationInputChange}
                        placeholder="Enter payment/transaction ID"
                        className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                          formErrors.paymentId ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {formErrors.paymentId && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.paymentId}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Example: PAY12345678 or UPI transaction ID
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={registrationData.agreeTerms}
                      onChange={handleRegistrationInputChange}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">
                      I confirm that the information provided is correct and I agree to the event terms and conditions.
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  {formErrors.agreeTerms && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.agreeTerms}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeRegistrationForm}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRegistration}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Registration'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuggestEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeSuggestEventModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Suggest an Event</h3>
                    <p className="text-purple-100 text-sm mt-1">Send to admin for approval</p>
                  </div>
                  <button onClick={closeSuggestEventModal} className="text-white/80 hover:text-white">
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={suggestEventData.name}
                    onChange={handleSuggestEventChange}
                    placeholder="Enter event name"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      suggestEventErrors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {suggestEventErrors.name && (
                    <p className="text-xs text-red-500 mt-1">{suggestEventErrors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={suggestEventData.category}
                      onChange={handleSuggestEventChange}
                      placeholder="e.g. Technology"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        suggestEventErrors.category ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {suggestEventErrors.category && (
                      <p className="text-xs text-red-500 mt-1">{suggestEventErrors.category}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={suggestEventData.date}
                      onChange={handleSuggestEventChange}
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        suggestEventErrors.date ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {suggestEventErrors.date && (
                      <p className="text-xs text-red-500 mt-1">{suggestEventErrors.date}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="capacity"
                      value={suggestEventData.capacity}
                      onChange={handleSuggestEventChange}
                      placeholder="e.g. 200"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        suggestEventErrors.capacity ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {suggestEventErrors.capacity && (
                      <p className="text-xs text-red-500 mt-1">{suggestEventErrors.capacity}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={suggestEventData.price}
                      onChange={handleSuggestEventChange}
                      placeholder="e.g. Free or ₹499"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        suggestEventErrors.price ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {suggestEventErrors.price && (
                      <p className="text-xs text-red-500 mt-1">{suggestEventErrors.price}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={suggestEventData.description}
                    onChange={handleSuggestEventChange}
                    placeholder="Describe the event"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      suggestEventErrors.description ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {suggestEventErrors.description && (
                    <p className="text-xs text-red-500 mt-1">{suggestEventErrors.description}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={closeSuggestEventModal}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSuggestEvent(suggestEventData)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Submit Suggestion
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClubDetails && selectedClub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowClubDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${selectedClub.color} p-6 text-white sticky top-0`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{selectedClub.image}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedClub.name}</h3>
                      <p className="text-white/80 text-sm mt-1">{selectedClub.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowClubDetails(false)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-700">{selectedClub.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Members</p>
                    <p className="text-xl font-bold text-gray-900">{selectedClub.memberCount}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Events</p>
                    <p className="text-xl font-bold text-gray-900">{selectedClub.events?.length || 0}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Club Events</h4>
                  <div className="space-y-2">
                    {allEvents
                      .filter(event => selectedClub.events?.includes(event.id))
                      .map(event => (
                        <div key={event.id} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${event.color} flex items-center justify-center text-white text-xs`}>
                            {event.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.name}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowClubDetails(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      if (selectedClub.isMember) {
                        handleLeaveClub(selectedClub.id)
                      } else {
                        handleJoinClub(selectedClub.id)
                      }
                      setShowClubDetails(false)
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                      selectedClub.isMember
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md'
                    }`}
                  >
                    {selectedClub.isMember ? 'Leave Club' : 'Join Club'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCareerDetails && selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCareerDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{selectedCareer.role}</h3>
                  <button onClick={() => setShowCareerDetails(false)} className="text-white/80 hover:text-white">✕</button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Match Score</p>
                    <p className="text-3xl font-bold text-purple-600">{selectedCareer.match}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Demand</p>
                    <p className="font-medium">{selectedCareer.demand}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.matchingSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">✓ {skill}</span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      setShowCareerDetails(false)
                      setActiveTab('catalog')
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium"
                  >
                    Find Activities
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

export default StudentDashboard
