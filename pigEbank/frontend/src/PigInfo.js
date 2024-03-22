import React, { useState, useEffect } from 'react';
import './PigInfo.css';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import confetti from 'canvas-confetti';
import Popup from 'react-popup'; // Import Popup component
import Prompt from './Prompt';

function ShootConfetti(){
    confetti({
        particleCount: 100,
        spread: 160,
        origin: { x: 0.4, y: 0.5}
    });
}
function PigInfo() {
    const { pigName } = useParams();
    const [timeToReachGoal, setTimeToReachGoal] = useState(0);
    const [showMessage, setShowMessage] = useState(false); // State to control message display

    const [goalName, setGoalName] = useState('');
    const [goalType, setGoalType] = useState('');
    const [stage, setStage] = useState('');
    const [currentSavings, setCurrentSavings] = useState(0);
    const [newSavings, setNewSavings] = useState(); // State for newSavings
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [creationDate, setCreationDate] = useState('');
    const [pigId, setPigID] = useState('');

    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const[progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [showPrompt, setShowPrompt] = useState(false); // State to control prompt display
    const navigate = useNavigate();

    useEffect(() => {
        if (!document.cookie) {
            navigate('/login');
            return;
        }
        const username = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
      
        axios.get('/accounts')
          .then(response => {
            const user = response.data.find(user => user.email === email);
            if (user) {
              axios.get('/accounts/getGoals/' + email)
                .then(res => {
                  const goals = res.data;
                  const filteredGoals = goals.filter(goal => goal.pigName === pigName); // Filter goals by pigName
                  if (filteredGoals.length > 0) {
                    const { goalName, goalType, stage, ownerEmail, currentSavings, savingsGoal, creation, id } = filteredGoals[0];
                    setGoalName(goalName);
                    setGoalType(goalType);
                    setStage(stage);
                    setCurrentSavings(currentSavings);
                    setSavingsGoal(savingsGoal);
                    setCreationDate(creation);
                    setProgress((currentSavings / savingsGoal) * 100);
                    setPigID(id);
                  }
                })
                .catch(err => console.log(err));
            }
          })
          .catch(error => {
            console.error('Error fetching number of goals:', error);
          });
      }, [pigName]); // Add pigName to the dependency array

    const location = useLocation();

    function calculateTimeToReachGoal(event) {
        event.preventDefault();
        setTimeToReachGoal(((goalAmount-currentSavings) / monthlyContribution).toFixed(2));
        setShowMessage(true); 
    }

    function clearVariablesAndMessage() {
        setCurrentSavings(0);
        setMonthlyContribution(0);
        setGoalAmount(0);
        setTimeToReachGoal(0);
        setShowMessage(false);
    }

    React.useEffect(() => {
        clearVariablesAndMessage();
    }, [location.pathname]);

    useEffect(() => {
        const newProgress = (currentSavings / savingsGoal) * 100;
        setProgress(newProgress);
    }, [currentSavings, savingsGoal]);    

    const openPopup = () => {
        setShowPrompt(true); // Set showPrompt state to true to display the prompt
    };

    const handlePromptClose = () => {
        setShowPrompt(false); // Set showPrompt state to false to hide the prompt
    };



    const handleGoalUpdate = (event) => {
        const newValue = parseInt(event);
        if (newValue.empty){
            alert("You have not entered a new value.");
        }
        if (newValue < 0) {
            setError('Value cannot be negative.');
        } else if (newValue === 0) {
            setError('You have not added new savings. Enter a value above 0.');
        } else if (newValue + currentSavings > savingsGoal) {
            window.alert("You've reached your goal of " + {goalAmount} + (currentSavings + newValue) - savingsGoal + " left over!!");
            setCurrentSavings(savingsGoal);
            setProgress((currentSavings / savingsGoal) * 100);
            setError('');
        } else {
            setCurrentSavings(currentSavings + newValue);
            setProgress((currentSavings / savingsGoal) * 100);
            ShootConfetti();

            axios.put("/goals/addToCurrentSavings?id=" + pigId + "&money="+ newValue)
            .then(res => console.log(res))
            .catch(err => console.log(err));

            setError(''); // Reset error message
        }

    };

    const logout = () => {
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/dashboard">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/createNewGoal">Create New Goal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
            <div className="PigInfo-container">
                {/* Top Row*/}
                <div className = "PigInfo-top-row">
                    {/* going back to dashboard button*/}
                    <div className="Pig-Info-db-button-div ">
                        <Link to="/dashboard" className='Pig-Info-db-button'>⬅</Link>
                    </div>
                {/* Div with Pig name*/}
                    <div className="PigInfo-pigName">
                         {/*Name tag*/}
                         <div className="hello-my-name-is">
                             <p style = {{color: "white", fontFamily: "Poppins-Regular", marginTop: "2px"}}>Hello! My name is </p>
                         </div>
                         <p style={{fontFamily: "Poppins-SemiBold", marginBottom: "1px", fontSize: "32px", marginTop: "-1px"}}>{pigName} </p>
                        <div></div>
                    </div>

                </div>

                {/*Main Row*/}
                <div className="PigInfo-middle-row">

                    {/*FIRST COLUMN, savings information*/}
                    <div className = "PigInfo-savings-information">
                        <div className="PigInfo-current-savings">
                        {/*Current savings*/}
                        {/*<h1>Savings</h1>*/}
                            <h2 style = {{marginBottom: "-10px"}}>You've saved:</h2>
                            <p>${currentSavings} </p>
                        </div>

                        {/* Updating savings */}
                        <div className = "PigInfo-update-savings">
                            <h2 style = {{marginBottom: -10}}>Add Savings</h2>
                            <div>
                                <input
                                    className='input-form PigInfo-input-form form-control'
                                    type="text"
                                    pattern="[0-9]*"
                                    value={newSavings}
                                    placeholder="Enter here!"
                                    onChange={e => setNewSavings(e.target.value)}
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button className="PigInfo-update-button" onClick={() => handleGoalUpdate(newSavings)}>Add New Savings</button>
                        </div>

                        {/*Calculator*/}
                        <div className = "PigInfo-calculator">
                            <h2>Calculator</h2>
                            <a data-tooltip-id="my-tooltip-click my-tooltip-children-multiline" className = "PigInfo-what-is-this" >What is this?</a>
                            <Tooltip className="message-css"
                                id="my-tooltip-click my-tooltip-children-multiline"
                                place="right"
                                offset={50}
                                events={['click']}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>We understand that knowing how long it'll take to save up for something can be </span>
                                    <span>confusing, so we made this calculator for your ease in mind!</span>
                                </div>
                            </Tooltip>
                            <form onSubmit={calculateTimeToReachGoal}>
                                    <div>
                                        {/*Input*/}
                                        <div>
                                        <div className="form-group PigInfo-form-input">
                                            <div className="form-group PigInfo-form-input">
                                                <label htmlFor="currentSavings">Current Savings:</label>
                                                <input
                                                    type="number"
                                                    id="currentSavings"
                                                    value={currentSavings}
                                                    className="form-control"
                                                />
                                            </div>
                                            <label htmlFor="goalAmount">Goal Amount:</label>
                                            <input
                                                type="number"
                                                id="goalAmount"
                                                placeholder={savingsGoal}
                                                value={goalAmount}
                                                onChange={e => setGoalAmount(parseFloat(e.target.value))}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group PigInfo-form-input">
                                            <label htmlFor="monthlyContribution">Monthly Contribution:</label>
                                            <input
                                                type="number"
                                                id="monthlyContribution"
                                                value={monthlyContribution}
                                                onChange={e => setMonthlyContribution(parseFloat(e.target.value))}
                                                className="form-control"
                                            />
                                        </div>
                                        </div>
                                        <div className="PigInfo-btn-group">
                                        {/*Buttons*/}
                                            <button type="button" className="PigInfo-btn-calculate" onClick={clearVariablesAndMessage}>Clear</button>
                                            <button type="submit" className="PigInfo-btn-calculate" data-tooltip-id="my-tooltip-click">Calculate</button>
                                            <Tooltip className="message-css-green"
                                                place = "top-end"
                                                id="my-tooltip-click"
                                                events={['click']}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span>It'll take approximately {timeToReachGoal} months to reach your goal!</span>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                            </form>
                        </div>

                    </div>


                    {/*pig image and percentage bar*/}
                    <div className="PigInfo-image-percentageBar">
                        <img src="/images/piggies/education/education_5.png" alt="pig" className = "PigInfo-pig-image"/>
                        <div className="progress" style={{ height: '40px' }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                {progress.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div className="PigInfo-piggyBank-information">
                        {/*Pig information*/}
                        <div className = "PigInfo-pig-info">
                            <h3 style = {{fontFamily: "DM_Sans-SemiBold"}}>Pig Information</h3>
                            <p style={{fontFamily: "DM_Sans-Medium"}}>Stage: {stage} </p>
                        </div>
                        {/*More information about savings*/}
                        <div className="PigInfo-more-savings-info">
                            <p style={{fontFamily: "DM_Sans-Medium"}}>Savings Goal: ${savingsGoal} </p>
                            <p style={{fontFamily: "DM_Sans-Medium", marginBottom: "1px"}}>Type: {goalType} </p>
                            <p style={{fontFamily: "DM_Sans-Medium",  marginBottom: "1px", marginTop: "-5px"}}>Goal Name: {goalName} </p>
                            <p style={{fontFamily: "DM_Sans-Medium"}}>Creation Date: {creationDate} </p>
                        </div>
                        <button className="popup-button" onClick={openPopup}>Edit Goal</button>

                        {/* Render the prompt if showPrompt is true */}
                        {showPrompt && (
                            <Prompt
                            onClose={handlePromptClose}
                            onChange={(values) => {
                                console.log('Pig Name:', values.pigName);
                                console.log('Goal Name:', values.goalName);
                                console.log('Goal Amount:', values.goalAmount);
                                handlePromptClose(); // Close the prompt after handling the values
                            }}
                            />                        
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PigInfo;