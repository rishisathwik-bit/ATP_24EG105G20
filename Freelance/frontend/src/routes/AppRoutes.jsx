import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import AuthPage from '../pages/AuthPage'
import CreateProjectPage from '../pages/CreateProjectPage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'
import ProjectDetailPage from '../pages/ProjectDetailPage'
import ProjectsPage from '../pages/ProjectsPage'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="create-project" element={<CreateProjectPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
