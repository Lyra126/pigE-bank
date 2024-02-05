import React, { useState } from 'react';
import axios from 'axios';
import './createAccount.css'; // Import CSS file for custom styles

function CreateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Add data validation and other checks here
        axios.post('http://localhost:8081/createAccount', { firstName, lastName, username, password })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home Page</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="Login">Login</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <div className="top-div gradient_bg_green">
                <div className="create-account-container">
                    <h1 className="text-center mb-4">Create An Account</h1>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className='input-field'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text' placeholder='Enter your first name' className='form-control'
                                onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' placeholder='Enter your last name' className='form-control'
                                onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' placeholder='Enter Username' className='form-control'
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='input-field'>
                            <label htmlFor='confPassword'>Re-enter Password</label>
                            <input type='password' placeholder='Confirm Password' className='form-control'
                                onChange={e => setConfPassword(e.target.value)} />
                        </div>
                        <button className='btn btn-success'>Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
