import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Calculator.css'; // Importing custom CSS for styling

function Calculator() {
    const [currentSavings, setCurrentSavings] = useState(0);
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [timeToReachGoal, setTimeToReachGoal] = useState(0);
    const [showMessage, setShowMessage] = useState(false); // State to control message display

    const location = useLocation();

    function calculateTimeToReachGoal(event) {
        event.preventDefault();
        setTimeToReachGoal(((goalAmount-currentSavings) / monthlyContribution).toFixed(2));
        setShowMessage(true); // Show the message when calculation is done
    }

    function clearVariablesAndMessage() {
        setCurrentSavings(0);
        setMonthlyContribution(0);
        setGoalAmount(0);
        setTimeToReachGoal(0);
        setShowMessage(false);
    }

    // Reset form and hide message when navigating to another page
    React.useEffect(() => {
        clearVariablesAndMessage();
    }, [location.pathname]);

    const logout = () => {
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };
    

    return (
        <div className='bg'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">Pig E-Bank</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"> Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="savings-calculator-container">
                <form onSubmit={calculateTimeToReachGoal} className="calculator-form">
                <h1 className="calculator-title">Savings Goals Calculator</h1>
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
                            onChange={e => setCurrentSavings(parseFloat(e.target.value))}
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
                    {showMessage && ( // Show message when showMessage is true
                        <p className="result-message">It will take approximately {timeToReachGoal} months to reach your savings goal.</p>
                    )}
                </form>
                
            </div>
        </div>
    );
}

export default Calculator;
