import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import EmptyState from '../components/EmptyState'
import ProjectCard from '../components/ProjectCard'
import { projectService } from '../services/api'
import { formatCurrency } from '../services/formatters'

const statuses = ['all', 'open', 'in-progress', 'completed', 'cancelled']
const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Budget high to low', value: 'budget-desc' },
  { label: 'Deadline soonest', value: 'deadline-asc' },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true
    projectService
      .list(status === 'all' ? undefined : status)
      .then(({ projects: projectList }) => {
        if (isActive) setProjects(projectList || [])
      })
      .catch((error) => {
        if (isActive) toast.error(error.message)
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [status])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matchedProjects = !normalizedQuery
      ? projects
      : projects.filter((project) => {
          const searchable = [
            project.title,
            project.description,
            ...(project.skillsRequired || []),
            project.client?.username,
          ]
            .join(' ')
            .toLowerCase()
          return searchable.includes(normalizedQuery)
        })

    return [...matchedProjects].sort((a, b) => {
      if (sortBy === 'budget-desc') return Number(b.budget || 0) - Number(a.budget || 0)
      if (sortBy === 'deadline-asc') return new Date(a.deadline) - new Date(b.deadline)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    })
  }, [projects, query, sortBy])

  const stats = useMemo(() => {
    const open = projects.filter((project) => project.status === 'open').length
    const active = projects.filter((project) => project.status === 'in-progress').length
    const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget || 0), 0)
    const skillCount = new Set(projects.flatMap((project) => project.skillsRequired || [])).size

    return [
      { label: 'Open projects', value: open },
      { label: 'In progress', value: active },
      { label: 'Total budget', value: formatCurrency(totalBudget) },
      { label: 'Skills needed', value: skillCount },
    ]
  }, [projects])

  return (
    <div className="page-stack projects-page">
      <header className="projects-hero">
        <div>
          <span className="eyebrow">Marketplace</span>
          <h2>Find the right project faster.</h2>
          <p>
            Browse client work, compare budgets and deadlines, then open the full project page to
            place bids or manage delivery.
          </p>
        </div>
        <Link className="button button-primary" to="/create-project">
          Post a project
        </Link>
      </header>

      <section className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="project-controls">
        <input
          className="search-input"
          placeholder="Search by title, skill, or client"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="filter-row">
          {statuses.map((item) => (
            <button
              className={status === item ? 'chip active' : 'chip'}
              key={item}
              type="button"
              onClick={() => setStatus(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="project-grid">
          {[1, 2, 3].map((item) => (
            <div className="project-skeleton" key={item} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState title="No projects found" message="Try a different status or search term." />
      ) : (
        <>
          <div className="section-heading">
            <h3>{filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'} found</h3>
            <p className="page-note">Showing {status === 'all' ? 'all statuses' : status}.</p>
          </div>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
        </>
      )}
    </div>
  )
}
