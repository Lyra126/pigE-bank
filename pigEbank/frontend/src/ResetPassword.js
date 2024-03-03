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
        if (password !== confPassword) {
            setErrorMessage("Passwords don't match, please try again.");
        } else {
            event.preventDefault();
            const email = document.cookie.split('; ').find(row => row.startsWith('tempEmail=')).split('=')[1];

            axios.put("/accounts/updatePassword", {email: email, password: password})
                .then(res => {
                    console.log(res);
                    navigate('/login'); // assuming `navigate` is defined and used for routing
                })
                .catch(err => console.log("ERROR - PASSWORD COULD NOT BE CHANGED FOR SOME UNFATHIMABLE REASON!"));
        }
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

                <div className='ResetPassword-bg d-flex flex-column vh-100 justify-content-center align-items-center'>
                    <div className='p-3 ResetPassword-box'>
                        <form onSubmit={handleSubmit} className="ResetPassword-form">
                            <h1 className="ResetPassword-title" style={{marginTop: 10}}>New Password</h1>
                            <p className="ResetPassword-5min-message">You have 5 minutes to reset your password!</p>
                            <div className='input-field'>
                                <label htmlFor='password'
                                       style={{
                                           marginLeft: 3,
                                           fontFamily: "DM_Sans-SemiBold"
                                        }}>Password</label>
                                <input type='password' placeholder='Enter Password' className='form-control'
                                       onChange={e => setPassword(e.target.value)} required
                                       pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$"/>
                                <p className="ResetPassword-instruction"> Password must include upper case, lower case,
                                    a number & a special character </p>
                            </div>
                            <div className='input-field'>
                                <label htmlFor='confPassword' style={{marginLeft: 3, fontFamily: "DM_Sans-SemiBold"}}>Re-enter
                                    Password</label>
                                <input type='password' placeholder='Confirm Password' className='form-control'
                                       onChange={e => setConfPassword(e.target.value)} required/>
                            </div>
                            <p style={{
                                fontSize: 14,
                                marginTop: 10,
                                color: "red",
                                textAlign: 'center',
                                visibility: errorMessage ? 'visible' : 'hidden',
                                marginBottom: -7
                            }}>{errorMessage}</p>
                            <button className='btn btn-success ResetPassword-button' style={{marginBottom: 10, marginTop: 20}}>Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


export default ResetPassword;
