import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from './layouts/AdminLayout'
import StudentLayout from './layouts/StudentLayout'
import Loader from './components/common/Loader'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import StudentPanel from './pages/StudentPanel'
import Events from './pages/Events'
import Activities from './pages/Activities'
import Communities from './pages/Communities'
import About from './pages/About'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Home without MainLayout as it has its own navbar */}
        <Route path="/" element={<Home />} />
        
        {/* Auth pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Events and Activities pages */}
        <Route path="/events" element={<Events />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route path="dashboard" element={<AdminPanel />} />
        </Route>
        
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentPanel />} />
          <Route path="dashboard" element={<StudentPanel />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App