import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section>
      <div className="section-heading">
        <div><span className="eyebrow">Community</span><h1>Members</h1></div>
        <span className="count-badge">{users.length} athletes</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading members...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'ready' && (
        <div className="data-grid">
          {users.map((user) => <article className="data-card" key={user._id || user.id || user.email}>
            <span className="avatar">{user.username?.slice(0, 1).toUpperCase()}</span>
            <div><h2>{user.username}</h2><p>{user.email}</p></div>
          </article>)}
        </div>
      )}
    </section>
  )
}

export default Users
