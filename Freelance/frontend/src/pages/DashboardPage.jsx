import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import EmptyState from '../components/EmptyState'
import ProjectCard from '../components/ProjectCard'
import { bidService, notificationService, projectService } from '../services/api'
import { formatCurrency, getUserId } from '../services/formatters'
import { useAuth } from '../store/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [bids, setBids] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = getUserId(user)
    Promise.all([
      projectService.list(),
      bidService.byUser(userId).catch(() => ({ bids: [] })),
      notificationService.byUser(userId).catch(() => ({ notifications: [] })),
    ])
      .then(([projectData, bidData, notificationData]) => {
        setProjects(projectData.projects || [])
        setBids(bidData.bids || [])
        setNotifications(notificationData.notifications || [])
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }, [user])

  const stats = useMemo(() => {
    const myProjects = projects.filter((project) => project.client?._id === getUserId(user))
    const openProjects = projects.filter((project) => project.status === 'open')
    const activeValue = myProjects.reduce((sum, project) => sum + Number(project.budget || 0), 0)

    return [
      { label: 'Open projects', value: openProjects.length },
      { label: 'My posted projects', value: myProjects.length },
      { label: 'My bids', value: bids.length },
      { label: 'Posted value', value: formatCurrency(activeValue) },
    ]
  }, [bids.length, projects, user])

  if (loading) return <p className="page-note">Loading dashboard...</p>

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h2>Hello, {user?.username}</h2>
          <p>Track project demand, bids, and account activity from the backend APIs.</p>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <div>
          <div className="section-heading">
            <h3>Latest open projects</h3>
          </div>
          <div className="project-grid compact">
            {projects
              .filter((project) => project.status === 'open')
              .slice(0, 4)
              .map((project) => (
                <ProjectCard project={project} key={project._id} />
              ))}
          </div>
        </div>

        <aside className="side-panel">
          <h3>Notifications</h3>
          {notifications.length === 0 ? (
            <EmptyState title="No notifications" message="New updates will appear here." />
          ) : (
            <div className="activity-list">
              {notifications.slice(0, 5).map((item) => (
                <div className={item.isRead ? 'activity muted' : 'activity'} key={item._id}>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}
