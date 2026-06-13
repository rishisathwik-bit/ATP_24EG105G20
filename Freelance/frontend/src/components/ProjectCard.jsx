import { Link } from 'react-router-dom'
import { formatCurrency, formatDate, getProjectClientName } from '../services/formatters'

function getDeadlineTone(deadline) {
  if (!deadline) return { label: 'Flexible', className: 'bg-slate-100 text-slate-600' }

  const today = new Date()
  const due = new Date(deadline)
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24))

  if (Number.isNaN(daysLeft)) return { label: 'Flexible', className: 'bg-slate-100 text-slate-600' }
  if (daysLeft < 0) return { label: 'Overdue', className: 'bg-rose-100 text-rose-700' }
  if (daysLeft === 0) return { label: 'Due today', className: 'bg-amber-100 text-amber-800' }
  if (daysLeft <= 7) return { label: `${daysLeft} days left`, className: 'bg-amber-100 text-amber-800' }

  return { label: `${daysLeft} days left`, className: 'bg-emerald-100 text-emerald-700' }
}

export default function ProjectCard({ project, isSaved = false, onToggleSaved, variant = 'grid' }) {
  const skills = project.skillsRequired || []
  const hiddenSkillCount = Math.max(skills.length - 4, 0)
  const deadlineTone = getDeadlineTone(project.deadline)

  return (
    <article className={`project-card group relative ${variant === 'list' ? 'project-card-list' : ''}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 via-emerald-400 to-cyan-400 opacity-80" />
      <div className="card-topline">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`status-pill status-${project.status}`}>{project.status}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${deadlineTone.className}`}>
            {deadlineTone.label}
          </span>
        </div>
        <strong className="project-budget">{formatCurrency(project.budget)}</strong>
      </div>
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="skill-row">
        {skills.slice(0, 4).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
        {hiddenSkillCount > 0 && <span>+{hiddenSkillCount}</span>}
      </div>
      <div className="card-meta">
        <span>Client: {getProjectClientName(project)}</span>
        <span>Due: {formatDate(project.deadline)}</span>
      </div>
      <div className="flex gap-2">
        <Link className="button button-secondary flex-1" to={`/projects/${project._id}`}>
          Open details
        </Link>
        {onToggleSaved && (
          <button
            aria-label={isSaved ? 'Remove saved project' : 'Save project'}
            className={`button min-w-12 border border-teal-100 ${
              isSaved ? 'bg-teal-700 text-white' : 'bg-white text-teal-700 hover:bg-teal-50'
            }`}
            type="button"
            onClick={() => onToggleSaved(project._id)}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        )}
      </div>
    </article>
  )
}
