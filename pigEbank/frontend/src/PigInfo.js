import React, { useState } from 'react';
import './PigInfo.css';
import { Link, useParams, useLocation } from 'react-router-dom';

function PigInfo() {
    const { pigName } = useParams();
    const [currentSavings, setCurrentSavings] = useState(60);
    const [savingsGoal, setSavingsGoal] = useState(100);
    const [newGoal, setNewGoal] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [timeToReachGoal, setTimeToReachGoal] = useState(0);
    const [showMessage, setShowMessage] = useState(false); // State to control message display

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

    
    const progress = (currentSavings / savingsGoal) * 100; 

    const handleGoalUpdate = () => {
        if (newGoal !== '') {
            setSavingsGoal(parseFloat(newGoal));
            setNewGoal('');
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
                         <h1>Goal Name </h1>
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
                            {progress.toFixed(2)}% {/* Show progress with 2 decimal places */}
                        </div>
                    </div>
                
                    
                    <div>
                        <input
                            className='input-form'
                            type="number"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            placeholder="Enter new Savings"
                        />
                    </div>
                    <button className="update-button" onClick={handleGoalUpdate}>Update Goal</button>
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
