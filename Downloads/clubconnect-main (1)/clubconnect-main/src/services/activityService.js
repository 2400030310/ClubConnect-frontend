import api from './api'

export const activityService = {
  getActivities: async (params) => {
    const response = await api.get('/activities', { params })
    return response.data
  },
  getActivityById: async (id) => {
    const response = await api.get(`/activities/${id}`)
    return response.data
  },
  createActivity: async (data) => {
    const response = await api.post('/activities', data)
    return response.data
  },
  updateActivity: async (id, data) => {
    const response = await api.put(`/activities/${id}`, data)
    return response.data
  },
  deleteActivity: async (id) => {
    const response = await api.delete(`/activities/${id}`)
    return response.data
  },
  registerForActivity: async (id) => {
    const response = await api.post(`/activities/${id}/register`)
    return response.data
  },
  cancelRegistration: async (id) => {
    const response = await api.delete(`/activities/${id}/register`)
    return response.data
  },
  getParticipants: async (id) => {
    const response = await api.get(`/activities/${id}/participants`)
    return response.data
  },
}