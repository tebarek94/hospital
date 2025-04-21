import { Navigate } from 'react-router-dom';
import { useAuth } from './component/hooks/useAuth';

export const ProtectedRoute = ({ children, requiredProfession }) => {
  const { isAuthenticated, userProfession } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredProfession && userProfession.toLowerCase() !== requiredProfession.toLowerCase()) {
    return <Navigate to={`/${userProfession.toLowerCase()}/dashboard`} replace />;
  }

  return children;
};