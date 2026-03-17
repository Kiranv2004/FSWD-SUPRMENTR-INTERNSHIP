import { Navigate } from 'react-router-dom'

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ message: 'Please log in to access dashboard.' }} />
  }

  return children
}

export default ProtectedRoute
