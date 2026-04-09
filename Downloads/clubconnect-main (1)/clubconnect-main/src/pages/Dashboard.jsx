import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || 'null')
  )
  const role = user?.role?.toLowerCase() || user?.userType?.toLowerCase()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
      return
    }

    navigate('/student/dashboard', { replace: true })
  }, [user, role, navigate])

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
