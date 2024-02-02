import React, { useState } from 'react';
import './bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CreateAccount(){
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confPassword, confirmPassword] = useState(''); 

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/login', {firstName, lastName, username, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        //add data validation somewhere here
        //confirmPassword
        //checkmark to see if the username is available
        //check if requirement is met for password :password needs to be at least 8 characters
        //check if password and confPassword matches
    }
    
    return(
        <div className='d-flex vh-100 justify-content-center align-items-center bg-success'>
            <div className='p-3 bg-white w-50'>
                <h1 className="text-center">Create An Account</h1> {/* Centered h1 */}
                <form className="d-grid" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='firstName' placeholder='Enter your first name' className='form-control'
                        onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lastName'>Password</label>
                        <input type='lastName' placeholder='Enter your last name' className='form-control'
                        onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='username'>Username</label>
                        <input type='username' placeholder='Enter Username' className='form-control'
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confPassword'>Re-enter Password</label>
                        <input type='confPassword' placeholder='Confirm Password' className='form-control'
                        onChange={e => confirmPassword(e.target.value)}/>
                    </div>
                    <button className='btn btn-success mx-auto'>Create Account</button> {/* Centered button */}
                </form>
            </div>
        </div>
    )
}

export default CreateAccount;
