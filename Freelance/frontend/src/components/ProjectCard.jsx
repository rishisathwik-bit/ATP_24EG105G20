import { Link } from 'react-router-dom'
import { formatCurrency, formatDate, getProjectClientName } from '../services/formatters'

export default function ProjectCard({ project }) {
  const skills = project.skillsRequired || []
  const hiddenSkillCount = Math.max(skills.length - 4, 0)

  return (
    <article className="project-card">
      <div className="card-topline">
        <span className={`status-pill status-${project.status}`}>{project.status}</span>
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
      <Link className="button button-secondary" to={`/projects/${project._id}`}>
        Open details
      </Link>
    </article>
  )
}
