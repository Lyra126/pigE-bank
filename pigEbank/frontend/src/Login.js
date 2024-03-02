import React, { useState, useEffect } from 'react';
import './Login.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [cooldown, setCooldown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
        }, 30000); // Hides the error message after 30 seconds

        return () => clearTimeout(timer);
    }, [errorMessage]);

    const showWelcomeBanner = (username) => {
        notification.open({
            message: `Welcome back, ${username}!`,
            duration: 3, // Duration in seconds
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (cooldown) {
            setErrorMessage('You have exceeded the maximum number of failed attempts. Please try again later.');
            return;
        }
        axios.get('/accounts')
            .then(response => {
                const users = response.data;
                const authenticatedUser = users.find(user => user.email === email && user.password === password);
                if (authenticatedUser) {
                    navigate('/dashboard');
                    document.cookie = `username=${authenticatedUser.username}`;
                    document.cookie = `email=${authenticatedUser.email}`;
                     showWelcomeBanner(authenticatedUser.username);
                } else {
                    setFailedAttempts(prevAttempts => prevAttempts + 1);
                    if (failedAttempts > 3) {
                        setCooldown(true);
                        setTimeout(() => {
                            setCooldown(false);
                            setFailedAttempts(0);
                        }, 300000); // 5 minutes cooldown
                    }
                    setErrorMessage("Login failed. Invalid email or password.");
                }
            })
            .catch(error => {
                setErrorMessage("Login failed. Invalid email or password.");
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

            <div className='login-main-div'>
                <h1 className="p-8 text-center login-title-message"> Howdy! Great to see you again!</h1>
                <div className='p-3 login-box'>
                    <form onSubmit={handleSubmit} className="login-form-container">
                        {/* Logo Image */}
                        <div style = {{display: "flex", justifyContent: "center"}}>
                        <img src="images/favicon.ico" alt="pig" className="login-piggy"/>
                        </div>
                            <div className='mb-3'>
                            <login-label htmlFor='email'>Email</login-label>
                            <input type='email' placeholder='Enter Email' className='form-control'
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <login-label htmlFor='password'>Password</login-label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} />
                            <Link to="/accountRecovery" className = 'login-forgot-pass'>Forgot your password?</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300, marginTop: 3}}>Login</button>
                            <p style={{ fontSize: 14, marginTop: 10, color: "red", textAlign: 'center', visibility: errorMessage ? 'visible' : 'hidden' }}>{errorMessage}</p>
                            <p className = 'login-no-account-label'>No account? Make one today!</p>
                            <Link to="/createAccount" className='btn btn-outline-success' style={{ objectPosition: "center", minWidth: 300 }}>Create an Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
