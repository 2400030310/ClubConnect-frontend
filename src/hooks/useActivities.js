import { useState, useEffect } from 'react'
import { activityService } from '../services/activityService'

export const useActivities = (filters = {}) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchActivities()
  }, [JSON.stringify(filters)])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const data = await activityService.getActivities(filters)
      const normalized = Array.isArray(data)
        ? data
        : data?.activities || data?.items || data?.data || []
      setActivities(normalized)
      setError(null)
    } catch (err) {
      setError(err.message)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  return { activities, loading, error, refetch: fetchActivities }
}