import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Intro to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components. It uses JSX syntax to describe what the UI should look like and efficiently updates the DOM when data changes. React components can be functional components or class components, with functional components being more popular due to hooks.'
  },
  {
    id: 2,
    title: 'Hooks Guide',
    description: 'Learn hooks',
    content: 'React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState for managing state, useEffect for side effects, useContext for context API, and useParams for accessing route parameters. Hooks make it easier to share logic between components and write cleaner code.'
  },
  {
    id: 3,
    title: 'Routing in React',
    description: 'React Router',
    content: 'React Router DOM is a library that enables client-side routing in React applications. It allows you to create single-page applications with multiple views without full page refreshes. The library provides components like BrowserRouter, Routes, Route, Link, and useParams to handle navigation and dynamic routing based on URL parameters.'
  }
];

function Blogs() {
  return (
    <div className="blogs-container">
      <h1>Our Blogs</h1>
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p className="description">{blog.description}</p>
            <Link to={`/blog/${blog.id}`} className="btn btn-secondary">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
