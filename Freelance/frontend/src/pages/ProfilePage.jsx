import { useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '../services/api'
import { getUserId, splitTags } from '../services/formatters'
import { useAuth } from '../store/useAuth'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    college: user?.college || '',
    skills: (user?.skills || []).join(', '),
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    profilePic: user?.profilePic || '',
  })
  const [saving, setSaving] = useState(false)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        skills: splitTags(form.skills),
      }
      const data = await userService.update(getUserId(user), payload)
      setUser(data.user)
      toast.success('Profile updated')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page-stack narrow">
      <header className="page-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h2>{user?.username}</h2>
          <p>Keep your backend user profile current for bidding and project work.</p>
        </div>
      </header>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={updateField} required />
        </label>
        <label>
          Bio
          <textarea name="bio" rows="4" value={form.bio} onChange={updateField} />
        </label>
        <label>
          College
          <input name="college" value={form.college} onChange={updateField} />
        </label>
        <label>
          Skills
          <input name="skills" value={form.skills} onChange={updateField} />
        </label>
        <div className="form-row">
          <label>
            GitHub
            <input name="github" value={form.github} onChange={updateField} />
          </label>
          <label>
            LinkedIn
            <input name="linkedin" value={form.linkedin} onChange={updateField} />
          </label>
        </div>
        <label>
          Profile image URL
          <input name="profilePic" value={form.profilePic} onChange={updateField} />
        </label>
        <button className="button button-primary" disabled={saving} type="submit">
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  )
}
