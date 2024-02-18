import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Send a request to the server to verify the token
                await axios.get('/verifyToken');
                setLoading(false);
                setAuthenticated(true);
            } catch (error) {
                // If the token is not valid or expired, set authenticated to false
                setLoading(false);
                setAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    // If the user is authenticated, render the dashboard page
    if (authenticated) {
        return <Redirect to="/dashboard" />;
    }

    // If the user is not authenticated, render the login page
    return <Redirect to="/login" />;
}

export default ProtectedRoute;
