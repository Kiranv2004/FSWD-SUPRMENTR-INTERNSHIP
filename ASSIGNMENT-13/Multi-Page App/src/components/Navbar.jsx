import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar({ isDarkMode, onToggleTheme, isAuthenticated, onToggleAuth }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={closeMenu}>
          NovaSphere
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-content ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </div>

          <div className="nav-actions">
            <button type="button" className="ghost-btn" onClick={onToggleTheme}>
              {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            <button type="button" className="primary-btn" onClick={onToggleAuth}>
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
