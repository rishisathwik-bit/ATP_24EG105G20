import apiClient from '../api/client'

export const authService = {
  login: (payload) => apiClient.post('/auth/login', payload).then((res) => res.data),
  register: (payload) => apiClient.post('/auth/register', payload).then((res) => res.data),
  logout: () => apiClient.post('/auth/logout').then((res) => res.data),
  me: () => apiClient.get('/auth/me').then((res) => res.data),
}

export const userService = {
  getAll: () => apiClient.get('/users').then((res) => res.data),
  update: (id, payload) => apiClient.put(`/users/${id}`, payload).then((res) => res.data),
}

export const projectService = {
  list: (status) =>
    apiClient
      .get('/projects', { params: status ? { status } : {} })
      .then((res) => res.data),
  get: (id) => apiClient.get(`/projects/${id}`).then((res) => res.data),
  create: (payload) => apiClient.post('/projects', payload).then((res) => res.data),
  update: (id, payload) => apiClient.patch(`/projects/${id}`, payload).then((res) => res.data),
  updateStatus: (id, status) =>
    apiClient.patch(`/projects/${id}/status`, { status }).then((res) => res.data),
  selectFreelancer: (id, freelancerId) =>
    apiClient.patch(`/projects/${id}/select-freelancer`, { freelancerId }).then((res) => res.data),
}

export const bidService = {
  create: (payload) => apiClient.post('/bids', payload).then((res) => res.data),
  byProject: (projectId) => apiClient.get(`/bids/project/${projectId}`).then((res) => res.data),
  byUser: (userId) => apiClient.get(`/bids/user/${userId}`).then((res) => res.data),
  updateStatus: (id, status) =>
    apiClient.patch(`/bids/${id}/status`, { status }).then((res) => res.data),
}

export const milestoneService = {
  create: (payload) => apiClient.post('/milestones', payload).then((res) => res.data),
  byProject: (projectId) =>
    apiClient.get(`/milestones/project/${projectId}`).then((res) => res.data),
  update: (id, payload) => apiClient.patch(`/milestones/${id}`, payload).then((res) => res.data),
}

export const messageService = {
  send: (payload) => apiClient.post('/messages', payload).then((res) => res.data),
  byProject: (projectId) => apiClient.get(`/messages/project/${projectId}`).then((res) => res.data),
}

export const reviewService = {
  create: (payload) => apiClient.post('/reviews', payload).then((res) => res.data),
  byProject: (projectId) => apiClient.get(`/reviews/project/${projectId}`).then((res) => res.data),
}

export const notificationService = {
  byUser: (userId) => apiClient.get(`/notifications/user/${userId}`).then((res) => res.data),
  markRead: (id) => apiClient.patch(`/notifications/${id}/read`).then((res) => res.data),
}
