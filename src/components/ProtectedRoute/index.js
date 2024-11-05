import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('jwt_token');
  


  // Render the protected route if the token exists
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
