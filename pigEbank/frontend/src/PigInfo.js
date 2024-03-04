import React, { useState, useEffect } from 'react';
import './PigInfo.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

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

    useEffect(() => {
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


    const handleGoalUpdate = (event) => {
        const newValue = parseInt(event);
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

            axios.put("/goals/addToCurrentSavings?id=" + pigId + "&money="+ newValue)
            .then(res => console.log(res))
            .catch(err => console.log(err));

            setError(''); // Reset error message
        }

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
                        </ul>
                    </div>
                </div>
            </nav>
        
{/*        <div className="PigInfo-container">*/}
{/*            <div className="row">*/}
{/*                <div className="top-left">*/}
{/*                    /!* Top-left container *!/*/}
{/*                    <div>*/}
{/*                        <div className="dashboard-button ">*/}
{/*                            <Link to="/dashboard" className='dbutton'>⬅</Link>*/}
{/*                        </div>*/}
{/*                         <h1>{pigName} </h1>*/}
{/*                         <h1>{goalName} </h1>*/}
{/*                         <h1>Type: {goalType} </h1>*/}
{/*                         <h1>Stage: {stage} </h1>*/}
{/*                         <h1>creationDate: {creationDate} </h1>*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*                <div className="top-right gradient_bg_green">*/}
{/*                    /!* Top-right container *!/*/}
{/*                    <div>*/}
{/*                    <img src="/images/favicon.ico" alt="pig"  />*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*            </div>*/}
{/*            <div className="row">*/}
{/*                <div className="bot-left">*/}
{/*                    <h2>Current Savings: $ {currentSavings} </h2>*/}
{/*                    <h2>Savings Goal: $ {savingsGoal} </h2>*/}
{/*                    */}
{/*                    <div className="progress" style={{ height: '30px' }}>*/}
{/*                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">*/}
{/*                            {progress.toFixed(2)}%*/}
{/*                        </div>*/}
{/*                    </div>*/}
{/*                    */}
{/*                    <div>*/}
{/*                        <input*/}
{/*                            className='input-form'*/}
{/*                            type="number"*/}
{/*                            value={newSavings}*/}
{/*                            placeholder="Enter new Savings"*/}
{/*                            onChange={e => setNewSavings(e.target.value)}*/}
{/*                        />*/}
{/*                    </div>*/}
{/*                    {error && <div className="error-message">{error}</div>}*/}
{/*                    <button className="update-button" onClick={() => handleGoalUpdate(newSavings)}>Update Goal</button>*/}
{/*                    </div>*/}
{/*                    <div className="bot-right">*/}
{/*                        { /* Bottom-right container *!/*/}
{/*                        <div >*/}
{/*                        <form onSubmit={calculateTimeToReachGoal}>*/}
{/*    <button type="button" className="toggle-button" onClick={() => setShowMessage(prevState => !prevState)}>*/}
{/*        {showMessage ? 'Calculator' : 'Calculator'}*/}
{/*    </button>*/}
{/*    {showMessage && (*/}
{/*        <div>*/}
{/*            <div className="form-group">*/}
{/*                <label htmlFor="goalAmount">Goal Amount:</label>*/}
{/*                <input*/}
{/*                    type="number"*/}
{/*                    id="goalAmount"*/}
{/*                    value={goalAmount}*/}
{/*                    onChange={e => setGoalAmount(parseFloat(e.target.value))}*/}
{/*                    className="form-control"*/}
{/*                />*/}
{/*            </div>*/}
{/*            <div className="form-group">*/}
{/*                <label htmlFor="currentSavings">Current Savings:</label>*/}
{/*                <input*/}
{/*                    type="number"*/}
{/*                    id="currentSavings"*/}
{/*                    value={currentSavings}*/}
{/*                    className="form-control"*/}
{/*                />*/}
{/*            </div>*/}
{/*            <div className="form-group">*/}
{/*                <label htmlFor="monthlyContribution">Monthly Contribution:</label>*/}
{/*                <input*/}
{/*                    type="number"*/}
{/*                    id="monthlyContribution"*/}
{/*                    value={monthlyContribution}*/}
{/*                    onChange={e => setMonthlyContribution(parseFloat(e.target.value))}*/}
{/*                    className="form-control"*/}
{/*                />*/}
{/*            </div>*/}
{/*            <button type="submit" className="btn-calculate">Calculate</button>*/}
{/*            <button type="button" className="btn-calculate" onClick={clearVariablesAndMessage}>Clear</button>*/}
{/*            {showMessage && (*/}
{/*                <p className="result-message">It will take approximately {timeToReachGoal} months to reach your savings goal.</p>*/}
{/*            )}*/}
{/*        </div>*/}
{/*    )}*/}
{/*</form>*/}

{/*                        */}
{/*                    </div>*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*            </div>*/}

            <div className="PigInfo-container">
                {/* Top Row*/}
                <div className = "PigInfo-top-row">
                    {/* going back to dashboard button*/}
                    <div className="Pig-Info-db-button-div ">
                        <Link to="/dashboard" className='Pig-Info-db-button'>⬅</Link>
                    </div>
                {/* Div with Pig name and Goal name */}
                    <div className="PigInfo-pigName-savingsGoal">
                         <p style={{fontFamily: "Poppins-SemiBold", marginBottom: "1px", fontSize: "32px", marginTop: "-6px"}}>{pigName} </p>
                        <p style={{fontFamily: "DM_Sans-Medium"}}>Savings Goal: ${savingsGoal} </p>
                    </div>

                </div>

                {/*Main Row*/}
                <div className="PigInfo-middle-row">

                    {/*FIRST COLUMN, savings information*/}
                    <div className = "PigInfo-savings-information">
                        <div className="PigInfo-current-savings">
                        {/*Current savings*/}
                        <h1>Savings</h1>
                            <h3 style = {{fontFamily: "DM_Sans-SemiBold"}}>Currently saved:</h3>
                            <p>${currentSavings} </p>
                        </div>

                        {/* Updating savings */}
                        <div className = "PigInfo-update-savings">
                            <h2 style = {{marginBottom: -10}}>Add Savings</h2>
                            <div>
                                <input
                                    className='input-form PigInfo-input-form'
                                    type="number"
                                    value={newSavings}
                                    placeholder="Enter here!"
                                    onChange={e => setNewSavings(e.target.value)}
                                />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button className="update-button" onClick={() => handleGoalUpdate(newSavings)}>Add New Savings</button>
                        </div>

                        {/*Calculator*/}
                        <div className = "PigInfo-calculator">
                            <h2>Calculator</h2>
                            <p style = {{marginTop: "-14px", marginBottom: "2px"}}>What is this?</p>
                            <form onSubmit={calculateTimeToReachGoal}>
                                    <div>
                                        {/*Input*/}
                                        <div>
                                        <div className="form-group PigInfo-form-input">
                                            <label htmlFor="goalAmount">Goal Amount:</label>
                                            <input
                                                type="number"
                                                id="goalAmount"
                                                value={goalAmount}
                                                onChange={e => setGoalAmount(parseFloat(e.target.value))}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group PigInfo-form-input">
                                            <label htmlFor="currentSavings">Current Savings:</label>
                                            <input
                                                type="number"
                                                id="currentSavings"
                                                value={currentSavings}
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
                                            <button type="submit" className="PigInfo-btn-calculate">Calculate</button>
                                        {showMessage && (
                                            <p className="result-message">It will take approximately {timeToReachGoal} months to reach your savings goal.</p>
                                        )}
                                        </div>
                                    </div>
                            </form>
                        </div>


                    </div>


                    {/*pig image and percentage bar*/}
                    <div className="PigInfo-image-percentageBar">
                        <img src="/images/test_bg_image.png" alt="pig" className = "PigInfo-pig-image"/>
                        <div className="progress" style={{ height: '40px' }}>
                            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                {progress.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div className="PigInfo-piggy-information">
                        <h3 style = {{fontFamily: "DM_Sans-SemiBold"}}>Pig Information</h3>
                        <p style={{fontFamily: "DM_Sans-Medium",  marginBottom: "1px", marginTop: "-5px"}}>Goal Name: {goalName} </p>
                        <p style={{fontFamily: "DM_Sans-Medium", marginBottom: "1px"}}>Type: {goalType} </p>
                        <p style={{fontFamily: "DM_Sans-Medium"}}>Stage: {stage} </p>
                        <p style={{fontFamily: "DM_Sans-Medium"}}>Creation Date: {creationDate} </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PigInfo;
