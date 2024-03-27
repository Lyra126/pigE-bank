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

            <div className="createAccount-top-div">
            <h1 className="text-center mb-4" style={{ fontFamily: "Poppins-SemiBold"}}>Create Your Account</h1>
        <p className="text-center" >We're excited to see you've joined us! <br/> Just a few more steps and you'll be a part of our Pig-E family!</p>
        
    <div className="createAccount-create-account-container">
        <form onSubmit={handleSubmit} className="createAccount-form-container">
            <div className = 'horizontal-di1'>
                <div className='createAccount-first-last-div'>
                
                    <div className='createAccount-name-container'>
                        <div className='createAccount-input-field'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type='text'  style={{width: 200, marginRight: 20 }}placeholder='Enter your first name' className='form-control' onChange={e => setFirstName(e.target.value)} required />
                        </div>
            
                        <div className='createAccount-input-field'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type='text' style={{width: 200}} placeholder='Enter your last name' className='form-control' onChange={e => setLastName(e.target.value)} required />
                        </div>
                    </div>

                    <label htmlFor='email'>Email</label>
                    <input type='text'  style={{width: 420}}placeholder='Enter your email' className='form-control' onChange={e => setEmail(e.target.value)} required />
               
                    <label htmlFor='username'>Username</label>
                    <input type='text' style={{width: 420}} placeholder='Enter Username' className='form-control' onChange={e => setUsername(e.target.value)} required pattern="[a-zA-Z0-9]{4,}" />
                    <p className="createAccount-instruction" style={{fontSize:11}}>Username must be at least 4 characters & contain only letters and numbers</p>
              
                    <label htmlFor='password'>Password</label>
                    <input type='password'  style={{width: 420}}placeholder='Enter Password' className='form-control' onChange={e => setPassword(e.target.value)} pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$" />
                    <p className="createAccount-instruction" style={{fontSize:11}}>Password must include upper case, lower case, a number & a special character</p>
               
                    <label htmlFor='confPassword'>Re-enter Password</label>
                    <input type='password'  style={{width: 420}} placeholder='Confirm Password' className='form-control' onChange={e => setConfPassword(e.target.value)} required />
                </div>
                
            </div>
            </form>
            {/* Security Questions */}
            <div className = 'horizontal-div2'>
                <div className='createAccount-security-questions-container'>
                    <div className='createAccount-security-question'>
                        <label htmlFor='securityQuestion1'>Security Question 1</label>
                        <select id='securityQuestion1' value={securityQuestion1} onChange={e => setSecurityQuestion1(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input type='text' placeholder='Response to Question 1' className='form-control' onChange={e => setSecurityAnswer1(e.target.value)} required />
                    </div>
                    <div className='createAccount-security-question'>
                        <label htmlFor='securityQuestion2'>Security Question 2</label>
                        <select id='securityQuestion2' value={securityQuestion2} onChange={e => setSecurityQuestion2(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input type='text' placeholder='Response to Question 2' className='form-control' onChange={e => setSecurityAnswer2(e.target.value)} required />
                    </div>
                    
                    <div className='createAccount-security-question'>
                        <label htmlFor='securityQuestion3'>Security Question 3</label>
                        <select id='securityQuestion3' value={securityQuestion3} onChange={e => setSecurityQuestion3(e.target.value)} className='form-control'>
                            <option value="">Choose a question</option>
                            {securityQuestions.map((questionObj, index) => (
                                <option key={index} value={questionObj.question}>{questionObj.question}</option>
                            ))}
                        </select>
                        <div style={{ margin: '10px 0' }} />
                        <input type='text' placeholder='Response to Question 3' className='form-control' onChange={e => setSecurityAnswer3(e.target.value)} required />
                    </div>
                </div>
                </div>
            
            </div>
            <p style={{ fontSize: 14, color: "red", textAlign: 'center', fontFamily: 'DM_Sans-Regular', visibility: errorMessage ? 'visible' : 'hidden', marginTop: -14 }}>{errorMessage}</p>
            <button className='btn btn-success' style={{ marginTop: 50, width: 200, height: 50 }}>Create Account</button>
            <Link className='createAccount-alr-have-acc-btn' to='/login' style={{ display: 'block', width: 200, textAlign: 'center' }}>Already have an account?</Link>

        
        </div>
        </div>
    )
}

export default CreateAccount;
