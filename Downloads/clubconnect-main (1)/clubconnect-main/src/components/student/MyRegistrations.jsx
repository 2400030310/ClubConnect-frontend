import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { activityService } from '../../services/activityService'
import Button from '../common/Button'

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('myRegistrations') || '[]')
    } catch {
      return []
    }
  })

  const emptyText = useMemo(() => registrations.length === 0, [registrations])

  const handleCancel = async (id) => {
    try {
      await activityService.cancelRegistration(id)
    } catch {
      // Keep local fallback behavior when backend is unavailable.
    }

    const next = registrations.filter((item) => item.id !== id)
    setRegistrations(next)
    localStorage.setItem('myRegistrations', JSON.stringify(next))
    toast.success('Registration removed')
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">My Registrations</h2>
      {emptyText ? (
        <p className="text-sm text-foreground">No registrations yet. Register from Activity Catalog.</p>
      ) : (
        <div className="space-y-2">
          {registrations.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-md border border-border bg-background p-3">
              <div>
                <p className="font-medium text-foreground">{item.title || item.name || 'Untitled Activity'}</p>
                <p className="text-sm text-foreground">{item.category || 'General'}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleCancel(item.id)}>
                Cancel
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyRegistrations
