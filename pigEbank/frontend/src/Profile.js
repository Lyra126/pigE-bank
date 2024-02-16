import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
    // Assuming you might have some state variables like username, password, totalCurrency, totalPigs
    const [username, setUsername] = useState('Piggy');
    const [password, setPassword] = useState('1234');
    const [showPassword, setShowPassword] = useState(false);
    const [totalCurrency, setTotalCurrency] = useState(100);
    const [totalPigs, setTotalPigs] = useState(100);
    const [accountCreationDate, setCreationDate] = useState('Feb 8th');

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Pig E-Bank</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"> Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
                <div className="container-fluid bg-white py-4"> 
                    <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}>Welcome Back {username}!</h1>
                    <div className='p-3'>
                        <p>Username: {username}</p>
                        
                        <div className='mb-3'>
                            <p>Password: {showPassword ? password : '********'}</p>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300 }} onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide Password' : 'Show Password'}
                            </button>
                        </div>
                        
                    </div>
                </div>

                <br/>
                <div className="container-fluid bg-white py-4"> 
                    <div className='mb-3'>
                        <p>Total Currency: {totalCurrency}</p>
                        <p>Total Pigs: {totalPigs}</p>
                        <p>Creation Date: {accountCreationDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
