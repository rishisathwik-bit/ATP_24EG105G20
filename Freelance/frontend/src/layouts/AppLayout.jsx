import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-mark">FW</div>
          <h1>Freelance Workspace</h1>
          <p>{user?.role || 'member'} dashboard</p>
        </div>

        <nav className="nav-list">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/create-project">Create Project</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <button className="button button-ghost" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
