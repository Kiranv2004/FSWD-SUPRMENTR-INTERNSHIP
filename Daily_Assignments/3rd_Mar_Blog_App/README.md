# React Blog App

A modern React blog application built with JSX, functional components, and React Router DOM.

## Features

- **React Functional Components**: All components use functional components with React Hooks
- **React Router DOM**: Client-side routing with dynamic blog routes
- **JSX Syntax**: Clean and semantic JSX markup throughout
- **Responsive Design**: Mobile-friendly CSS styling
- **Static Blog Data**: Pre-populated blog data with multiple articles
- **Dynamic Routing**: Individual blog pages with URL parameters using `useParams`

## Project Structure

```
├── App.jsx                    # Main application component with routing
├── main.jsx                   # Entry point
├── vite.config.js            # Vite configuration
├── index.html                # HTML template
├── styles.css                # Global styles
├── package.json              # Project dependencies
├── components/
│   └── Navbar.jsx            # Navigation component with links
├── pages/
│   ├── Home.jsx              # Home page
│   ├── Blogs.jsx             # Blogs listing page
│   ├── BlogDetails.jsx       # Individual blog detail page
│   └── NotFound.jsx          # 404 error page
└── .gitignore
```

## Installation

1. Navigate to the project directory:
```bash
cd 3rd_Mar_Blog_App
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Routes

- `/` - Home page with welcome message
- `/blogs` - Browse all blog posts
- `/blog/:id` - View individual blog post (dynamic route)
- `*` - 404 Not Found page

## Components

### Navbar
Navigation component with links to Home and Blogs pages. Sticky positioning for easy access.

### Home
Hero section welcoming users with a call-to-action button linking to the blogs page.

### Blogs
Displays all blog posts in a responsive grid layout with cards showing title, description, and a "Read More" button.

### BlogDetails
Shows the full content of a selected blog post. Uses `useParams()` to get the blog ID from the URL and displays the matching blog content.

### NotFound
404 error page for routes that don't exist.

## Blog Data Structure

Each blog contains:
- `id`: Unique identifier
- `title`: Blog post title
- `description`: Short description
- `content`: Full blog post content

## Technologies Used

- **React 18**: UI library
- **React Router DOM 6**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS3**: Styling with responsive design

## Styling

The application uses modern CSS with:
- Flexbox for layouts
- CSS Grid for responsive blog cards
- Gradient backgrounds
- Smooth transitions and hover effects
- Mobile-responsive design

## Key Features

1. **JSX Only**: No class components, entirely functional components
2. **React Hooks**: Uses `useState` (if needed) and `useParams` for route parameters
3. **Dynamic Routing**: Blog posts load dynamically based on URL ID
4. **Error Handling**: Shows "Blog Not Found" if invalid blog ID is accessed
5. **Clean Code**: Semantic HTML tags and well-organized structure

## Future Enhancements

- Add search functionality
- Implement blog filtering by categories
- Add comments section
- Database integration
- User authentication
- Edit/Delete blog functionality

---

Created as part of the Full Stack Web Development Internship (March 3rd Assignment)
