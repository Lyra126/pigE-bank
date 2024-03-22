import React, { useState, useEffect } from 'react';
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
    const [securityAnswer1, setSecurityAnswer1] = useState('');
    const [securityAnswer2, setSecurityAnswer2] = useState('');
    const [securityAnswer3, setSecurityAnswer3] = useState('');
    const [securityQuestion1, setSecurityQuestion1] = useState('');
    const [securityQuestion2, setSecurityQuestion2] = useState('');
    const [securityQuestion3, setSecurityQuestion3] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/securityQs/allQuestions')
          .then(response => {
            setSecurityQuestions(response.data);
          })
          .catch(error => {
            console.error('Error fetching questions:', error);
          });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const user={firstName, lastName, username}
        console.log(user)

        if(password!=confPassword){
            setErrorMessage("Passwords don't match!");
        } else{

            var securityQA = [securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3];

            axios.post("/accounts/newAccount", {firstName: firstName, lastName: lastName, email: email, username: username, password: password, numOfGoals: 0, securityQA: securityQA})
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
                        {/* Dropdowns for security questions */}
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='securityQuestion1'>Security Question 1</createAccount-label>
                            <select id='securityQuestion1' value={securityQuestion1} onChange={e => setSecurityQuestion1(e.target.value)} className='form-control'>
                                <option value="">Choose a question</option>
                                
                                {securityQuestions.map((questionObj, index) => (
                                    <option key={index} value={questionObj.question}>{questionObj.question}</option>
                                ))}

                            </select>
                        </div>
                        
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='Question1'>Response to Question 1</createAccount-label>
                            <input type='securityQuestion' placeholder='Response to Question 1' className='form-control'
                                onChange={e => setSecurityAnswer1(e.target.value)} required/>
                        </div>
                        {/* Dropdowns for security questions */}
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='securityQuestion2'>Security Question 2</createAccount-label>
                            <select id='securityQuestion2' value={securityQuestion2} onChange={e => setSecurityQuestion2(e.target.value)} className='form-control'>
                                <option value="">Choose a question</option>
                                
                                {securityQuestions.map((questionObj, index) => (
                                    <option key={index} value={questionObj.question}>{questionObj.question}</option>
                                ))}

                            </select>
                        </div>
                        
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='Question2'>Response to Question 2</createAccount-label>
                            <input type='securityQuestion' placeholder='Response to Question 2' className='form-control'
                                onChange={e => setSecurityAnswer2(e.target.value)} required/>
                        </div>
                        {/* Dropdowns for security questions */}
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='securityQuestion3'>Security Question 3</createAccount-label>
                            <select id='securityQuestion3' value={securityQuestion3} onChange={e => setSecurityQuestion3(e.target.value)} className='form-control'>
                                <option value="">Choose a question</option>
                                
                                {securityQuestions.map((questionObj, index) => (
                                    <option key={index} value={questionObj.question}>{questionObj.question}</option>
                                ))}

                            </select>
                        </div>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='Question3'>Response to Question 3</createAccount-label>
                            <input type='securityQuestion' placeholder='Response to Question 3' className='form-control'
                                onChange={e => setSecurityAnswer3(e.target.value)} required/>
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
