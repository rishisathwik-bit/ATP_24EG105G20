export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export function formatDate(value) {
  if (!value) return 'Not set'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function getProjectClientName(project) {
  return project?.client?.username || 'Client'
}

export function getUserId(user) {
  return user?._id || user?.id
}

export function splitTags(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
