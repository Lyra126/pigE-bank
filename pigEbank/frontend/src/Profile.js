import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [numberOfGoals, setNumberOfGoals] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [totalCurrency, setTotalCurrency] = useState('0');
    const [accountCreationDate, setCreationDate] = useState('');
    const [email, setEmail]  = useState('');
    const navigate = useNavigate();

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (!document.cookie) {
            navigate('/login');
            return;
        }
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];

        axios.put("/accounts/updateTotalSavings", {email: email})
            .then(res => console.log(res))
            .catch(err => console.log(err));

        axios.get('/accounts')
            .then(response => {
                const user = response.data.find(user => user.email === email);
                if (user) {
                    setUsername(user.username);
                    setPassword(user.password);
                    setNumberOfGoals(user.numOfGoals);
                    setCreationDate(user.creation);
                    setEmail(user.email);
                    setTotalCurrency(user.totalSavings)
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const logout = () => {
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">Pig E-Bank</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"> Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
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
                    <p>Email: {email}</p>

                        
                        <div className='mb-3'>
                            <p>Password: {showPassword ? (password) : '********'}</p>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300 }} onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide Password' : 'Show Password'}
                            </button>
                            <Link to="/settings" style={{ objectPosition: "center", minWidth: 300 }}>Settings</Link>
                        </div>
                        
                    </div>
                </div>

                <br/>
                <div className="container-fluid bg-white py-4"> 
                    <div className='mb-3'>
                        <p>Total Currency: {totalCurrency}</p>
                        <p>Total Number of Goals: {numberOfGoals}</p>
                        <p>Creation Date: {accountCreationDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
