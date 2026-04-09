export const isEmail = (value = '') => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== ''
}
