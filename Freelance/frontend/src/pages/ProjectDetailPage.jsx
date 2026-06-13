import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import {
  bidService,
  messageService,
  milestoneService,
  projectService,
  reviewService,
} from '../services/api'
import { formatCurrency, formatDate, getUserId } from '../services/formatters'
import { useAuth } from '../store/useAuth'

const bidInitial = { bidAmount: '', estimatedDays: '', proposal: '' }
const milestoneInitial = { title: '', description: '', amount: '', dueDate: '' }
const messageInitial = { receiver: '', message: '' }
const reviewInitial = { freelancer: '', rating: '5', comment: '' }

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [bids, setBids] = useState([])
  const [milestones, setMilestones] = useState([])
  const [messages, setMessages] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [bidForm, setBidForm] = useState(bidInitial)
  const [milestoneForm, setMilestoneForm] = useState(milestoneInitial)
  const [messageForm, setMessageForm] = useState(messageInitial)
  const [reviewForm, setReviewForm] = useState(reviewInitial)

  const userId = getUserId(user)
  const isOwner = project?.client?._id === userId || project?.client === userId
  const isClient = user?.role === 'client' || user?.role === 'admin'
  const selectedFreelancerId = project?.selectedFreelancer?._id || project?.selectedFreelancer

  const loadProjectData = useCallback(() => {
    Promise.all([
      projectService.get(id),
      bidService.byProject(id).catch(() => ({ bids: [] })),
      milestoneService.byProject(id).catch(() => ({ milestones: [] })),
      messageService.byProject(id).catch(() => ({ messages: [] })),
      reviewService.byProject(id).catch(() => ({ reviews: [] })),
    ])
      .then(([projectData, bidData, milestoneData, messageData, reviewData]) => {
        setProject(projectData.project)
        setBids(bidData.bids || [])
        setMilestones(milestoneData.milestones || [])
        setMessages(messageData.messages || [])
        setReviews(reviewData.reviews || [])
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    loadProjectData()
  }, [loadProjectData])

  const people = useMemo(() => {
    const users = []
    if (project?.client) users.push(project.client)
    bids.forEach((bid) => {
      if (bid.bidder && !users.some((item) => getUserId(item) === getUserId(bid.bidder))) {
        users.push(bid.bidder)
      }
    })
    return users.filter((item) => getUserId(item) && getUserId(item) !== userId)
  }, [bids, project, userId])

  const updateBid = (event) => setBidForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const updateMilestone = (event) =>
    setMilestoneForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const updateMessage = (event) =>
    setMessageForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const updateReview = (event) =>
    setReviewForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submitBid = async (event) => {
    event.preventDefault()
    try {
      await bidService.create({
        project: id,
        bidAmount: Number(bidForm.bidAmount),
        estimatedDays: Number(bidForm.estimatedDays),
        proposal: bidForm.proposal,
      })
      setBidForm(bidInitial)
      toast.success('Bid submitted')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const setBidStatus = async (bidId, status) => {
    try {
      await bidService.updateStatus(bidId, status)
      toast.success(`Bid ${status}`)
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const submitMilestone = async (event) => {
    event.preventDefault()
    try {
      await milestoneService.create({
        project: id,
        title: milestoneForm.title,
        description: milestoneForm.description,
        amount: Number(milestoneForm.amount),
        dueDate: milestoneForm.dueDate || undefined,
      })
      setMilestoneForm(milestoneInitial)
      toast.success('Milestone added')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateMilestoneStatus = async (milestoneId, status) => {
    try {
      await milestoneService.update(milestoneId, { status })
      toast.success('Milestone updated')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const submitMessage = async (event) => {
    event.preventDefault()
    try {
      await messageService.send({ project: id, ...messageForm })
      setMessageForm(messageInitial)
      toast.success('Message sent')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const submitReview = async (event) => {
    event.preventDefault()
    try {
      await reviewService.create({
        project: id,
        freelancer: reviewForm.freelancer,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      })
      setReviewForm(reviewInitial)
      toast.success('Review submitted')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateProjectStatus = async (status) => {
    try {
      await projectService.updateStatus(id, status)
      toast.success('Project status updated')
      loadProjectData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <p className="page-note">Loading project...</p>
  if (!project) return <EmptyState title="Project not found" message="The backend did not return this project." />

  return (
    <div className="page-stack">
      <header className="detail-hero">
        <div>
          <span className={`status-pill status-${project.status}`}>{project.status}</span>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="skill-row">
            {(project.skillsRequired || []).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
        <div className="project-facts">
          <strong>{formatCurrency(project.budget)}</strong>
          <span>Deadline {formatDate(project.deadline)}</span>
          <span>Client {project.client?.username || 'Client'}</span>
          {project.selectedFreelancer && (
            <span>Freelancer {project.selectedFreelancer?.username || selectedFreelancerId}</span>
          )}
        </div>
      </header>

      {isOwner && (
        <div className="toolbar-panel">
          {['open', 'in-progress', 'completed', 'cancelled'].map((status) => (
            <button className="chip" key={status} type="button" onClick={() => updateProjectStatus(status)}>
              Set {status}
            </button>
          ))}
        </div>
      )}

      <section className="detail-grid">
        <div className="panel">
          <h3>Bids</h3>
          {bids.length === 0 ? (
            <EmptyState title="No bids yet" message="Submitted bids will appear here." />
          ) : (
            <div className="activity-list">
              {bids.map((bid) => (
                <article className="bid-item" key={bid._id}>
                  <div>
                    <strong>{bid.bidder?.username || 'Freelancer'}</strong>
                    <span>{formatCurrency(bid.bidAmount)} · {bid.estimatedDays} days</span>
                    <p>{bid.proposal}</p>
                  </div>
                  <span className={`status-pill status-${bid.status}`}>{bid.status}</span>
                  {isOwner && bid.status === 'pending' && (
                    <div className="inline-actions">
                      <button type="button" onClick={() => setBidStatus(bid._id, 'accepted')}>
                        Accept
                      </button>
                      <button type="button" onClick={() => setBidStatus(bid._id, 'rejected')}>
                        Reject
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {!isOwner && (
            <form className="mini-form" onSubmit={submitBid}>
              <h4>Place a bid</h4>
              <div className="form-row">
                <input
                  name="bidAmount"
                  min="1"
                  placeholder="Amount"
                  type="number"
                  value={bidForm.bidAmount}
                  onChange={updateBid}
                  required
                />
                <input
                  name="estimatedDays"
                  min="1"
                  placeholder="Days"
                  type="number"
                  value={bidForm.estimatedDays}
                  onChange={updateBid}
                  required
                />
              </div>
              <textarea
                name="proposal"
                placeholder="Proposal"
                value={bidForm.proposal}
                onChange={updateBid}
                required
              />
              <button className="button button-primary" type="submit">Submit bid</button>
            </form>
          )}
        </div>

        <div className="panel milestone-panel">
          <div className="milestone-list-column">
            <h3>Milestones</h3>
          {milestones.length === 0 ? (
            <EmptyState title="No milestones" message="Clients can define payment milestones." />
          ) : (
            <div className="activity-list">
              {milestones.map((milestone) => (
                <article className="activity" key={milestone._id}>
                  <strong>{milestone.title}</strong>
                  <span>{formatCurrency(milestone.amount)} · {formatDate(milestone.dueDate)}</span>
                  <p>{milestone.description}</p>
                  <span className={`status-pill status-${milestone.status}`}>{milestone.status}</span>
                  {isOwner && (
                    <select
                      value={milestone.status}
                      onChange={(event) => updateMilestoneStatus(milestone._id, event.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="submitted">submitted</option>
                      <option value="approved">approved</option>
                      <option value="paid">paid</option>
                    </select>
                  )}
                </article>
              ))}
            </div>
            )}
          </div>

          {isOwner && (
            <form className="mini-form milestone-form" onSubmit={submitMilestone}>
              <h4>Add milestone</h4>
              <input name="title" placeholder="Title" value={milestoneForm.title} onChange={updateMilestone} required />
              <textarea
                name="description"
                placeholder="Description"
                value={milestoneForm.description}
                onChange={updateMilestone}
                required
              />
              <div className="form-row">
                <input
                  name="amount"
                  min="1"
                  placeholder="Amount"
                  type="number"
                  value={milestoneForm.amount}
                  onChange={updateMilestone}
                  required
                />
                <input name="dueDate" type="date" value={milestoneForm.dueDate} onChange={updateMilestone} />
              </div>
              <button className="button button-primary" type="submit">Add milestone</button>
            </form>
          )}
        </div>
      </section>

      <section className="detail-grid">
        <div className="panel">
          <h3>Messages</h3>
          {messages.length === 0 ? (
            <EmptyState title="No messages" message="Project conversations will appear here." />
          ) : (
            <div className="message-list">
              {messages.map((item) => (
                <div className={item.sender === userId ? 'message mine' : 'message'} key={item._id}>
                  <p>{item.message}</p>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
          <form className="mini-form" onSubmit={submitMessage}>
            <select name="receiver" value={messageForm.receiver} onChange={updateMessage} required>
              <option value="">Select receiver</option>
              {people.map((person) => (
                <option key={getUserId(person)} value={getUserId(person)}>
                  {person.username} ({person.role})
                </option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Write a message"
              value={messageForm.message}
              onChange={updateMessage}
              required
            />
            <button className="button button-primary" type="submit">Send message</button>
          </form>
        </div>

        <div className="panel">
          <h3>Reviews</h3>
          {reviews.length === 0 ? (
            <EmptyState title="No reviews" message="Project feedback will appear here." />
          ) : (
            <div className="activity-list">
              {reviews.map((review) => (
                <article className="activity" key={review._id}>
                  <strong>{review.rating}/5 rating</strong>
                  <p>{review.comment || 'No comment provided.'}</p>
                </article>
              ))}
            </div>
          )}

          {isClient && (
            <form className="mini-form" onSubmit={submitReview}>
              <h4>Add review</h4>
              <div className="form-row">
                <select name="freelancer" value={reviewForm.freelancer} onChange={updateReview} required>
                  <option value="">Select freelancer</option>
                  {bids.map((bid) => (
                    <option key={bid._id} value={getUserId(bid.bidder)}>
                      {bid.bidder?.username || getUserId(bid.bidder)}
                    </option>
                  ))}
                </select>
                <input
                  max="5"
                  min="1"
                  name="rating"
                  type="number"
                  value={reviewForm.rating}
                  onChange={updateReview}
                />
              </div>
              <textarea
                name="comment"
                placeholder="Feedback"
                value={reviewForm.comment}
                onChange={updateReview}
              />
              <button className="button button-primary" type="submit">Submit review</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
