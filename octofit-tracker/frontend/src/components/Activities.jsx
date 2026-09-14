import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return <section>
    <div className="section-heading"><div><span className="eyebrow">Movement log</span><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div>
    {status === 'loading' && <p className="state-message">Loading activity...</p>}
    {status === 'error' && <p className="alert alert-danger">{error}</p>}
    {status === 'ready' && <div className="table-wrap"><table className="table align-middle"><thead><tr><th>Type</th><th>Duration</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>}
  </section>
}

export default Activities
