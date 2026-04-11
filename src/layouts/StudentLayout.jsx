import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentSidebar from '../components/student/StudentSidebar'

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex">
      <StudentSidebar />
      <main className="flex-grow ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StudentLayout