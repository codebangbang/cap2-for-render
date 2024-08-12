import React from 'react';
import { Link } from 'react-router-dom';

//  This is my Not Authorized Page component. It displays a message that the user is not authorized to view the page.

const NotAuthorizedPage = () => {
    return (
        <div className="not-authorized-page">
            <h1>403 - Forbidden - Not Authorized</h1>
            <p>You do not have access to this page. Scram. </p>
            <Link to="/">Go back to the homepage</Link>
        </div>
    );
}

export default NotAuthorizedPage;