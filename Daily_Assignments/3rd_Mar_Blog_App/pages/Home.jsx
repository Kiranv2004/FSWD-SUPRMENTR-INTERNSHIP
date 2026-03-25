import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our Blog</h1>
        <p>
          Explore our collection of articles about React, web development, and modern programming practices.
        </p>
        <Link to="/blogs" className="btn btn-primary">
          Read Our Blogs
        </Link>
      </div>
    </div>
  );
}

export default Home;
