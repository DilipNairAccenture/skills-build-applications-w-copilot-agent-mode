import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="shell header-inner">
          <Link className="brand" to="/"><img src="/octofitapp-small.png" alt="" /> <span>OctoFit<span className="brand-accent">/</span>Tracker</span></Link>
          <nav className="app-nav" aria-label="Primary navigation">
            <NavLink to="/users">People</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/activities">Activity</NavLink>
            <NavLink to="/leaderboard">Ranking</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </div>
      </header>
      <main className="shell main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="shell app-footer">Train consistently. Recover deliberately.</footer>
    </>
  )
}

function Home() {
  return <section className="home-panel">
    <span className="eyebrow">Personal fitness, made social</span>
    <h1>Small efforts.<br /><em>Strong momentum.</em></h1>
    <p>Track your movement, find your people, and keep the next good choice close at hand.</p>
    <Link className="primary-action" to="/activities">View activity <span aria-hidden="true">↗</span></Link>
  </section>
}

export default App
