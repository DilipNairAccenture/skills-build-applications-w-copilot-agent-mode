import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard')
      .then(setEntries)
      .then(() => setStatus('ready'))
      .catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return <section>
    <div className="section-heading"><div><span className="eyebrow">This week</span><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} ranked</span></div>
    {status === 'loading' && <p className="state-message">Loading rankings...</p>}
    {status === 'error' && <p className="alert alert-danger">{error}</p>}
    {status === 'ready' && <div className="leaderboard-list">{entries.map((entry) => <article className="rank-row" key={entry._id || entry.id || entry.rank}><span className="rank-number">{String(entry.rank).padStart(2, '0')}</span><strong>{entry.userId?.username || entry.username || 'Athlete'}</strong><span className="points">{entry.points} pts</span></article>)}</div>}
  </section>
}

export default Leaderboard
