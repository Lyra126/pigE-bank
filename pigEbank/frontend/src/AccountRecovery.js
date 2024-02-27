import React, { useState, useEffect } from 'react';
import './AccountRecovery.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
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
                    document.cookie = `tempEmail=${authenticatedUser.email}`
                } else {
                    setErrorMessage("Invalid Email and/or username");
                }
            })
            .catch(error => {
                setErrorMessage("An error occurred while fetching user data. Please try again later.");
            });
    }

    return (
        <div>
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

            <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
                <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}>Account Recovery</h1>
                <div className='p-3 login_box'>
                    <form onSubmit={handleSubmit}>
                        {/* Logo Image */}
                        <img src="images/favicon.ico" alt="pig" className="login_piggy" />
                        <div className='mb-3'>
                            <label htmlFor='email' style={{ fontFamily: 'DM_Sans-Medium' }}>Email</label>
                            <input type='email' placeholder='Enter Email' className='form-control'
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='username' style={{ fontFamily: 'DM_Sans-Medium' }}>Username</label>
                            <input type='username' placeholder='Enter Username' className='form-control'
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='d-flex flex-column'>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300 }}>Find account</button>
                            <p style={{ fontSize: 12, marginTop: 4, color: "red", textAlign: 'center', visibility: errorMessage ? 'visible' : 'hidden' }}>{errorMessage}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountRecovery;
