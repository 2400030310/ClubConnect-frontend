import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useActivities } from '../../hooks/useActivities'
import { activityService } from '../../services/activityService'
import Button from '../common/Button'

const EventUpdater = () => {
  const { activities, refetch } = useActivities()
  const [selectedId, setSelectedId] = useState('')
  const [form, setForm] = useState({ title: '', eventDate: '', status: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (activities.length && !selectedId) {
      const first = activities[0]
      setSelectedId(String(first.id))
      setForm({
        title: first.title || first.name || '',
        eventDate: first.eventDate || first.date || '',
        status: first.status || 'scheduled',
      })
    }
  }, [activities, selectedId])

  const handleSelect = (value) => {
    setSelectedId(value)
    const item = activities.find((activity) => String(activity.id) === value)
    if (!item) return
    setForm({
      title: item.title || item.name || '',
      eventDate: item.eventDate || item.date || '',
      status: item.status || 'scheduled',
    })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if (!selectedId) {
      toast.error('Select an activity first')
      return
    }

    try {
      setSaving(true)
      await activityService.updateActivity(selectedId, form)
      toast.success('Activity updated')
      refetch()
    } catch {
      toast.error('Could not update activity (API unavailable)')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Event Updater</h2>
      <form className="space-y-2" onSubmit={handleSave}>
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          value={selectedId}
          onChange={(event) => handleSelect(event.target.value)}
        >
          <option value="">Select activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={String(activity.id)}>
              {activity.title || activity.name || `Activity ${activity.id}`}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Title"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={form.eventDate}
            onChange={(event) => setForm((prev) => ({ ...prev, eventDate: event.target.value }))}
          />
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Button type="submit" size="sm" loading={saving}>Update Activity</Button>
      </form>
    </div>
  )
}

export default EventUpdater
