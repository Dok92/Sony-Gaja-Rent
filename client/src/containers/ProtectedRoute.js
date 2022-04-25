import { useAppContext } from '../context/appContext'
import { Navigate, useLocation } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext()
  if (!user && location.pathname !== '/') {
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedRoute 
