import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Blog App
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
