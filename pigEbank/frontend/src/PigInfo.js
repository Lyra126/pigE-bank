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
                    const { goalName, goalType, stage, ownerEmail, currentSavings, savingsGoal, creation } = filteredGoals[0];
                    setGoalName(goalName);
                    setGoalType(goalType);
                    setStage(stage);
                    setCurrentSavings(currentSavings);
                    setSavingsGoal(savingsGoal);
                    setCreationDate(creation);
                    setProgress((currentSavings / savingsGoal) * 100);
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
        
        <div className="container">
            <div className="row">
                <div className="top-left">
                    {/* Top-left container */}
                    <div>
                        <div className="dashboard-button">
                            <Link to="/dashboard" className='dbutton'>⬅</Link>
                        </div>
                         <h1>{pigName} </h1>
                         <h1>{goalName} </h1>
                         <h1>Type: {goalType} </h1>
                         <h1>Stage: {stage} </h1>
                         <h1>creationDate: {creationDate} </h1>
                    </div>
                </div>
                <div className="top-right">
                    {/* Top-right container */}
                    <div>
                    <img src="/images/favicon.ico" alt="pig"  />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="bot-left">
                    <h2>Current Savings: $ {currentSavings} </h2>
                    <h2>Savings Goal: $ {savingsGoal} </h2>
                    
                    <div className="progress" style={{ height: '30px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                            {progress.toFixed(2)}%
                        </div>
                    </div>
                    
                    <div>
                        <input
                            className='input-form'
                            type="number"
                            value={newSavings}
                            placeholder="Enter new Savings"
                            onChange={e => setNewSavings(e.target.value)}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button className="update-button" onClick={() => handleGoalUpdate(newSavings)}>Update Goal</button>
                    </div>
                    <div className="bot-right">
                        { /* Bottom-right container */}
                        <div >
                        <form onSubmit={calculateTimeToReachGoal}>
    <button type="button" className="toggle-button" onClick={() => setShowMessage(prevState => !prevState)}>
        {showMessage ? 'Calculator' : 'Calculator'}
    </button>
    {showMessage && (
        <div>
            <div className="form-group">
                <label htmlFor="goalAmount">Goal Amount:</label>
                <input
                    type="number"
                    id="goalAmount"
                    value={goalAmount}
                    onChange={e => setGoalAmount(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="currentSavings">Current Savings:</label>
                <input
                    type="number"
                    id="currentSavings"
                    value={currentSavings}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="monthlyContribution">Monthly Contribution:</label>
                <input
                    type="number"
                    id="monthlyContribution"
                    value={monthlyContribution}
                    onChange={e => setMonthlyContribution(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-calculate">Calculate</button>
            <button type="button" className="btn-calculate" onClick={clearVariablesAndMessage}>Clear</button>
            {showMessage && (
                <p className="result-message">It will take approximately {timeToReachGoal} months to reach your savings goal.</p>
            )}
        </div>
    )}
</form>

                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PigInfo;
