export const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString()
}

export const capitalize = (value = '') => {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}
