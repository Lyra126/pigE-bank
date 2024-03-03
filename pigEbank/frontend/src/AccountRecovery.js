import React, { useState, useEffect } from 'react';
import './AccountRecovery.css';
import './bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountRecovery() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
        }, 30000); // Hides the error message after 30 seconds

        return () => clearTimeout(timer);
    }, [errorMessage]);

    function handleSubmit(event) {
        event.preventDefault();

        axios.get('/accounts')
            .then(response => {
                const users = response.data;
                const authenticatedUser = users.find(user => user.email === email && user.username === username);
                if (authenticatedUser) {
                    navigate('/resetPassword');

                    var experationDate = new Date();
                    var experation = experationDate.getTime() + (5 * 60 * 1000);
                    experationDate.setTime(experation);

                    document.cookie = 'tempEmail=' + authenticatedUser.email + '; expires=' + experationDate.toUTCString() +'; path=/;';
                } else {
                    setErrorMessage("Invalid email and/or username.");
                }
            })
            .catch(error => {
                setErrorMessage("An error occurred while fetching user data. Please try again later.");
            });

    }

    return (
        <div className="AccountRecovery-bg">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="aboutus">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home Page</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='d-flex flex-column vh-100 justify-content-center align-items-center' style = {{marginTop: -50}}>
                <div className='p-3 AccountRecovery-box'>
                    <div className="AccountRecovery-title-header-div">
                    <h1 className="AccountRecovery-title-message" style={{ marginTop: 10 }}>Forgot your password?</h1>
                    <p className="AccountRecovery-header-message"> No worries! Just type in your account's username and email and you'll be prompted to change your password!</p>
                    </div>
                        <form onSubmit={handleSubmit} className = "AccountRecovery-form">
                        {/* Logo Image */}
                        <img src="images/favicon.ico" alt="pig" className="AccountRecovery-piggy image-center"/>
                        <div className='mb-3'>
                            <label htmlFor='email' style={{ fontFamily: 'DM_Sans-SemiBold', marginLeft: 3}}>Email</label>
                            <input type='email' placeholder='Enter Email' className='form-control'
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='username' style={{ fontFamily: 'DM_Sans-SemiBold', marginLeft: 3}}>Username</label>
                            <input type='username' placeholder='Enter Username' className='form-control'
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='d-flex flex-column'>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300 }}>Find account</button>
                            <p style={{ fontSize: 14, marginTop: 10, color: "red", textAlign: 'center', visibility: errorMessage ? 'visible' : 'hidden', marginBottom: 3}}>{errorMessage}</p>
                        </div>
                    </form>
                </div>
            </div>
            <footer style = {{marginTop: -75}}>
                <p>&copy; 2024 Pig E-Bank</p>
            </footer>
        </div>
    )
}

export default AccountRecovery;
