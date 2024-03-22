import React, { useState, useEffect } from 'react';
import './SecurityQuestions.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SecurityQuestions() {
    const [sQA, setSQA] = useState([]);
    const [securityAnswer1, setSecurityAnswer1] = useState('');
    const [securityAnswer2, setSecurityAnswer2] = useState('');
    const [securityAnswer3, setSecurityAnswer3] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const email = document.cookie.split('; ').find(row => row.startsWith('tempEmail=')).split('=')[1];

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
        }, 30000); // Hides the error message after 30 seconds

        
        var url = '/accounts/getQAs/' + email;

        console.log(url);
        axios.get(url)
          .then(response => {
            setSQA(response.data);
          })
          .catch(error => {
            console.error('Error fetching questions:', error);
          });

        return () => clearTimeout(timer);
    }, [errorMessage]);

    useEffect(() => {
        const timer2 = setTimeout(() => {
            navigate('/');
        }, (5 * 60 * 1000));

        return () => clearTimeout(timer2);
    })

    

    function handleSubmit(event) {
        event.preventDefault();
        console.log(securityAnswer1, securityAnswer2, securityAnswer3);

        if(securityAnswer1 == sQA[1] && securityAnswer2 == sQA[3] && securityAnswer3 == sQA[5]){

            var experationDate = new Date();
            var experation = experationDate.getTime() + (5 * 61 * 1000);
            experationDate.setTime(experation);
            document.cookie = 'tempEmail=' + email + '; expires=' + experationDate.toUTCString() +'; path=/;';

            navigate('/resetPassword');
        } else {
            setErrorMessage("At least one response is incorrect");
        }

        console.log(email);
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

                <div className='SecurityQuestions-bg d-flex flex-column vh-100 justify-content-center align-items-center'>
                    <div className='p-3 SecurityQuestions-box'>
                        <form onSubmit={handleSubmit} className="SecurityQuestions-form">
                            <h1 className="SecurityQuestions-title" style={{marginTop: 10}}>Security Questions</h1>
                            <p className="SecurityQuestions-5min-message">You have 5 minutes to enter your answers!</p>
                           
                            <div className='input-field'>
                                <label htmlFor='response1'
                                       style={{
                                           marginLeft: 3,
                                           fontFamily: "DM_Sans-SemiBold"
                                        }}>{sQA[0]}</label>
                                <input type='response1' placeholder='Enter Response to Question 1' className='form-control'
                                onChange={e => setSecurityAnswer1(e.target.value)} required/>

                            </div>

                            <div className='input-field'>
                                <label htmlFor='response2'
                                       style={{
                                           marginLeft: 3,
                                           fontFamily: "DM_Sans-SemiBold"
                                        }}>{sQA[2]}</label>
                                <input type='response2' placeholder='Enter Response to Question 2' className='form-control'
                                onChange={e => setSecurityAnswer2(e.target.value)} required/>
                            </div>

                            <div className='input-field'>
                                <label htmlFor='response3'
                                       style={{
                                           marginLeft: 3,
                                           fontFamily: "DM_Sans-SemiBold"
                                        }}>{sQA[4]}</label>
                                <input type='response3' placeholder='Enter Response to Question 3' className='form-control'
                                 onChange={e => setSecurityAnswer3(e.target.value)} required/>
                            </div>

                            <p style={{
                                fontSize: 14,
                                marginTop: 10,
                                color: "red",
                                textAlign: 'center',
                                visibility: errorMessage ? 'visible' : 'hidden',
                                marginBottom: -7
                            }}>{errorMessage}</p>
                            <button className='btn btn-success SecurityQuestions-button' style={{marginBottom: 10, marginTop: 20}}>Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


export default SecurityQuestions;
