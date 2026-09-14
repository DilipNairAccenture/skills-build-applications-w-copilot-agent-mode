import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .then(() => setStatus('ready'))
      .catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return <section>
    <div className="section-heading"><div><span className="eyebrow">For your next session</span><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
    {status === 'loading' && <p className="state-message">Loading recommendations...</p>}
    {status === 'error' && <p className="alert alert-danger">{error}</p>}
    {status === 'ready' && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.name}><span className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.name}</h2><p>{workout.description}</p><footer>{workout.durationMinutes} min</footer></article>)}</div>}
  </section>
}

export default Workouts
