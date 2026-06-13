import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { projectService, userService } from '../services/api'
import { getUserId, splitTags } from '../services/formatters'
import { useAuth } from '../store/useAuth'

const initialForm = {
  title: '',
  description: '',
  budget: '',
  deadline: '',
  skillsRequired: '',
  attachments: '',
}

export default function CreateProjectPage() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [switchingRole, setSwitchingRole] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const canCreate = user?.role === 'client' || user?.role === 'admin'

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
        deadline: form.deadline,
        skillsRequired: splitTags(form.skillsRequired),
        attachments: splitTags(form.attachments),
      }
      const data = await projectService.create(payload)
      toast.success('Project created')
      navigate(`/projects/${data.project._id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const becomeClient = async () => {
    setSwitchingRole(true)
    try {
      await userService.update(getUserId(user), { role: 'client' })
      toast.success('Client access enabled. Please login again.')
      await logout()
      navigate('/auth')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSwitchingRole(false)
    }
  }

  if (!canCreate) {
    return (
      <div className="page-stack">
        <header className="page-header">
          <div>
            <span className="eyebrow">Create project</span>
            <h2>Client access required</h2>
            <p>
              You are currently logged in as {user?.role || 'a student'}. Only client and admin
              accounts can post new projects on this backend.
            </p>
          </div>
        </header>
        <div className="form-panel">
          <h3>Need to post work?</h3>
          <p className="page-note">
            Switch this account to client access. You will be logged out once so the backend can
            issue a fresh token with the new role.
          </p>
          <button
            className="button button-primary"
            disabled={switchingRole}
            type="button"
            onClick={becomeClient}
          >
            {switchingRole ? 'Switching...' : 'Switch my account to client'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-stack create-project-page">
      <header className="projects-hero create-hero">
        <div>
          <span className="eyebrow">Create project</span>
          <h2>Post clear work and attract better bids.</h2>
          <p>
            Add the essentials freelancers need: scope, budget, deadline, skills, and supporting
            links.
          </p>
        </div>
      </header>

      <div className="create-project-grid">
        <form className="form-panel project-form" onSubmit={handleSubmit}>
          <label>
            Project title
            <input
              name="title"
              placeholder="Example: Responsive portfolio website"
              value={form.title}
              onChange={updateField}
              required
            />
          </label>
          <label>
            Project brief
            <textarea
              name="description"
              placeholder="Describe the expected output, important pages, integrations, and success criteria."
              rows="6"
              value={form.description}
              onChange={updateField}
              required
            />
          </label>
          <div className="form-row">
            <label>
              Budget
              <input
                name="budget"
                min="1"
                placeholder="5000"
                type="number"
                value={form.budget}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Deadline
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={updateField}
                required
              />
            </label>
          </div>
          <label>
            Skills required
            <input
              name="skillsRequired"
              placeholder="React, Node, MongoDB"
              value={form.skillsRequired}
              onChange={updateField}
            />
          </label>
          <label>
            Attachments
            <input
              name="attachments"
              placeholder="Paste URLs separated by commas"
              value={form.attachments}
              onChange={updateField}
            />
          </label>
          <button className="button button-primary" disabled={submitting} type="submit">
            {submitting ? 'Creating...' : 'Create project'}
          </button>
        </form>

        <aside className="side-panel project-tips">
          <h3>Good briefs get better bids</h3>
          <div className="activity-list">
            <div className="activity">
              <strong>Be specific</strong>
              <p>Mention deliverables, pages, features, and what counts as done.</p>
            </div>
            <div className="activity">
              <strong>Add useful skills</strong>
              <p>Comma-separated skills help students find relevant work quickly.</p>
            </div>
            <div className="activity">
              <strong>Use a real deadline</strong>
              <p>A clear date helps bidders estimate effort and availability.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
