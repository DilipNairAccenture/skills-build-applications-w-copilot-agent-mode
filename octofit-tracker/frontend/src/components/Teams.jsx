import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .then(() => setStatus('ready'))
      .catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [])

  return <section>
    <div className="section-heading"><div><span className="eyebrow">Train together</span><h1>Teams</h1></div><span className="count-badge">{teams.length} squads</span></div>
    {status === 'loading' && <p className="state-message">Loading teams...</p>}
    {status === 'error' && <p className="alert alert-danger">{error}</p>}
    {status === 'ready' && <div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.id || team.name}><div className="team-mark">+</div><div><h2>{team.name}</h2><p>{team.members?.length || 0} members</p></div></article>)}</div>}
  </section>
}

export default Teams
