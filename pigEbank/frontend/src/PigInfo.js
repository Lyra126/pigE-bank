import React, { useState, useEffect } from 'react';
import './PigInfo.css';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import confetti from 'canvas-confetti';
import Prompt from './Prompt';
import { TiChevronLeft } from "react-icons/ti";

function ShootConfetti(){
    confetti({
        particleCount: 100,
        spread: 160,
        origin: { x: 0.5, y: 0.5}
    });
}
function PigInfo() {
    const { pigName } = useParams();
    const [timeToReachGoal, setTimeToReachGoal] = useState(0);
    const [showMessage, setShowMessage] = useState(false)
    const [goalName, setGoalName] = useState('');
    const [goalType, setGoalType] = useState('');
    const [stage, setStage] = useState('');
    const [currentSavings, setCurrentSavings] = useState(0);
    const [newSavings, setNewSavings] = useState(); // State for newSavings
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [creationDate, setCreationDate] = useState('');
    const [pigId, setPigId] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const[progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [showPrompt, setShowPrompt] = useState(false); // State to control prompt display
    const navigate = useNavigate();
    const [goalImage, setGoalImage] = useState('');
    const [email_n, setEmail] = useState('');

    useEffect(() => {
        if (!document.cookie) {
            navigate('/login');
            return;
        }
        const email = (document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1]);
        setEmail(email);
        axios.get('/accounts')
          .then(response => {
            const user = response.data.find(user => user.email === email);
            if (user) {

              axios.get('/accounts/getGoals/' + email)
                .then(res => {
        
                  const goals = res.data;
                  const filteredGoals = goals.filter(goal => goal.pigName === pigName); // Filter goals by pigName
                  if (filteredGoals.length > 0) {
                    const {goalName, goalType, stage, currentSavings, savingsGoal, creation} = filteredGoals[0];
                    setGoalName(goalName);
                    setGoalType(goalType);
                    setStage(stage);
                    setCurrentSavings(currentSavings);
                    setSavingsGoal(savingsGoal);
                    setCreationDate(creation);
                    setProgress((currentSavings / savingsGoal) * 100);
                    setGoalImage("/images/piggies/" + goalType + "/" + goalType + "_" + stage + ".png");
                    console.log(goalImage);
                }

                    axios.get('/goals/getGoalId?pigName=' + pigName + "&ownerEmail=" + email)
                    .then(response => {
                        setPigId(response.data)
                        })
                    .catch(error => {
                    console.error('Error fetching the goal information', error);
                    });
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

        if(event == undefined) {
            alert("You have not entered a new value.");
        } else {

            const newValue = parseInt(event);

            if(isNaN(newValue)) {
                console.log("Nope")
            }

            if (newValue.empty){
                alert("You have not entered a new value.");
            }
            if (newValue < 0) {
                setError('Value cannot be negative.');
            } else if (newValue === 0) {
                setError('You have not added new savings. Enter a value above 0.');
            } else if (newValue + currentSavings > savingsGoal) {
                console.log((currentSavings + newValue) - savingsGoal);
                let leftOver = (currentSavings + newValue) - savingsGoal;
                window.alert("You've reached your goal of " + goalAmount + " -> " + leftOver + " left over!!");
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
                
                //gets the stage again just in case the pig updates to new milestone
                axios.get('/accounts')
                    .then(response => {
                      const user = response.data.find(user => user.email_n === email_n);
                      if (user) {
                        axios.get('/accounts/getGoals/' + email_n)
                          .then(res => {
                            const goals = res.data;
                            const filteredGoals = goals.filter(goal => goal.pigName === pigName); // Filter goals by pigName
                            if (filteredGoals.length > 0) {
                              const {goalName, goalType, stage, currentSavings, savingsGoal, creation} = filteredGoals[0];
                              setStage(stage);
                              setGoalImage("/images/piggies/" + goalType + "/" + goalType + "_" + goalName + ".png");
                              //.getElementById("goalImage").src = goalImage;
                              //document.getElementById("goalStage").textContent = stage;
                            }
                        });
                    }
                });

                setError(''); // Reset error message
            }
         }
    };

    const deletePig= () => {
        //TODO: insert "Are you sure you want to delete *pigName*?" message
        let url = "/goals/deleteGoal?id=" + pigId;
        axios.delete(url)
        .then(response => {
            navigate('/dashboard');
        })
        .catch(error => {
            console.log("Could not delete Account.");
        });
    }

    /*TODO Add the logout functionality in pigInfo page*/
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
                                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
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
                        <Link to="/dashboard" className='Pig-Info-db-button'><TiChevronLeft /></Link>
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
                            <h2 style = {{marginBottom: "-15px"}}>You've saved:</h2>
                            <p style = {{color: "green", fontSize: 70}}>${currentSavings} </p>
                        </div>

                        {/* Updating savings */}
                        <div className = "PigInfo-update-savings">
                            <h2 style = {{marginBottom: -18}}>Add Savings</h2>
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
                        <img id="goalImage" src={goalImage} alt="pig" className = "PigInfo-pig-image"/>
                        <div className="progress" style={{ height: '40px' }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                {progress.toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    <div className="PigInfo-piggyBank-information">
                        {/*More information about savings*/}
                        <div className="PigInfo-more-savings-info">
                            <h2 style={{fontFamily: "DM_Sans-Medium"}}>Savings Goal:</h2>
                            <p style={{marginTop: -15, marginBottom: "10px"}}>${savingsGoal}</p>
                            <h2 style={{fontFamily: "DM_Sans-Medium",  marginBottom: "1px", marginTop: "-5px"}}>Goal Name:</h2>
                            <p style={{marginTop: -15, marginBottom: "10px"}}>{goalName}</p>
                            <h2 style={{fontFamily: "DM_Sans-Medium", marginBottom: "1px"}}>Type:</h2>
                            <p style={{marginTop: -15, marginBottom: "10px"}}>{goalType}</p>
                        </div>

                        {/*Pig information*/}
                        <div className = "PigInfo-pig-info">
                            <h3 style = {{fontFamily: "DM_Sans-SemiBold"}}>Pig Information</h3>
                            <h2 id = "goalStage" style={{fontFamily: "DM_Sans-Medium", fontSize: 16}}>Stage: {stage} </h2>
                            <h2 style={{fontFamily: "DM_Sans-Medium", fontSize: 16, marginBottom: "10px"}}>Creation Date: {creationDate} </h2>
                        </div>


                        <div className = "PigInfo-pig-info-buttons">
                        {/* Editing goal button */}
                        <button className="PigInfo-edit-goal-popup-button" onClick={openPopup}>Edit Goal</button>
                        {/* Render the prompt if showPrompt is true */}
                        {showPrompt && (
                            <Prompt
                            className="PigInfo-edit-goal-prompt-popup"

                            onClose={handlePromptClose}
                            onChange={(values) => {
                                console.log('Pig Name:', values.pigName);
                                console.log('Goal Name:', values.goalName);
                                console.log('Goal Amount:', values.goalAmount);

                                axios.put("/goals/updatePigName", {id: pigId, pigName: values.pigName})
                                .then(res => {
                                    
                                })
                                .catch(err => console.log(err));

                                axios.put("/goals/updateGoalName", {id: pigId, goalName: values.goalName})
                                .then(res => {
                                    setGoalName(values.goalName);
                                })
                                .catch(err => console.log(err));

                                axios.put("/goals/updateSavingsGoal", {id: pigId, savingsGoal: values.goalAmount})
                                .then(res => {
                                    setGoalAmount(values.goalAmount);
                                })
                                .catch(err => console.log(err));
                            
                                handlePromptClose(); // Close the prompt after handling the values
                            }}
                            />
                        )}
                            {/*Deleting piggy button*/}
                            <button className="PigInfo-delete-piggy-button" onClick={deletePig}>Delete Piggy</button>
                        </div>
                        {
                            /*

                        <button onClick={togglePopup}>Set Milestones</button>
                            {isOpen && (
                                <div className="popup">
                                <div className="popup_inner">
                                    <h2>Slider Popup</h2>
                                    <input
                                    type="range"
                                    min="0"
                                    max={savingsGoal}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    />
                                    <p>Value: {sliderValue}</p>
                                    <button onClick={() => handleMilestones(sliderValue)}>Submit</button>

                                    <button onClick={togglePopup}>Close</button>
                                </div>
                                </div>
                            )}*/}

                </div>

            </div>
            </div>
        </div>
    );
}

export default PigInfo;