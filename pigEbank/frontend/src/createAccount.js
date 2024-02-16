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

        //To make sure another doesn't have the same username, should there be a function that checks before adding it into the database?
            //Problems w/ making unique usernames
                //Searching for a similar username can be a hassel bc of how capital and lowercase letters work
                //Putting the username in lowercase removes any captial letters a user may want -> iAmAUser vs iamauser
                    //Solution -> lowercase only or have another attribute for username or use unique emails instead
        axios.post("/accounts/newAccount", {firstName: firstName, lastName: lastName, username: username, password: password, numOfGoals: 0})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
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
                    <h1 className="text-center mb-4" style = {{marginTop: 20, fontFamily: "Poppins-SemiBold", paddingBottom: 10}}>Create Your Account</h1>
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
                            <p className = "instruction"> Username must be 4-10 characters long and must contain only letters and numbers </p>
                        </div>
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
                        <button className='btn btn-success'>Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
