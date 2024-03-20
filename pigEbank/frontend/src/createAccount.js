import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import axios from 'axios';
import './createAccount.css';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const user={firstName, lastName, username}
        console.log(user)

        if(password!=confPassword){
            setErrorMessage("Passwords don't match!");
        } else{

            //To make sure another doesn't have the same username, should there be a function that checks before adding it into the database?
                //Problems w/ making unique usernames
                    //Searching for a similar username can be a hassel bc of how capital and lowercase letters work
                    //Putting the username in lowercase removes any captial letters a user may want -> iAmAUser vs iamauser
                        //Solution -> lowercase only or have another attribute for username or use unique emails instead
            axios.post("/accounts/newAccount", {firstName: firstName, lastName: lastName, username: username, password: password, numOfGoals: 0})
                .then(res => {
                    console.log(res);       
                    document.cookie = `username=${username}`;  
                    document.cookie = `email=${email}`           
                    navigate('/dashboard');
                    confetti({
                        particleCount: 500,
                        spread: 100,
                        origin: { x: 0.4, y: 0.5 },

                    });
                })
                .catch(err => console.log(err));    
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
                        <a className="nav-link" href="Aboutus">About Us</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

        {/* Create Account Div */}
            <div className="createAccount-top-div">
                <div className="createAccount-create-account-container box_shadow">
                    <h1 className="text-center mb-4" style = {{marginTop: 20, fontFamily: "Poppins-SemiBold", paddingBottom: 10}}>Create Your Account</h1>
                    <p className = "text-center" style = {{marginTop: -20}}>We're excited to see you've joined us!</p>
                    <p className = "text-center" style = {{marginTop: -15, paddingBottom: 19}}>Just a few more steps and you'll be apart of our Pig-E family!</p>
                    <form onSubmit={handleSubmit} className="createAccount-form-container">
                        <div className = 'createAccount-first-last-div'>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='firstName'>First Name</createAccount-label>
                            <input type='text' placeholder='Enter your first name' className='form-control'
                                onChange={e => setFirstName(e.target.value)} required/>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='lastName'>Last Name</createAccount-label>
                            <input type='text' placeholder='Enter your last name' className='form-control'
                                onChange={e => setLastName(e.target.value)} required/>
                        </div>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='email'>Email</createAccount-label>
                            <input type='text' placeholder='Enter your email' className='form-control'
                                onChange={e => setEmail(e.target.value)} required/>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='username'>Username</createAccount-label>
                            <input type='text' placeholder='Enter Username' className='form-control'
                                onChange={e => setUsername(e.target.value)} required pattern="[a-zA-Z0-9]{4,}"/>
                            <p className = "createAccount-instruction"> Username must be at least 4 characters & contain only letters and numbers </p>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='password'>Password</createAccount-label>
                            <input type='password' placeholder='Enter Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$"/>
                                <p className = "createAccount-instruction"> Password must include upper case, lower case, a number & a special character</p>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='confPassword'>Re-enter Password</createAccount-label>
                            <input type='password' placeholder='Confirm Password' className='form-control'
                                onChange={e => setConfPassword(e.target.value)} required/>
                        </div>
                        <p style={{fontSize: 14, color: "red", textAlign: 'center', fontFamily: 'DM_Sans-Regular', visibility: errorMessage ? 'visible' : 'hidden', marginTop: -14}}>{errorMessage}</p>
                        <button className='btn btn-success' style = {{marginTop: -17}}>Create Account</button>
                        <Link className='createAccount-alr-have-acc-btn' to='/login' style = {{marginTop: -12}}>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
