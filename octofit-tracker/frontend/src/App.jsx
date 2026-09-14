import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<h1>Welcome to OctoFit Tracker</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
