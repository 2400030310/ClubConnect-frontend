import React from 'react'
import { useActivities } from '../../hooks/useActivities'
import { useUsers } from '../../hooks/useUsers'

const AdminDashboard = () => {
  const { activities, loading } = useActivities()
  const { users, loading: usersLoading } = useUsers()

  const activeCount = activities.filter((item) => item.status !== 'completed').length
  const categories = new Set(activities.map((item) => item.category).filter(Boolean)).size

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Admin Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Users</p>
          <p className="text-xl font-bold text-primary">{usersLoading ? '...' : users.length}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Activities</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : activities.length}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium text-foreground">Active</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : activeCount}</p>
        </div>
        <div className="rounded-md border border-border bg-card p-3 col-span-2">
          <p className="text-sm font-medium text-foreground">Categories</p>
          <p className="text-xl font-bold text-primary">{loading ? '...' : categories}</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-md font-semibold">Registered Users</h3>

        {usersLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {users.map((user) => (
              <li key={user.id || user._id || user.email} className="rounded border p-2">
                <p><strong>{user.fullName || user.name || 'Unknown User'}</strong></p>
                <p>{user.email || '-'}</p>
                <p className="text-xs text-gray-500">{user.role || 'student'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
