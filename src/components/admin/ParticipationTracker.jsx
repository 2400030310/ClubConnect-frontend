import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useActivities } from '../../hooks/useActivities'
import { activityService } from '../../services/activityService'
import Button from '../common/Button'

const ParticipationTracker = () => {
  const { activities } = useActivities()
  const [selectedId, setSelectedId] = useState('')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activities.length > 0 && !selectedId) {
      setSelectedId(String(activities[0].id))
    }
  }, [activities, selectedId])

  const loadParticipants = async () => {
    if (!selectedId) return

    try {
      setLoading(true)
      const data = await activityService.getParticipants(selectedId)
      const list = Array.isArray(data) ? data : data?.participants || data?.data || []
      setParticipants(list)
    } catch {
      setParticipants([])
      toast.error('Could not fetch participants')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Participation Tracker</h2>
      <div className="flex gap-2">
        <select
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
        >
          <option value="">Select activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={String(activity.id)}>
              {activity.title || activity.name || `Activity ${activity.id}`}
            </option>
          ))}
        </select>
        <Button size="sm" onClick={loadParticipants} loading={loading}>Load</Button>
      </div>
      <p className="text-sm text-foreground font-medium">Participants: {participants.length}</p>
      <div className="space-y-1">
        {participants.slice(0, 5).map((participant) => (
          <div key={participant.id || participant.email} className="rounded-md border border-border bg-background p-2 text-sm text-foreground font-medium">
            {participant.name || participant.email || 'Unnamed participant'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParticipationTracker
