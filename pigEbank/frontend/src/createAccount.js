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
        const user={firstName, lastName, username}
        console.log(user)
        // axios.post('http://localhost:8080/user/add', {firstName, lastName, username, password })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        fetch('http://localhost:8080/user/add', {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        } ).then(()=>{
            console.log("New User Added")
        })
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
                        <a className="nav-link" href="Aboutus">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="Login">Login</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

        {/* Create Account Div */}
            <div className="top-div">
                <div className="create-account-container box_shadow">
                    <h1 className="text-center mb-4" style = {{marginTop: 20, fontFamily: "Poppins-SemiBold"}}>Create Your Account</h1>
                    <p className = "text-center" style = {{marginTop: -20}}>We're excited to see you've joined us!</p>
                    <p className = "text-center" style = {{marginTop: -15}}>Just a few more steps and you'll be apart of our Pig-E family!</p>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className='input-field'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text' placeholder='Enter your first name' className='form-control'
                                onChange={e => setFirstName(e.target.value)} required/>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' placeholder='Enter your last name' className='form-control'
                                onChange={e => setLastName(e.target.value)} required/>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' placeholder='Enter Username' className='form-control'
                                onChange={e => setUsername(e.target.value)} required pattern="[a-zA-Z0-9]{4,10}"/>
                            <p className = "instruction"> Please only enter letters and numbers! </p>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} required pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/>
                                <p className = "instruction"> Your password must include: upper case, lower case, a number, and a special character </p>
                        </div>
                        <div className='input-field'>
                            <label htmlFor='confPassword'>Re-enter Password</label>
                            <input type='password' placeholder='Confirm Password' className='form-control'
                                onChange={e => setConfPassword(e.target.value)} required/>
                        </div>
                        <button className='btn btn-success' >Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
