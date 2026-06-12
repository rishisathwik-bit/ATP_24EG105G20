import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../store/useAuth'
import heroImage from '../assets/hero.png'

const initialForm = {
  username: '',
  email: '',
  password: '',
  role: 'student',
}

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password })
      } else {
        await register(form)
      }
      navigate(location.state?.from?.pathname || '/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-[#eef4f2] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-[#0f2f2f] px-7 py-8 text-white md:p-12 lg:min-h-screen lg:p-[clamp(28px,5vw,72px)]">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src={heroImage}
          alt="Freelance collaboration"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,31,31,0.94)_0%,rgba(9,31,31,0.76)_48%,rgba(9,31,31,0.44)_100%),linear-gradient(180deg,rgba(15,47,47,0.14),rgba(9,26,26,0.88))]" />
        <div className="relative z-10 max-w-[720px]">
          <span className="text-xs font-extrabold uppercase tracking-normal text-[#bdf7e8]">
            Student talent marketplace
          </span>
          <h1 className="mt-4 max-w-[11ch] text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.9] text-white max-sm:max-w-none">
            Freelance Workspace
          </h1>
          <p className="mt-6 max-w-[680px] text-[clamp(1rem,1.6vw,1.25rem)] text-[#d6eee9]">
            Create projects, receive bids, manage milestones, and keep every client-student
            conversation close to the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Platform highlights">
            <strong className="grid min-w-32 gap-0.5 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-2xl text-white backdrop-blur">
              7
              <span className="text-xs font-bold normal-case text-[#bde8e0]">Core APIs</span>
            </strong>
            <strong className="grid min-w-32 gap-0.5 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-2xl text-white backdrop-blur">
              3
              <span className="text-xs font-bold normal-case text-[#bde8e0]">User roles</span>
            </strong>
            <strong className="grid min-w-32 gap-0.5 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-2xl text-white backdrop-blur">
              1
              <span className="text-xs font-bold normal-case text-[#bde8e0]">Delivery hub</span>
            </strong>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(189,247,232,0.26),transparent_34%),#f9fbfa] p-6 md:p-12">
        <form
          className="grid w-full max-w-[500px] gap-4 rounded-lg border border-[#dce7e4] bg-white p-6 shadow-[0_24px_70px_rgba(31,56,54,0.11)] md:p-8"
          onSubmit={handleSubmit}
        >
          <div
            className="grid grid-cols-2 gap-1.5 rounded-lg border border-[#d9e4e1] bg-[#f4f7f6] p-1.5"
            aria-label="Authentication mode"
          >
            <button
              className={`min-h-10 rounded-md font-semibold transition ${
                mode === 'login'
                  ? 'bg-white text-[#123331] shadow-[0_8px_22px_rgba(26,71,68,0.10)]'
                  : 'text-[#4b5c5a] hover:bg-white/60'
              }`}
              type="button"
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={`min-h-10 rounded-md font-semibold transition ${
                mode === 'register'
                  ? 'bg-white text-[#123331] shadow-[0_8px_22px_rgba(26,71,68,0.10)]'
                  : 'text-[#4b5c5a] hover:bg-white/60'
              }`}
              type="button"
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>

          <div>
            <h2 className="text-[clamp(1.8rem,2.8vw,2.45rem)] font-black leading-tight text-[#172026]">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="mt-2 text-[#637371]">
              {mode === 'login'
                ? 'Use your registered email to continue.'
                : 'Choose a role that matches how you will use the platform.'}
            </p>
          </div>

          {mode === 'register' && (
            <>
              <label className="grid gap-2 font-bold text-[#33413f]">
                Username
                <input
                  className="w-full rounded-md border border-[#d6e0dd] bg-white px-3.5 py-3.5 text-[#172026] outline-none focus:border-[#32756e] focus:ring-4 focus:ring-[#32756e]/15"
                  name="username"
                  value={form.username}
                  onChange={updateField}
                  required
                />
              </label>
              <label className="grid gap-2 font-bold text-[#33413f]">
                Role
                <select
                  className="w-full rounded-md border border-[#d6e0dd] bg-white px-3.5 py-3.5 text-[#172026] outline-none focus:border-[#32756e] focus:ring-4 focus:ring-[#32756e]/15"
                  name="role"
                  value={form.role}
                  onChange={updateField}
                >
                  <option value="student">Student / freelancer</option>
                  <option value="client">Client</option>
                </select>
              </label>
            </>
          )}

          <label className="grid gap-2 font-bold text-[#33413f]">
            Email
            <input
              className="w-full rounded-md border border-[#d6e0dd] bg-white px-3.5 py-3.5 text-[#172026] outline-none focus:border-[#32756e] focus:ring-4 focus:ring-[#32756e]/15"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>
          <label className="grid gap-2 font-bold text-[#33413f]">
            Password
            <input
              className="w-full rounded-md border border-[#d6e0dd] bg-white px-3.5 py-3.5 text-[#172026] outline-none focus:border-[#32756e] focus:ring-4 focus:ring-[#32756e]/15"
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>

          <button
            className="mt-1 inline-flex min-h-12 items-center justify-center rounded-md bg-[#32756e] px-4 font-extrabold text-white transition hover:bg-[#28635d] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </section>
    </main>
  )
}
