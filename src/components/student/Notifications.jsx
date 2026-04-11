import React, { useMemo } from 'react'

const Notifications = () => {
  const notifications = useMemo(() => {
    let registrations = []
    try {
      registrations = JSON.parse(localStorage.getItem('myRegistrations') || '[]')
    } catch {
      registrations = []
    }

    const registrationNotes = registrations.slice(0, 3).map((item) => ({
      id: `reg-${item.id}`,
      message: `You're registered for ${item.title || item.name || 'an activity'}.`,
      type: 'info',
    }))

    return [
      ...registrationNotes,
      {
        id: 'tip-1',
        message: 'Keep your profile updated to receive personalized suggestions.',
        type: 'tip',
      },
    ]
  }, [])

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((note) => (
          <div key={note.id} className="rounded-md border border-border bg-background p-3">
            <p className="text-sm text-foreground font-medium">{note.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
