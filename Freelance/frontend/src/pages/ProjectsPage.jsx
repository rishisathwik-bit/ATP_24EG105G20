import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import EmptyState from '../components/EmptyState'
import ProjectCard from '../components/ProjectCard'
import { projectService } from '../services/api'
import { formatCurrency } from '../services/formatters'

const statuses = ['all', 'open', 'in-progress', 'completed', 'cancelled']
const savedProjectsKey = 'fw:saved-projects'
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
  const [viewMode, setViewMode] = useState('grid')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(savedProjectsKey)) || []
    } catch {
      return []
    }
  })
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
    const visibleProjects = showSavedOnly
      ? projects.filter((project) => savedProjects.includes(project._id))
      : projects
    const matchedProjects = !normalizedQuery
      ? visibleProjects
      : visibleProjects.filter((project) => {
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
  }, [projects, query, savedProjects, showSavedOnly, sortBy])

  const toggleSavedProject = (projectId) => {
    setSavedProjects((current) => {
      const next = current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
      localStorage.setItem(savedProjectsKey, JSON.stringify(next))
      return next
    })
  }

  const stats = useMemo(() => {
    const open = projects.filter((project) => project.status === 'open').length
    const active = projects.filter((project) => project.status === 'in-progress').length
    const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget || 0), 0)
    const skillCount = new Set(projects.flatMap((project) => project.skillsRequired || [])).size

    return [
      { label: 'Open projects', value: open },
      { label: 'In progress', value: active },
      { label: 'Total budget', value: formatCurrency(totalBudget) },
      { label: 'Saved projects', value: savedProjects.length },
      { label: 'Skills needed', value: skillCount },
    ]
  }, [projects, savedProjects.length])

  return (
    <div className="page-stack projects-page">
      <header className="projects-hero relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#ecfdf5_50%,#dff7f3_100%)]">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
        <div>
          <span className="eyebrow inline-flex rounded-full bg-teal-50 px-3 py-1 text-teal-800">Marketplace</span>
          <h2>Find the right project faster.</h2>
          <p>
            Browse client work, compare budgets and deadlines, then open the full project page to
            place bids or manage delivery.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-teal-900 shadow-sm">
              Smart filters
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-teal-900 shadow-sm">
              Saved projects
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-teal-900 shadow-sm">
              Deadline badges
            </span>
          </div>
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
          <button
            className={showSavedOnly ? 'chip active' : 'chip'}
            type="button"
            onClick={() => setShowSavedOnly((current) => !current)}
          >
            Saved only
          </button>
          <div className="ml-auto flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {['grid', 'list'].map((mode) => (
              <button
                className={`rounded-md px-3 py-1.5 text-sm font-bold ${
                  viewMode === mode ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500'
                }`}
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
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
        <div className={`project-grid ${viewMode === 'list' ? 'project-grid-list' : ''}`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              isSaved={savedProjects.includes(project._id)}
              project={project}
              key={project._id}
              variant={viewMode}
              onToggleSaved={toggleSavedProject}
            />
          ))}
        </div>
        </>
      )}
    </div>
  )
}
