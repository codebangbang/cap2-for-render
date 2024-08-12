import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This is my AdminRoute component. It checks if the user is an admin and if not, it redirects them to the not-authorized page.

const AdminRoute = ({ isadmin }) => {
    // console.debug("AdminRoute.jsx", "isadmin=", isadmin);

    if (!isadmin) {
        return <Navigate to="/not-authorized" />;
    }

    return <Outlet />;
};

export default AdminRoute;