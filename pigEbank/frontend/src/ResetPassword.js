import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
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
        const email = document.cookie.split('; ').find(row => row.startsWith('tempEmail=')).split('=')[1];
        axios.put("/accounts/updatePassword", {email: email, password: password})
            .then(res => console.log(res))
            .catch(err => console.log(err));
            navigate('/login');
            document.cookie = 'tempEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
                <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}>New Password</h1>
                <div className='p-3 login_box'>
                    <form onSubmit={handleSubmit}>
                        {/* Logo Image */}
                        <img src="images/favicon.ico" alt="pig" className="login_piggy" />
                        <div className='input-field'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} required pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/>
                                <p className = "instruction"> Password must include upper case, lower case, a number, a special character, and must be at least 8 characters long </p>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='confPassword'>Re-enter Password</label>
                            <input type='password' placeholder='Confirm Password' className='form-control'
                                onChange={e => setConfPassword(e.target.value)} required/>
                        </div>
                        <p style={{ fontSize: 20, marginTop: 4, color: "red", textAlign: 'center', fontFamily: 'DM_Sans-SemiBold', visibility: errorMessage ? 'visible' : 'hidden' }}>{errorMessage}</p>
                        <button className='btn btn-success'>Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
