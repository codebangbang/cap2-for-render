import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This is my PrivateRoute component. It checks if the user is authenticated and if not, it redirects them to the login page. 

const PrivateRoute = ({ isAuthenticated, isadmin }) => {
  // console.debug("PrivateRoute.jsx", "isAuthenticated=", isAuthenticated, "isadmin=", isadmin);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Outlet />;
};

export default PrivateRoute;
