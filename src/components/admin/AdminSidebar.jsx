import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background p-4">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </aside>
  )
}

export default AdminSidebar