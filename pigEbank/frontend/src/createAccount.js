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
        console.log("it's working");
        event.preventDefault();
        const user={firstName, lastName, username}
        console.log(user)

        if(password!=confPassword){
            setErrorMessage("Passwords don't match!");
        } else{


           //TODO: Set up the answers to be sent to the backend
           let securityQA = [securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3];

            axios.post("/accounts/newAccount", {firstName: firstName, lastName: lastName, username: username, password: password, email: email, numOfGoals: 0, securityQA: securityQA})
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

            <div className="createAccount-top-div">
            <h1 className="text-center mb-4" style={{ fontFamily: "Poppins-SemiBold", paddingTop: 10}}>Create Your Account</h1>
        <p className="text-center" style = {{paddingBottom: 17}}>We're excited to see you've joined us! <br/> Just a few more steps and you'll be a part of our Pig-E family!</p>
        
    <div className="createAccount-create-account-container">
        <form onSubmit={handleSubmit} className="createAccount-form-container">
            {/* Creating Account (main information) */}
            <div className = 'horizontal-div1'>
                <div className='createAccount-first-last-div'>
                    <div className='createAccount-name-container'>
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='firstName'>First Name</createAccount-label>
                            <input type='text'  style={{width: 165, marginRight: 20}} placeholder='Enter first name' className='form-control' onChange={e => setFirstName(e.target.value)} required />
                        </div>
            
                        <div className='createAccount-input-field'>
                            <createAccount-label htmlFor='lastName'>Last Name</createAccount-label>
                            <input type='text' style={{width: 165}} placeholder='Enter last name' className='form-control' onChange={e => setLastName(e.target.value)} required />
                        </div>
                    </div>

                    <createAccount-label htmlFor='email'>Email</createAccount-label>
                    <input type='text' style={{width: 350}}  placeholder='Enter your email' className='form-control' onChange={e => setEmail(e.target.value)} required />
               
                    <createAccount-label htmlFor='username'>Username</createAccount-label>
                    <input type='text' placeholder='Enter Username' style={{width: 350}} className='form-control' onChange={e => setUsername(e.target.value)} required pattern="[a-zA-Z0-9]{4,}" />
                    <p className="createAccount-instruction" style={{fontSize:11, marginTop: -6, marginLeft: 5}}>Username must be at least 4 characters & contain only letters and numbers</p>
              
                    <createAccount-label htmlFor='password'>Password</createAccount-label>
                    <input type='password'style={{width: 350}} placeholder='Enter Password' className='form-control' onChange={e => setPassword(e.target.value)} pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$" />
                    <p className="createAccount-instruction" style={{fontSize:11, marginTop: -6, marginLeft: 5}}>Password must include upper case, lower case, a number & a special character</p>
               
                    <createAccount-label htmlFor='confPassword'>Re-enter Password</createAccount-label>
                    <input type='password' style={{width: 350}} placeholder='Confirm Password' className='form-control' onChange={e => setConfPassword(e.target.value)} required />
                </div>
                
            </div>
            </form>
            {/* Security Questions */}
            <div className = 'horizontal-div2'>
                <div className='createAccount-security-questions-container'>
                    <div className='createAccount-security-question'>
                        <createAccount-label htmlFor='securityQuestion1'>Security Question 1</createAccount-label>
                        <select style={{width: 350}} id='securityQuestion1' value={securityQuestion1} onChange={e => setSecurityQuestion1(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input style={{width: 350}} type='text' placeholder='Response to Question 1' className='form-control' onChange={e => setSecurityAnswer1(e.target.value)} required />
                    </div>
                    <div className='createAccount-security-question'>
                        <createAccount-label htmlFor='securityQuestion2'>Security Question 2</createAccount-label>
                        <select style={{width: 350}} id='securityQuestion2' value={securityQuestion2} onChange={e => setSecurityQuestion2(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input type='text' style={{width: 350}} placeholder='Response to Question 2' className='form-control' onChange={e => setSecurityAnswer2(e.target.value)} required />
                    </div>
                    
                    <div className='createAccount-security-question'>
                        <createAccount-label htmlFor='securityQuestion3'>Security Question 3</createAccount-label>
                        <select style={{width: 350}} id='securityQuestion3' value={securityQuestion3} onChange={e => setSecurityQuestion3(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input style={{width: 350}} type='text' placeholder='Response to Question 3' className='form-control' onChange={e => setSecurityAnswer3(e.target.value)} required />
                    </div>

                </div>

            </div>
    </div>
            <p style={{ fontSize: 14, color: "red", textAlign: 'center', fontFamily: 'DM_Sans-Regular', visibility: errorMessage ? 'visible' : 'hidden', marginTop: -14 }}>{errorMessage}</p>
            <button onClick={handleSubmit} className='btn btn-success' style={{ marginTop: 50, width: 200, height: 50 }}>Create Account</button>
            <Link className='createAccount-alr-have-acc-btn' to='/login' style={{ display: 'block', width: 200, textAlign: 'center' }}>Already have an account?</Link>

        
        </div>
        </div>
    )
}

export default CreateAccount;

