import React, { useState, useEffect } from 'react';
import './Login.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                const authenticatedUser = users.find(user => user.email === email && user.password === password);
                if (authenticatedUser) {
                    navigate('/dashboard');
                    document.cookie = `username=${authenticatedUser.username}`;
                    document.cookie = `email=${authenticatedUser.email}`
                } else {
                    setErrorMessage("Login failed. Invalid email or password.");
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
                <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}> Howdy! Great to see you again!</h1>
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
                            <label htmlFor='password' style={{ fontFamily: 'DM_Sans-Medium' }}>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} />
                            <Link to="/accountRecovery" style={{ objectPosition: "center", minWidth: 300 }}>Forgot Password</Link>
                        </div>
                        <div className='d-flex flex-column'>
                            <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300 }}>Login</button>
                            <p style={{ fontSize: 12, marginTop: 4, color: "red", textAlign: 'center', visibility: errorMessage ? 'visible' : 'hidden' }}>{errorMessage}</p>
                            <p style={{ marginTop: 20, marginLeft: 60, marginBottom: 5 }}>No account? Make one today!</p>
                            <Link to="/createAccount" className='btn btn-outline-success' style={{ objectPosition: "center", minWidth: 300 }}>Create an Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
