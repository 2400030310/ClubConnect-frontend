import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useActivities } from '../../hooks/useActivities'
import { activityService } from '../../services/activityService'
import Button from '../common/Button'

const ActivityManager = () => {
  const { activities, loading, refetch } = useActivities()
  const [form, setForm] = useState({ title: '', category: '', eventDate: '' })
  const [saving, setSaving] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }

    try {
      setSaving(true)
      await activityService.createActivity(form)
      toast.success('Activity created')
      setForm({ title: '', category: '', eventDate: '' })
      refetch()
    } catch {
      toast.error('Could not create activity (API unavailable)')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await activityService.deleteActivity(id)
      toast.success('Activity deleted')
      refetch()
    } catch {
      toast.error('Could not delete activity (API unavailable)')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Activity Manager</h2>

      <form className="grid gap-2" onSubmit={handleCreate}>
        <input
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          placeholder="Activity title"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            placeholder="Category"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          />
          <input
            type="date"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            value={form.eventDate}
            onChange={(event) => setForm((prev) => ({ ...prev, eventDate: event.target.value }))}
          />
        </div>
        <Button type="submit" size="sm" loading={saving}>Create Activity</Button>
      </form>

      <div className="space-y-2">
        {loading && <p className="text-sm text-foreground font-medium">Loading activities...</p>}
        {!loading && activities.slice(0, 4).map((activity) => (
          <div key={activity.id} className="flex items-center justify-between rounded-md border border-border bg-background p-3">
            <p className="text-sm font-medium text-foreground">{activity.title || activity.name || 'Untitled Activity'}</p>
            <Button variant="outline" size="sm" onClick={() => handleDelete(activity.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityManager
