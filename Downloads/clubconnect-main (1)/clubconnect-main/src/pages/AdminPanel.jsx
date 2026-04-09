import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiUsers, 
  FiCalendar, 
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
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiDownload,
  FiFileText,
  FiUpload,
  FiBarChart2,
  FiPieChart,
  FiDollarSign,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiMessageSquare,
  FiFlag,
  FiShield,
  FiCheckSquare,
  FiSquare,
  FiMoreVertical,
  FiRefreshCw,
  FiSave,
  FiX
} from 'react-icons/fi'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts'
import { useAuth } from '../hooks/useAuth'
import { useUsers } from '../hooks/useUsers'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const { users: backendUsers, loading: usersLoading } = useUsers()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)
  const [bulkActionType, setBulkActionType] = useState('')
  const [currentItem, setCurrentItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef(null)
  const [dateRange, setDateRange] = useState('month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')
  const [showExportModal, setShowExportModal] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', read: false, time: '5 min ago' },
    { id: 2, message: 'Event approval pending', read: false, time: '1 hour ago' },
    { id: 3, message: 'System update completed', read: true, time: '1 day ago' }
  ])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const [users, setUsers] = useState([])

  useEffect(() => {
    const normalizedUsers = (Array.isArray(backendUsers) ? backendUsers : []).map((item) => ({
      ...item,
      id: item.id || item._id,
      fullName: item.fullName || item.name || '',
      role: item.role || item.userType || 'student'
    }))
    setUsers(normalizedUsers)
  }, [backendUsers])

  const userEventHistory = {
    1: [
      {
        id: 'u1e1',
        eventName: 'KL University Tech Fest 2024',
        category: 'Technology',
        date: '2024-03-15',
        action: 'Participated',
        role: 'Participant',
        hours: 6,
        certificate: true,
        status: 'Completed'
      },
      {
        id: 'u1e2',
        eventName: 'AI & Robotics Hackathon',
        category: 'Technology',
        date: '2024-03-18',
        action: 'Participated',
        role: 'Team Member',
        hours: 12,
        certificate: true,
        status: 'Completed'
      },
      {
        id: 'u1e3',
        eventName: 'Google Cloud Summit',
        category: 'Technology',
        date: '2024-04-05',
        action: 'Registered',
        role: 'Attendee',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      },
      {
        id: 'u1e4',
        eventName: 'Startup India Pitch Fest',
        category: 'Business',
        date: '2024-05-02',
        action: 'Registered',
        role: 'Presenter',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      }
    ],
    2: [
      {
        id: 'u2e1',
        eventName: 'Startup India Pitch Fest',
        category: 'Business',
        date: '2024-05-02',
        action: 'Participated',
        role: 'Pitch Presenter',
        hours: 5,
        certificate: true,
        status: 'Completed'
      },
      {
        id: 'u2e2',
        eventName: 'Young Entrepreneurs Summit',
        category: 'Business',
        date: '2024-05-20',
        action: 'Registered',
        role: 'Delegate',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      },
      {
        id: 'u2e3',
        eventName: 'Investment Banking Workshop',
        category: 'Business',
        date: '2024-06-05',
        action: 'Registered',
        role: 'Attendee',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      }
    ],
    3: [
      {
        id: 'u3e1',
        eventName: 'Classical Music Concert',
        category: 'Music',
        date: '2024-04-12',
        action: 'Participated',
        role: 'Volunteer',
        hours: 4,
        certificate: false,
        status: 'Completed'
      }
    ],
    4: [
      {
        id: 'u4e1',
        eventName: 'BGMI Pro League',
        category: 'Gaming',
        date: '2024-05-25',
        action: 'Participated',
        role: 'Player',
        hours: 9,
        certificate: true,
        status: 'Completed'
      },
      {
        id: 'u4e2',
        eventName: 'Valorant Campus Clash',
        category: 'Gaming',
        date: '2024-06-15',
        action: 'Registered',
        role: 'Team Captain',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      }
    ],
    5: [
      {
        id: 'u5e1',
        eventName: 'Jaipur Literature Festival',
        category: 'Literary',
        date: '2024-06-20',
        action: 'Registered',
        role: 'Participant',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      },
      {
        id: 'u5e2',
        eventName: 'Bollywood Music Night',
        category: 'Music',
        date: '2024-03-25',
        action: 'Participated',
        role: 'Audience',
        hours: 3,
        certificate: false,
        status: 'Completed'
      }
    ],
    6: [
      {
        id: 'u6e1',
        eventName: 'Inter-KL University Sports Meet',
        category: 'Sports',
        date: '2024-04-20',
        action: 'Registered',
        role: 'Athlete',
        hours: 0,
        certificate: false,
        status: 'Upcoming'
      }
    ],
    7: []
  }

  const getUserEventHistory = (userId) => {
    const records = userEventHistory[userId] || []
    return [...records].sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Mock Data - Events
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'KL University Tech Fest 2024',
      category: 'Technology',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Guntur',
      registrations: 3456,
      capacity: 5000,
      status: 'upcoming',
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format',
      organizer: 'KL University',
      description: 'Asia\'s largest science and technology festival featuring workshops, competitions, and exhibitions.',
      contact: 'events@kluniversity.ac.in'
    },
    {
      id: 2,
      name: 'Sunburn Music Festival',
      category: 'Music',
      date: '2024-04-05',
      time: '4:00 PM',
      location: 'Guntur',
      registrations: 18765,
      capacity: 25000,
      status: 'upcoming',
      price: '₹2,499',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
      organizer: 'Sunburn',
      description: 'Asia\'s biggest electronic music festival.',
      contact: 'sunburn@kluniversity.ac.in'
    },
    {
      id: 3,
      name: 'AI & Robotics Hackathon',
      category: 'Technology',
      date: '2024-03-18',
      time: '9:00 AM',
      location: 'Guntur',
      registrations: 156,
      capacity: 200,
      status: 'ongoing',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format',
      organizer: 'Microsoft Research',
      description: '48-hour hackathon focused on AI and robotics.',
      contact: 'hackathon@kluniversity.ac.in'
    }
  ])

  // Mock Data - Communities
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'AI & ML Enthusiasts',
      category: 'Technology',
      members: 12500,
      events: 45,
      status: 'active',
      lead: 'Dr. Priya Sharma',
      created: '2023-01-15',
      description: 'Community for AI and machine learning enthusiasts.',
      contact: 'aiml@kluniversity.ac.in'
    },
    {
      id: 2,
      name: 'Bollywood Music Lovers',
      category: 'Music',
      members: 34200,
      events: 56,
      status: 'active',
      lead: 'Amit Kumar',
      created: '2022-11-20',
      description: 'Community for Bollywood music lovers.',
      contact: 'music@kluniversity.ac.in'
    },
    {
      id: 3,
      name: 'Indian Photography Network',
      category: 'Arts',
      members: 45300,
      events: 89,
      status: 'active',
      lead: 'Rathika Ramasamy',
      created: '2022-08-10',
      description: 'Community for photographers across India.',
      contact: 'photo@kluniversity.ac.in'
    }
  ])

  // Mock Data - Reports
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'user',
      reportedBy: 'Priya Sharma',
      reportedItem: 'Event: Sunburn Festival',
      reason: 'Inappropriate Content',
      status: 'pending',
      date: '2024-03-10',
      details: 'User reported inappropriate comments in event discussion.'
    },
    {
      id: 2,
      type: 'community',
      reportedBy: 'Rahul Verma',
      reportedItem: 'Community: Crypto Traders',
      reason: 'Spam',
      status: 'pending',
      date: '2024-03-09',
      details: 'Community posting spam messages.'
    },
    {
      id: 3,
      type: 'event',
      reportedBy: 'Anjali Krishnan',
      reportedItem: 'Event: Startup Pitch Fest',
      reason: 'Misleading Information',
      status: 'resolved',
      date: '2024-03-08',
      details: 'Event details were misleading about speakers.'
    }
  ])

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '',
    userType: 'student',
    status: 'active',
    phone: '',
    bio: '',
    category: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    organizer: '',
    contact: '',
    lead: '',
    event: '',
    venue: '',
    registered: ''
  })

  const recentActivities = [
    { id: 1, user: 'Priya Sharma', action: 'registered for', target: 'KL University Tech Fest 2024', time: '5 min ago' },
    { id: 2, user: 'Rahul Verma', action: 'created community', target: 'Web Developers India', time: '1 hour ago' },
    { id: 3, user: 'Anjali Krishnan', action: 'reported event', target: 'Sunburn Festival', time: '3 hours ago' },
    { id: 4, user: 'Vikram Reddy', action: 'joined', target: 'AI & ML Enthusiasts', time: '5 hours ago' }
  ]

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      name: 'Web Developers India',
      type: 'community',
      submittedDate: '2024-03-12',
      summary: 'New community request with 50 founding members',
      requestedBy: 'Rahul Verma'
    },
    {
      id: 2,
      name: 'Startup Pitch Fest',
      type: 'event',
      submittedDate: '2024-03-11',
      summary: 'Event approval request with 200 registrations',
      requestedBy: 'KL University Entrepreneurship Cell'
    },
    {
      id: 3,
      name: 'Design Sprint Workshop',
      type: 'event',
      submittedDate: '2024-03-09',
      summary: 'New workshop proposal for design students',
      requestedBy: 'KL University Design Club'
    }
  ])

  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: 'Coding Club',
      description: 'Learn, code, innovate - Join the coding revolution',
      longDescription: 'The Coding Club is a community of passionate programmers...',
      category: 'Technical',
      established: '2015',
      memberCount: 250,
      advisor: 'Dr. Ramesh Kumar',
      email: 'codingclub@kluniversity.in',
      social: {
        instagram: '@codingclub_kl',
        github: 'codingclub-kl'
      },
      image: '💻',
      color: 'from-blue-500 to-purple-500',
      status: 'active',
      createdBy: 'student123',
      createdAt: '2024-01-15',
      members: [
        { id: 101, name: 'Priya Sharma', role: 'President', joinedDate: '2024-01-20' },
        { id: 102, name: 'Rahul Kumar', role: 'Member', joinedDate: '2024-02-01' }
      ],
      events: [1, 2],
      pendingRequests: []
    },
    {
      id: 2,
      name: 'Music Club',
      description: 'Explore your musical talents',
      category: 'Cultural',
      memberCount: 180,
      advisor: 'Dr. Suman Rao',
      email: 'musicclub@kluniversity.in',
      image: '🎵',
      color: 'from-pink-500 to-red-500',
      status: 'active',
      members: [],
      events: [4, 5]
    }
  ])

  const [clubRequests, setClubRequests] = useState([
    {
      id: 101,
      clubName: 'Robotics Club',
      description: 'A club for robotics and automation enthusiasts',
      category: 'Technical',
      proposedBy: 'Amit Patel',
      studentId: 'STU001',
      email: 'amit.p@kluniversity.in',
      department: 'CSE',
      year: '3rd Year',
      proposedDate: '2024-03-10',
      reason: 'To promote robotics education and participate in national competitions',
      expectedMembers: 50,
      facultyAdvisor: 'Dr. Venkatesh',
      documents: ['proposal.pdf', 'budget.xlsx'],
      status: 'pending',
      priority: 'high',
      comments: []
    },
    {
      id: 102,
      clubName: 'Photography Club',
      description: 'Capture moments, create memories',
      category: 'Arts',
      proposedBy: 'Neha Singh',
      studentId: 'STU002',
      email: 'neha.s@kluniversity.in',
      department: 'ECE',
      year: '2nd Year',
      proposedDate: '2024-03-12',
      reason: 'Build a community of photography enthusiasts',
      expectedMembers: 30,
      facultyAdvisor: 'Prof. Sharma',
      documents: ['proposal.pdf'],
      status: 'pending',
      priority: 'medium',
      comments: []
    }
  ])

  // Dashboard Stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalCommunities: communities.length,
    totalRegistrations: events.reduce((acc, e) => acc + e.registrations, 0),
    pendingApprovals: pendingApprovals.length,
    pendingReports: reports.filter(r => r.status === 'pending').length
  }

  const monthlyUserBuckets = {}
  ;[...users]
    .filter(userItem => userItem.joined)
    .sort((firstUser, secondUser) => new Date(firstUser.joined) - new Date(secondUser.joined))
    .forEach((userItem) => {
      const joinedDate = new Date(userItem.joined)
      const monthKey = `${joinedDate.getFullYear()}-${String(joinedDate.getMonth() + 1).padStart(2, '0')}`

      if (!monthlyUserBuckets[monthKey]) {
        monthlyUserBuckets[monthKey] = {
          month: joinedDate.toLocaleString('en-US', { month: 'short' }),
          newUsers: 0
        }
      }

      monthlyUserBuckets[monthKey].newUsers += 1
    })

  const userGrowthData = Object.keys(monthlyUserBuckets)
    .sort()
    .map((monthKey) => ({ ...monthlyUserBuckets[monthKey] }))

  let cumulativeUsers = 0
  userGrowthData.forEach((monthItem) => {
    cumulativeUsers += monthItem.newUsers
    monthItem.totalUsers = cumulativeUsers
  })

  const eventsByCategoryData = Object.entries(
    events.reduce((accumulator, eventItem) => {
      const category = eventItem.category || 'Other'
      accumulator[category] = (accumulator[category] || 0) + 1
      return accumulator
    }, {})
  ).map(([category, count]) => ({ category, count }))

  // Handlers
  const handleLogout = () => {
    toast.success('Logged out successfully')
    logout()
    navigate('/login', { replace: true })
  }

  const handleView = (item) => {
    setCurrentItem(item)
    setShowViewModal(true)
  }

  const handleViewDetails = (item) => {
    setSelectedRequest(item)
    setShowRequestDetails(true)
  }

  const handleEdit = (item) => {
    setCurrentItem(item)
    setFormData(item)
    setShowEditModal(true)
  }

  const handleDelete = (item) => {
    setCurrentItem(item)
    setShowDeleteModal(true)
  }

  const handleAdd = () => {
    if (activeTab === 'schedule') {
      setFormData({
        ...formData,
        event: '',
        date: '',
        time: '',
        venue: '',
        registered: '',
        capacity: ''
      })
      setShowAddModal(true)
      return
    }

    setFormData({
      name: '',
      email: '',
      college: '',
      year: '',
      userType: 'student',
      status: 'active',
      phone: '',
      bio: '',
      category: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      price: '',
      description: '',
      organizer: '',
      contact: '',
      lead: '',
      event: '',
      venue: '',
      registered: ''
    })
    setShowAddModal(true)
  }

  const validateScheduleForm = () => {
    const requiredFields = [
      { key: 'event', label: 'Event' },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'venue', label: 'Venue' },
      { key: 'capacity', label: 'Capacity' }
    ]

    const missingField = requiredFields.find(({ key }) => !formData[key]?.toString().trim())
    if (missingField) {
      toast.error(`${missingField.label} is required`)
      return false
    }

    const capacity = Number(formData.capacity)
    const registered = Number(formData.registered || 0)

    if (!Number.isFinite(capacity) || capacity <= 0) {
      toast.error('Capacity must be greater than 0')
      return false
    }

    if (!Number.isFinite(registered) || registered < 0) {
      toast.error('Registered count cannot be negative')
      return false
    }

    if (registered > capacity) {
      toast.error('Registered count cannot exceed capacity')
      return false
    }

    return true
  }

  const handleSaveAdd = () => {
    if (activeTab === 'communities') {
      const requiredFields = [
        { key: 'name', label: 'Community name' },
        { key: 'category', label: 'Category' },
        { key: 'lead', label: 'Community lead' },
        { key: 'contact', label: 'Contact' },
        { key: 'description', label: 'Description' }
      ]

      const missingField = requiredFields.find(({ key }) => !formData[key]?.toString().trim())
      if (missingField) {
        toast.error(`${missingField.label} is required`)
        return
      }
    }

    if (activeTab === 'schedule' && !validateScheduleForm()) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const newItem = {
        ...formData,
        id: Date.now(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format',
        joined: new Date().toISOString().split('T')[0],
        activities: 0
      }
      
      if (activeTab === 'users') {
        setUsers([...users, newItem])
        toast.success('User added successfully')
      } else if (activeTab === 'events') {
        setEvents([...events, { ...newItem, registrations: 0 }])
        toast.success('Event added successfully')
      } else if (activeTab === 'communities') {
        setCommunities([
          ...communities,
          {
            ...newItem,
            members: 0,
            events: 0,
            created: new Date().toISOString().split('T')[0]
          }
        ])
        toast.success('Community added successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems([
          {
            id: Date.now(),
            event: formData.event,
            date: formData.date,
            time: formData.time,
            venue: formData.venue,
            registered: Number(formData.registered) || 0,
            capacity: Number(formData.capacity) || 0
          },
          ...scheduleItems
        ])
        toast.success('Schedule item added successfully')
      }
      
      setShowAddModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleSaveEdit = () => {
    if (activeTab === 'schedule' && !validateScheduleForm()) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.map(u => u.id === currentItem.id ? { ...u, ...formData } : u))
        toast.success('User updated successfully')
      } else if (activeTab === 'events') {
        setEvents(events.map(e => e.id === currentItem.id ? { ...e, ...formData } : e))
        toast.success('Event updated successfully')
      } else if (activeTab === 'communities') {
        setCommunities(communities.map(c => c.id === currentItem.id ? { ...c, ...formData } : c))
        toast.success('Community updated successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems(
          scheduleItems.map(s =>
            s.id === currentItem.id
              ? {
                  ...s,
                  event: formData.event,
                  date: formData.date,
                  time: formData.time,
                  venue: formData.venue,
                  registered: Number(formData.registered) || 0,
                  capacity: Number(formData.capacity) || 0
                }
              : s
          )
        )
        toast.success('Schedule item updated successfully')
      }
      
      setShowEditModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleConfirmDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.filter(u => u.id !== currentItem.id))
        toast.success('User deleted successfully')
      } else if (activeTab === 'events') {
        setEvents(events.filter(e => e.id !== currentItem.id))
        toast.success('Event deleted successfully')
      } else if (activeTab === 'communities') {
        setCommunities(communities.filter(c => c.id !== currentItem.id))
        toast.success('Community deleted successfully')
      } else if (activeTab === 'schedule') {
        setScheduleItems(scheduleItems.filter(s => s.id !== currentItem.id))
        toast.success('Schedule item deleted successfully')
      }
      
      setShowDeleteModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const handleStatusChange = (item, newStatus) => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        setUsers(users.map(u => u.id === item.id ? { ...u, status: newStatus } : u))
        toast.success(`User ${newStatus === 'active' ? 'activated' : newStatus === 'inactive' ? 'deactivated' : 'blocked'} successfully`)
      } else if (activeTab === 'events') {
        setEvents(events.map(e => e.id === item.id ? { ...e, status: newStatus } : e))
        toast.success(`Event status updated to ${newStatus}`)
      } else if (activeTab === 'communities') {
        setCommunities(communities.map(c => c.id === item.id ? { ...c, status: newStatus } : c))
        toast.success(`Community status updated to ${newStatus}`)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleSendEmail = (item) => {
    toast.success(`Email sent to ${item.email}`)
  }

  const handleExport = () => {
    toast.success('Data exported successfully')
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast.success('Data refreshed')
      setIsLoading(false)
    }, 1000)
  }

  const handleApprove = (item) => {
    setPendingApprovals(prev => prev.filter(req => req.id !== item.id))
    toast.success(`${item.type === 'event' ? 'Event' : 'Community'} approved`)
  }

  const handleReject = (item) => {
    setPendingApprovals(prev => prev.filter(req => req.id !== item.id))
  }

  const handleRejectWithReason = (item) => {
    const reason = prompt(`Why are you rejecting "${item.name}"?`)
    if (reason) {
      handleReject(item)
      toast.error(`Rejected: ${reason}`)
    }
  }

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
    toast.success('Notification marked as read')
  }

  const handleMarkAllNotificationsRead = () => {
    const hasUnread = notifications.some(n => !n.read)

    if (!hasUnread) {
      toast('No unread notifications')
      return
    }

    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleResolveReport = (reportId, action) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'resolved' } : r
    ))
    toast.success(`Report ${action === 'approve' ? 'approved' : 'rejected'} and resolved`)
  }

  const handleAddToSchedule = () => {
    setFormData({
      ...formData,
      event: '',
      date: '',
      time: '',
      venue: '',
      registered: '',
      capacity: ''
    })
    setShowAddModal(true)
  }

  const handleEditScheduleItem = (item) => {
    setCurrentItem(item)
    setFormData({
      ...formData,
      event: item.event,
      date: item.date,
      time: item.time,
      venue: item.venue,
      registered: item.registered,
      capacity: item.capacity
    })
    setShowEditModal(true)
  }

  const handleDeleteScheduleItem = (item) => {
    setCurrentItem(item)
    setShowDeleteModal(true)
  }

  const handleApproveRequest = (requestId) => {
    setClubRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'approved' } : req
    ))

    const approved = clubRequests.find(r => r.id === requestId)
    if (!approved) return

    const newClub = {
      id: clubs.length + 1,
      name: approved.clubName,
      description: approved.description,
      category: approved.category,
      memberCount: 0,
      advisor: approved.facultyAdvisor,
      email: approved.email,
      image: getCategoryIcon(approved.category),
      color: 'from-purple-500 to-pink-500',
      status: 'active',
      createdBy: approved.studentId,
      createdAt: new Date().toISOString().split('T')[0],
      members: [],
      events: []
    }

    setClubs(prev => [...prev, newClub])
    toast.success(`Club "${approved.clubName}" has been approved and created!`)
  }

  const handleRejectRequest = (requestId, reason) => {
    setClubRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: 'rejected', rejectionReason: reason } : req
    ))
    toast.error('Club request rejected')
  }

  const getCategoryIcon = (category) => {
    const icons = {
      Technical: '💻',
      Cultural: '🎭',
      Sports: '⚽',
      Arts: '🎨',
      Music: '🎵'
    }
    return icons[category] || '📚'
  }

  const getActiveEntityLabel = () => {
    if (activeTab === 'users') return { singular: 'User', plural: 'Users' }
    if (activeTab === 'events') return { singular: 'Event', plural: 'Events' }
    if (activeTab === 'communities') return { singular: 'Community', plural: 'Communities' }
    if (activeTab === 'schedule') return { singular: 'Schedule Item', plural: 'Schedule Items' }
    if (activeTab === 'reports') return { singular: 'Report', plural: 'Reports' }
    return { singular: 'Item', plural: 'Items' }
  }

  // Selection Handlers
  const handleSelectAll = (items) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(item => item.id))
    }
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action) => {
    setBulkActionType(action)
    setShowBulkActionModal(true)
  }

  const handleConfirmBulkAction = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (activeTab === 'users') {
        switch(bulkActionType) {
          case 'activate':
            setUsers(users.map(u => selectedItems.includes(u.id) ? { ...u, status: 'active' } : u))
            toast.success(`${selectedItems.length} users activated`)
            break
          case 'deactivate':
            setUsers(users.map(u => selectedItems.includes(u.id) ? { ...u, status: 'inactive' } : u))
            toast.success(`${selectedItems.length} users deactivated`)
            break
          case 'delete':
            setUsers(users.filter(u => !selectedItems.includes(u.id)))
            toast.success(`${selectedItems.length} users deleted`)
            break
          default:
            break
        }
      } else if (activeTab === 'events') {
        switch(bulkActionType) {
          case 'delete':
            setEvents(events.filter(e => !selectedItems.includes(e.id)))
            toast.success(`${selectedItems.length} events deleted`)
            break
          default:
            break
        }
      } else if (activeTab === 'communities') {
        switch(bulkActionType) {
          case 'delete':
            setCommunities(communities.filter(c => !selectedItems.includes(c.id)))
            toast.success(`${selectedItems.length} communities deleted`)
            break
          default:
            break
        }
      }
      
      setSelectedItems([])
      setSelectMode(false)
      setShowBulkActionModal(false)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600'
      case 'inactive': return 'bg-gray-100 text-gray-600'
      case 'blocked': return 'bg-red-100 text-red-600'
      case 'upcoming': return 'bg-blue-100 text-blue-600'
      case 'ongoing': return 'bg-purple-100 text-purple-600'
      case 'completed': return 'bg-gray-100 text-gray-600'
      case 'pending': return 'bg-yellow-100 text-yellow-600'
      case 'resolved': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // Filtered Data
  const filteredUsers = users.filter(user => {
    const name = (user.fullName || user.name || '').toLowerCase()
    const email = (user.email || '').toLowerCase()
    const role = (user.role || user.userType || '').toLowerCase()
    const college = (user.college || '').toLowerCase()
    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
                         email.includes(searchTerm.toLowerCase()) ||
                         role.includes(searchTerm.toLowerCase()) ||
                         college.includes(searchTerm.toLowerCase())
    const status = (user.status || '').toLowerCase()
    const matchesFilter = selectedFilter === 'all' || status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || event.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.lead.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || community.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filteredApprovals = pendingApprovals.filter(item =>
    filterType === 'all' || item.type === filterType
  )

  const sortedApprovals = [...filteredApprovals].sort((a, b) =>
    new Date(b.submittedDate) - new Date(a.submittedDate)
  )

  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      event: 'Tech Fest 2024',
      date: '2024-03-15',
      time: '10:00 AM - 6:00 PM',
      venue: 'Main Auditorium',
      registered: 3456,
      capacity: 5000
    },
    {
      id: 2,
      event: 'Startup Bootcamp',
      date: '2024-03-18',
      time: '9:30 AM - 4:30 PM',
      venue: 'Innovation Lab',
      registered: 1120,
      capacity: 1500
    },
    {
      id: 3,
      event: 'Cultural Night',
      date: '2024-03-22',
      time: '6:00 PM - 10:00 PM',
      venue: 'Open Air Theatre',
      registered: 2780,
      capacity: 3000
    },
    {
      id: 4,
      event: 'AI Workshop',
      date: '2024-03-25',
      time: '11:00 AM - 2:00 PM',
      venue: 'Computer Lab 2',
      registered: 640,
      capacity: 800
    }
  ])

  const [participationData, setParticipationData] = useState({
    clubs: {
      totalMembers: 1250,
      activeClubs: 15,
      pendingRequests: 3,
      monthlyGrowth: 12,
      clubWiseParticipation: [
        { name: 'Coding Club', members: 250, events: 8, participation: 85 },
        { name: 'Music Club', members: 180, events: 6, participation: 78 },
        { name: 'Sports Club', members: 320, events: 12, participation: 92 },
        { name: 'Dance Club', members: 150, events: 5, participation: 88 }
      ]
    },
    events: {
      totalEvents: 40,
      totalRegistrations: 3450,
      completedEvents: 28,
      upcomingEvents: 12,
      avgAttendance: 76,
      eventWiseParticipation: [
        { name: 'Tech Fest 2024', registrations: 500, attended: 425, rate: 85 },
        { name: 'Music Night', registrations: 300, attended: 280, rate: 93 },
        { name: 'Sports Meet', registrations: 450, attended: 400, rate: 89 }
      ]
    },
    students: {
      totalActive: 2800,
      participated: 1850,
      participationRate: 66,
      topParticipants: [
        { name: 'Priya Sharma', activities: 12, clubs: 3, hours: 45 },
        { name: 'Rahul Kumar', activities: 10, clubs: 2, hours: 38 },
        { name: 'Neha Singh', activities: 8, clubs: 2, hours: 32 }
      ]
    }
  })

  const unreadNotificationsCount = notifications.filter(n => !n.read).length
  const filteredClubRequests = clubRequests.filter(request => {
    if (selectedDepartment === 'all') return true
    return request.department === selectedDepartment
  })

  return (
    <div className="min-h-screen bg-gray-50 text-black [&_.text-gray-900]:text-black [&_.text-gray-800]:text-black [&_.text-gray-700]:text-black [&_.text-gray-600]:text-black [&_.text-gray-500]:text-black [&_.text-gray-400]:text-black [&_.hover\\:text-gray-800:hover]:text-black [&_.hover\\:text-gray-700:hover]:text-black [&_.hover\\:text-gray-600:hover]:text-black">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="text-2xl font-black text-black">
                ClubConnect
              </Link>
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiShield className="w-3 h-3" />
                Admin
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Refresh Button */}
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
              >
                <FiRefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(prev => !prev)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Notifications"
                >
                  <FiBell className="w-5 h-5 text-gray-600" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                      {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={handleMarkAllNotificationsRead}
                        className="text-xs font-medium text-purple-600 hover:text-purple-700"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleMarkNotificationRead(notification.id)}
                          className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                            notification.read ? 'bg-white hover:bg-gray-50' : 'bg-purple-50 hover:bg-purple-100'
                          }`}
                        >
                          <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiLogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] p-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('overview')
                setSelectedItems([])
                setSelectMode(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiBarChart2 className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('users')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'users' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="font-medium">Users</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalUsers}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('events')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'events' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiCalendar className="w-5 h-5" />
              <span className="font-medium">Events</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalEvents}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('schedule')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiClock className="w-5 h-5" />
              <span className="font-medium">Schedule Management</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {scheduleItems.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('clubRequests')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'clubRequests'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="font-medium">Club Requests</span>
              {clubRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {clubRequests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('participation')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'participation'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="font-medium">Participation Tracking</span>
              <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                {participationData.students.participated}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('clubs')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'clubs'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiHeart className="w-5 h-5" />
              <span className="font-medium">Manage Clubs</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {clubs.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('communities')
                setSelectedItems([])
                setSelectMode(false)
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'communities' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiHeart className="w-5 h-5" />
              <span className="font-medium">Communities</span>
              <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {stats.totalCommunities}
              </span>
            </button>

            <div className="border-t border-gray-200 my-4 pt-4">
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'reports' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiFlag className="w-5 h-5" />
                <span className="font-medium">Reports</span>
                {stats.pendingReports > 0 && (
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    {stats.pendingReports}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiSettings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-8 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('clubRequests')}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'clubRequests' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                }`}
              >
                <FiUsers /> Club Requests
                {clubRequests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {clubRequests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('participation')}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'participation' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                }`}
              >
                <FiActivity /> Participation Tracking
              </button>
              <button
                onClick={() => setActiveTab('clubs')}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative whitespace-nowrap ${
                  activeTab === 'clubs' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                }`}
              >
                Manage Clubs
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
                <p className="text-purple-100">Here's what's happening with your platform today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Total Users</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.activeUsers} active now
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalEvents}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Total Events</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.upcomingEvents} upcoming
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiHeart className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalCommunities}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Communities</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Active groups
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</span>
                  </div>
                  <h3 className="text-gray-600 font-medium">Registrations</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Across all events
                  </p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <div className="h-64 bg-gray-50 rounded-lg p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          allowDecimals={false}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '0.75rem',
                            border: '1px solid hsl(var(--border))'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalUsers"
                          name="Total Users"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="newUsers"
                          name="New Users"
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          dot={{ r: 2, fill: 'hsl(var(--accent))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
                  <div className="h-64 bg-gray-50 rounded-lg p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={eventsByCategoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis
                          dataKey="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          allowDecimals={false}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '0.75rem',
                            border: '1px solid hsl(var(--border))'
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Pending Approvals */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <span className="font-medium text-gray-900">{activity.user}</span>
                          <span className="text-gray-600"> {activity.action} </span>
                          <span className="font-medium text-purple-600">{activity.target}</span>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                      {stats.pendingApprovals} pending
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'all' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType('event')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'event' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Events
                    </button>
                    <button
                      onClick={() => setFilterType('community')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        filterType === 'community' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Communities
                    </button>
                  </div>
                  <div className="space-y-3">
                    {sortedApprovals.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleViewDetails(item)}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 font-bold">
                            {item.type === 'event' ? 'ET' : 'NC'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.summary}</p>
                            <p className="text-xs text-gray-400 mt-1">Submitted {item.submittedDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleApprove(item)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectWithReason(item)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <FiXCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {sortedApprovals.length === 0 && (
                      <div className="text-sm text-gray-500 text-center py-6">
                        No pending approvals for this filter.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Users'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} user(s) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users by name, email, or college..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="active" className="text-gray-900">Active</option>
                    <option value="inactive" className="text-gray-900">Inactive</option>
                    <option value="blocked" className="text-gray-900">Blocked</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {selectMode && (
                          <th className="px-4 py-3 w-10">
                            <button
                              onClick={() => handleSelectAll(filteredUsers)}
                              className="text-gray-600 hover:text-purple-600"
                            >
                              {selectedItems.length === filteredUsers.length ? (
                                <FiCheckSquare className="w-5 h-5" />
                              ) : (
                                <FiSquare className="w-5 h-5" />
                              )}
                            </button>
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {usersLoading && (
                        <tr>
                          <td colSpan={selectMode ? 9 : 8} className="px-6 py-6 text-sm text-gray-500">
                            Loading users...
                          </td>
                        </tr>
                      )}
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          {selectMode && (
                            <td className="px-4 py-4">
                              <button
                                onClick={() => handleSelectItem(user.id)}
                                className="text-gray-600 hover:text-purple-600"
                              >
                                {selectedItems.includes(user.id) ? (
                                  <FiCheckSquare className="w-5 h-5 text-purple-600" />
                                ) : (
                                  <FiSquare className="w-5 h-5" />
                                )}
                              </button>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={user.avatar || 'https://via.placeholder.com/32'} alt={user.fullName || 'User'} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="font-medium text-gray-900">{user.fullName}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.college}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.year}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {(() => {
                                const history = getUserEventHistory(user.id)
                                const participated = history.filter(item => item.action === 'Participated').length
                                const registered = history.filter(item => item.action === 'Registered').length
                                const total = history.length || 1
                                return (
                                  <>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">{user.activities}</span>
                                <span className="text-xs text-gray-500">events</span>
                              </div>
                              <p className="text-xs text-gray-500">{participated} participated • {registered} registered</p>
                              <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
                                  style={{ width: `${Math.min(100, (history.length / total) * 100)}%` }}
                                ></div>
                              </div>
                              <button
                                onClick={() => handleView(user)}
                                className="text-xs text-purple-600 hover:underline text-left mt-1"
                              >
                                View Details
                              </button>
                                  </>
                                )
                              })()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleView(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="View"
                              >
                                <FiEye className="w-4 h-4 text-gray-600" />
                              </button>
                              <button 
                                onClick={() => handleEdit(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Edit"
                              >
                                <FiEdit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button 
                                onClick={() => handleSendEmail(user)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Send Email"
                              >
                                <FiMail className="w-4 h-4 text-gray-600" />
                              </button>
                              {user.status === 'active' ? (
                                <button 
                                  onClick={() => handleStatusChange(user, 'blocked')}
                                  className="p-1 hover:bg-red-100 rounded transition-colors"
                                  title="Block User"
                                >
                                  <FiUserX className="w-4 h-4 text-red-600" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleStatusChange(user, 'active')}
                                  className="p-1 hover:bg-green-100 rounded transition-colors"
                                  title="Activate User"
                                >
                                  <FiUserCheck className="w-4 h-4 text-green-600" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDelete(user)}
                                className="p-1 hover:bg-red-100 rounded transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Events'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md transition-all"
                  >
                    <FiPlus className="w-4 h-4" />
                    Create Event
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} event(s) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Selected
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events by name, category, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="upcoming" className="text-gray-900">Upcoming</option>
                    <option value="ongoing" className="text-gray-900">Ongoing</option>
                    <option value="completed" className="text-gray-900">Completed</option>
                  </select>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all relative">
                    {selectMode && (
                      <div className="absolute top-2 left-2 z-10">
                        <button
                          onClick={() => handleSelectItem(event.id)}
                          className="bg-white rounded-lg p-1 shadow-md"
                        >
                          {selectedItems.includes(event.id) ? (
                            <FiCheckSquare className="w-5 h-5 text-purple-600" />
                          ) : (
                            <FiSquare className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    )}
                    <div className="relative h-40">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{event.category}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <FiCalendar className="w-3 h-3" />
                        <span>{event.date}</span>
                        <FiMapPin className="w-3 h-3 ml-2" />
                        <span>{event.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          <span className="font-semibold text-gray-900">{event.registrations}</span>
                          <span className="text-gray-500">/{event.capacity}</span>
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleView(event)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="View"
                          >
                            <FiEye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleEdit(event)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(event)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Activity Schedules</h2>
                <button
                  onClick={handleAddToSchedule}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add to Schedule
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {scheduleItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.event}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.venue}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="font-semibold text-purple-600">{item.registered.toLocaleString()}</span>
                            /{item.capacity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditScheduleItem(item)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <FiEdit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteScheduleItem(item)}
                                className="p-1 hover:bg-red-100 rounded"
                              >
                                <FiTrash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{scheduleItems.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.min(scheduleItems.length, 3)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {scheduleItems.reduce((total, item) => total + item.capacity, 0).toLocaleString()}+
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clubRequests' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-gray-500">Pending Requests</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {clubRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {clubRequests.filter(r => r.status === 'approved').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">
                    {clubRequests.filter(r => r.status === 'rejected').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-gray-500">High Priority</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {clubRequests.filter(r => r.priority === 'high' && r.status === 'pending').length}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FiFilter className="text-gray-400" />
                    <span className="text-sm font-medium">Filter:</span>
                  </div>
                  <select className="px-3 py-2 border rounded-lg text-sm">
                    <option>All Categories</option>
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Arts</option>
                  </select>
                  <select className="px-3 py-2 border rounded-lg text-sm">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">
                    Apply Filters
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiUsers className="text-purple-600" />
                    Club Formation Requests
                  </h2>
                </div>

                <div className="divide-y">
                  {filteredClubRequests.map((request) => (
                    <div key={request.id} className="p-6 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{request.clubName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.priority === 'high' ? 'bg-red-100 text-red-600' :
                              request.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {request.priority.toUpperCase()} PRIORITY
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                              request.status === 'approved' ? 'bg-green-100 text-green-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {request.status.toUpperCase()}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-2">{request.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Proposed by:</span>
                              <p className="font-medium">{request.proposedBy}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Department:</span>
                              <p className="font-medium">{request.department}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Expected Members:</span>
                              <p className="font-medium">{request.expectedMembers}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Proposed Date:</span>
                              <p className="font-medium">{request.proposedDate}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedRequest(request)
                              setShowRequestDetails(true)
                            }}
                            className="px-4 py-2 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50"
                          >
                            View Details
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveRequest(request.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setShowRejectionModal(true)
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'participation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Participation Analytics</h2>
                <div className="flex gap-2">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="semester">This Semester</option>
                    <option value="year">This Year</option>
                  </select>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <FiDownload /> Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                  <p className="text-purple-100">Total Participants</p>
                  <p className="text-3xl font-bold">{participationData.students.participated}</p>
                  <p className="text-sm text-purple-100 mt-2">
                    {participationData.students.participationRate}% of total students
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-gray-500">Active Clubs</p>
                  <p className="text-3xl font-bold text-purple-600">{participationData.clubs.activeClubs}</p>
                  <p className="text-sm text-green-600 mt-2">↑ {participationData.clubs.monthlyGrowth}% growth</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-gray-500">Total Events</p>
                  <p className="text-2xl font-bold text-purple-600">{participationData.events.totalEvents}</p>
                  <p className="text-sm text-gray-500 mt-2">{participationData.events.completedEvents} completed</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-gray-500">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-purple-600">{participationData.events.avgAttendance}%</p>
                  <p className="text-sm text-gray-500 mt-2">across all events</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Club-wise Participation</h3>
                  <div className="space-y-4">
                    {participationData.clubs.clubWiseParticipation.map((club, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{club.name}</span>
                          <span className="font-medium">{club.participation}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                            style={{ width: `${club.participation}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{club.members} members</span>
                          <span>{club.events} events</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Event Attendance Rates</h3>
                  <div className="space-y-4">
                    {participationData.events.eventWiseParticipation.map((event, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{event.name}</span>
                          <span className="font-medium">{event.rate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                            style={{ width: `${event.rate}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{event.attended} attended</span>
                          <span>{event.registrations} registered</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Top Participants</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Student</th>
                        <th className="text-left py-3 px-4">Activities</th>
                        <th className="text-left py-3 px-4">Clubs</th>
                        <th className="text-left py-3 px-4">Hours</th>
                        <th className="text-left py-3 px-4">Achievements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participationData.students.topParticipants.map((student, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{student.name}</td>
                          <td className="py-3 px-4">{student.activities}</td>
                          <td className="py-3 px-4">{student.clubs}</td>
                          <td className="py-3 px-4">{student.hours}</td>
                          <td className="py-3 px-4">
                            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                              Top Performer
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <AnimatePresence>
                {showExportModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    onClick={() => setShowExportModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="bg-white rounded-xl p-6 max-w-md w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="text-xl font-bold mb-4">Export Participation Report</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Report Type</label>
                          <select className="w-full px-3 py-2 border rounded-lg">
                            <option>Full Participation Report</option>
                            <option>Club-wise Summary</option>
                            <option>Event-wise Summary</option>
                            <option>Student-wise Report</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Date Range</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="date" className="px-3 py-2 border rounded-lg" />
                            <input type="date" className="px-3 py-2 border rounded-lg" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Format</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="format"
                                value="csv"
                                checked={exportFormat === 'csv'}
                                onChange={(e) => setExportFormat(e.target.value)}
                              />
                              CSV
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="format"
                                value="pdf"
                                checked={exportFormat === 'pdf'}
                                onChange={(e) => setExportFormat(e.target.value)}
                              />
                              PDF
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="format"
                                value="excel"
                                checked={exportFormat === 'excel'}
                                onChange={(e) => setExportFormat(e.target.value)}
                              />
                              Excel
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => setShowExportModal(false)}
                            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              toast.success('Report exported successfully!')
                              setShowExportModal(false)
                            }}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            Export
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
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Clubs</h2>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                  {clubs.length} Clubs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.map((club) => (
                  <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`bg-gradient-to-r ${club.color} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{club.image}</span>
                          <h3 className="text-lg font-semibold">{club.name}</h3>
                        </div>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs uppercase">{club.status}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2 text-sm">
                      <p className="text-gray-600">{club.description}</p>
                      <p><span className="text-gray-500">Category:</span> <span className="font-medium">{club.category}</span></p>
                      <p><span className="text-gray-500">Advisor:</span> <span className="font-medium">{club.advisor}</span></p>
                      <p><span className="text-gray-500">Members:</span> <span className="font-medium">{club.memberCount}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === 'communities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Communities</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectMode(!selectMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      selectMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {selectMode ? 'Cancel Selection' : 'Select Communities'}
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 hover:shadow-md"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Community
                  </button>
                </div>
              </div>

              {/* Selection Bar */}
              {selectMode && selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedItems.length} community(ies) selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Delete Selected
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Search & Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search communities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900"
                  >
                    <option value="all" className="text-gray-900">All Status</option>
                    <option value="active" className="text-gray-900">Active</option>
                    <option value="inactive" className="text-gray-900">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Communities Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {selectMode && (
                        <th className="px-4 py-3 w-10">
                          <button
                            onClick={() => handleSelectAll(filteredCommunities)}
                            className="text-gray-600 hover:text-purple-600"
                          >
                            {selectedItems.length === filteredCommunities.length ? (
                              <FiCheckSquare className="w-5 h-5" />
                            ) : (
                              <FiSquare className="w-5 h-5" />
                            )}
                          </button>
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Community</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCommunities.map((community) => (
                      <tr key={community.id} className="hover:bg-gray-50">
                        {selectMode && (
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleSelectItem(community.id)}
                              className="text-gray-600 hover:text-purple-600"
                            >
                              {selectedItems.includes(community.id) ? (
                                <FiCheckSquare className="w-5 h-5 text-purple-600" />
                              ) : (
                                <FiSquare className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                        )}
                        <td className="px-6 py-4 font-medium text-gray-900">{community.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.members.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.events}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{community.lead}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(community.status)}`}>
                            {community.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleView(community)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="View"
                            >
                              <FiEye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleEdit(community)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleDelete(community)}
                              className="p-1 hover:bg-red-100 rounded"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* User Reports */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Reports</h3>
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div key={report.id} className={`p-3 rounded-lg ${
                        report.status === 'pending' ? 'bg-yellow-50' : 'bg-green-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <FiFlag className={`${
                              report.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                            } mt-1`} />
                            <div>
                              <p className="font-medium text-gray-900">{report.reason}</p>
                              <p className="text-sm text-gray-500">{report.reportedItem}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Reported by {report.reportedBy} • {report.date}
                              </p>
                            </div>
                          </div>
                          {report.status === 'pending' && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleResolveReport(report.id, 'approve')}
                                className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                title="Approve"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleResolveReport(report.id, 'reject')}
                                className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                title="Reject"
                              >
                                <FiXCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Server Status</span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Operational
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Database</span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Healthy
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">API Response Time</span>
                      <span className="text-gray-900 font-medium">124ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Sessions</span>
                      <span className="text-gray-900 font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Storage Used</span>
                      <span className="text-gray-900 font-medium">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input 
                      type="text" 
                      defaultValue="ClubConnect" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@example.com" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">Disabled</option>
                      <option className="text-gray-900">Enabled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default User Role</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">Student</option>
                      <option className="text-gray-900">Admin</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => toast.success('Settings saved successfully')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto logout after inactivity</p>
                    </div>
                    <select className="px-3 py-1 border border-gray-200 rounded-lg text-gray-900">
                      <option className="text-gray-900">30 minutes</option>
                      <option className="text-gray-900">1 hour</option>
                      <option className="text-gray-900">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showRequestDetails && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedRequest.clubName}</h2>
                    <p className="text-gray-500">Proposed by {selectedRequest.proposedBy}</p>
                  </div>
                  <button
                    onClick={() => setShowRequestDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Student ID</p>
                      <p className="font-medium">{selectedRequest.studentId}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="font-medium">{selectedRequest.department}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="font-medium">{selectedRequest.year}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{selectedRequest.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Reason for Establishment</h3>
                    <p className="text-gray-600">{selectedRequest.reason}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <div className="space-y-2">
                      {selectedRequest.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <FiFileText className="text-gray-400" />
                          <span className="text-sm">{doc}</span>
                          <button className="ml-auto text-purple-600 hover:text-purple-700">
                            <FiDownload />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Comments/Feedback</h3>
                    <textarea
                      placeholder="Add your comments here..."
                      className="w-full px-3 py-2 border rounded-lg"
                      rows="3"
                    ></textarea>
                  </div>

                  {selectedRequest.status === 'pending' && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          handleApproveRequest(selectedRequest.id)
                          setShowRequestDetails(false)
                        }}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve Request
                      </button>
                      <button
                        onClick={() => {
                          setShowRequestDetails(false)
                          setShowRejectionModal(true)
                        }}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRejectionModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRejectionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Reject Club Request</h3>

              <p className="text-gray-600 mb-4">
                Please provide a reason for rejecting "{selectedRequest.clubName}"
              </p>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full px-3 py-2 border rounded-lg mb-4"
                rows="4"
              ></textarea>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectionModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleRejectRequest(selectedRequest.id, rejectionReason)
                    setShowRejectionModal(false)
                    setRejectionReason('')
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">View Details</h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {activeTab === 'users' && (
                  <div className="space-y-4">
                    {(() => {
                      const userHistory = getUserEventHistory(currentItem.id)
                      const participatedCount = userHistory.filter(item => item.action === 'Participated').length
                      const registeredCount = userHistory.filter(item => item.action === 'Registered').length
                      const participatedEvents = userHistory.filter(item => item.action === 'Participated')
                      const registeredEvents = userHistory.filter(item => item.action === 'Registered')
                      const totalHours = userHistory.reduce((sum, item) => sum + (item.hours || 0), 0)
                      const certificates = userHistory.filter(item => item.certificate).length

                      return (
                        <>
                    <div className="flex items-center gap-4">
                      <img src={currentItem.avatar} alt={currentItem.name} className="w-20 h-20 rounded-full object-cover" />
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                        <p className="text-gray-500">{currentItem.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium text-gray-900">{currentItem.college}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium text-gray-900">{currentItem.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{currentItem.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="font-medium text-gray-900">{currentItem.joined}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-700">{currentItem.bio}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Total Events</p>
                        <p className="text-lg font-bold text-purple-600">{userHistory.length}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Registered</p>
                        <p className="text-lg font-bold text-blue-600">{registeredCount}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Participated</p>
                        <p className="text-lg font-bold text-green-600">{participatedCount}</p>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Certificates</p>
                        <p className="text-lg font-bold text-pink-600">{certificates}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-gray-900">Event Participation History</h5>
                        <span className="text-xs text-gray-500">{totalHours}h contribution</span>
                      </div>

                      {userHistory.length > 0 ? (
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                          {userHistory.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 rounded-lg p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{item.eventName}</p>
                                  <p className="text-xs text-gray-500 mt-1">{item.category} • {item.date} • {item.role}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${item.action === 'Participated' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {item.action}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Completed' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    {item.status}
                                  </span>
                                  {item.certificate && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-600">Certificate</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No event registrations or participation records available.</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h5 className="text-sm font-semibold text-blue-700 mb-2">Registered Events ({registeredEvents.length})</h5>
                        {registeredEvents.length > 0 ? (
                          <div className="space-y-2">
                            {registeredEvents.map((item) => (
                              <div key={item.id} className="bg-white border border-blue-100 rounded-lg p-2">
                                <p className="text-sm font-medium text-gray-900">{item.eventName}</p>
                                <p className="text-xs text-gray-500">{item.date} • {item.role}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">No registered events.</p>
                        )}
                      </div>

                      <div className="bg-green-50 rounded-xl p-4">
                        <h5 className="text-sm font-semibold text-green-700 mb-2">Participated Events ({participatedEvents.length})</h5>
                        {participatedEvents.length > 0 ? (
                          <div className="space-y-2">
                            {participatedEvents.map((item) => (
                              <div key={item.id} className="bg-white border border-green-100 rounded-lg p-2">
                                <p className="text-sm font-medium text-gray-900">{item.eventName}</p>
                                <p className="text-xs text-gray-500">{item.date} • {item.hours}h • {item.role}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">No participated events.</p>
                        )}
                      </div>
                    </div>
                        </>
                      )
                    })()}
                  </div>
                )}

                {activeTab === 'events' && (
                  <div className="space-y-4">
                    <img src={currentItem.image} alt={currentItem.name} className="w-full h-48 object-cover rounded-lg" />
                    <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{currentItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">{currentItem.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-900">{currentItem.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{currentItem.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Organizer</p>
                        <p className="font-medium text-gray-900">{currentItem.organizer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium text-gray-900">{currentItem.price}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700">{currentItem.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'communities' && (
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900">{currentItem.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{currentItem.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">{currentItem.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Community Lead</p>
                        <p className="font-medium text-gray-900">{currentItem.lead}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium text-gray-900">{currentItem.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="font-medium text-gray-900">{currentItem.members?.toLocaleString?.() ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Events</p>
                        <p className="font-medium text-gray-900">{currentItem.events ?? 0}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{currentItem.created || '—'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="text-gray-700">{currentItem.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false)
              setShowEditModal(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {showAddModal
                      ? `Add New ${getActiveEntityLabel().singular}`
                      : `Edit ${getActiveEntityLabel().singular}`}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {activeTab === 'users' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                          <input
                            type="text"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter college"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter year"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter bio"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'events' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter category"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter price"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter description"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'communities' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter community name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter category"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Community Lead</label>
                          <input
                            type="text"
                            value={formData.lead}
                            onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter lead name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                          <input
                            type="text"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="Enter contact"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter description"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'schedule' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                        <input
                          type="text"
                          value={formData.event}
                          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="text"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                            placeholder="e.g. 10:00 AM - 6:00 PM"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                          type="text"
                          value={formData.venue}
                          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400"
                          placeholder="Enter venue"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Registered</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.registered}
                            onChange={(e) => setFormData({ ...formData, registered: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-900"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleSaveAdd : handleSaveEdit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Delete</h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to delete this {getActiveEntityLabel().singular.toLowerCase()}? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Action Modal */}
      <AnimatePresence>
        {showBulkActionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBulkActionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Confirm Bulk Action</h3>
                <p className="text-gray-500 text-center mb-6">
                  Are you sure you want to {bulkActionType} {selectedItems.length} selected {activeTab}?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBulkActionModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBulkAction}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      bulkActionType === 'delete' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm'
                    )}
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

export default AdminDashboard