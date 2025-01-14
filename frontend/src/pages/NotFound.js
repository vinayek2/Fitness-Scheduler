import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return(
        <div>
            <h1> Page Not Found </h1>
            <p> the page you're looking for doesn't exist </p>
            <Link to="/">Go Back to Main </Link>
        </div>
    ); 
}

export default NotFound; 