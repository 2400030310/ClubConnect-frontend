import React, { useMemo } from 'react'
import { useActivities } from '../../hooks/useActivities'

const StudentDashboard = () => {
  const { activities, loading } = useActivities()

  const registrations = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('myRegistrations') || '[]')
    } catch {
      return []
    }
  }, [])

  const totalActivities = activities.length
  const registeredCount = registrations.length

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Total Activities</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : totalActivities}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">My Registrations</p>
          <p className="text-xl font-bold text-primary">{registeredCount}</p>
        </div>
      </div>
      <p className="text-sm text-foreground font-medium">Track your opportunities and stay active in campus events.</p>
    </div>
  )
}

export default StudentDashboard
