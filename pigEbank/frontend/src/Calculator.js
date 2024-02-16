import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Calculator.css'; // Importing custom CSS for styling

function Calculator() {
    const [currentSavings, setCurrentSavings] = useState(0);
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [timeToReachGoal, setTimeToReachGoal] = useState(0);
    const [showMessage, setShowMessage] = useState(false); // State to control message display
    const [inputChanged, setInputChanged] = useState(false); // State to track if any input has changed

    function calculateTimeToReachGoal() {
        const savingsPerMonth = currentSavings + (monthlyContribution * 12);
        const monthsNeeded = Math.ceil(goalAmount / savingsPerMonth);
        setTimeToReachGoal(monthsNeeded);
        setShowMessage(true); // Show the message when calculation is done
        setInputChanged(false); // Reset inputChanged state
    }

    function clearVariablesAndMessage() {
        setCurrentSavings(0);
        setMonthlyContribution(0);
        setGoalAmount(0);
        setTimeToReachGoal(0);
        setShowMessage(false); // Hide the message
        setInputChanged(true); // Set inputChanged to true to hide the message
    }

    function handleInputChange() {
        setInputChanged(true); // Set inputChanged to true when any input changes
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Pig E-Bank</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard"> Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            <div className="savings-calculator-container">
                <h1 className="calculator-title">Savings Goals Calculator</h1>
                <form onSubmit={calculateTimeToReachGoal} className="calculator-form">
                    <div className="form-group">
                        <label htmlFor="currentSavings">Current Savings:</label>
                        <input
                            type="number"
                            id="currentSavings"
                            value={currentSavings}
                            onChange={e => { setCurrentSavings(parseFloat(e.target.value)); handleInputChange(); }}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="monthlyContribution">Monthly Contribution:</label>
                        <input
                            type="number"
                            id="monthlyContribution"
                            value={monthlyContribution}
                            onChange={e => { setMonthlyContribution(parseFloat(e.target.value)); handleInputChange(); }}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goalAmount">Goal Amount:</label>
                        <input
                            type="number"
                            id="goalAmount"
                            value={goalAmount}
                            onChange={e => { setGoalAmount(parseFloat(e.target.value)); handleInputChange(); }}
                            className="form-control"
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Calculate</button>
                        <button type="button" className="btn btn-secondary" onClick={clearVariablesAndMessage}>Clear</button>
                    </div>
                </form>
                {showMessage && !inputChanged && ( // Show message only when showMessage is true and no input has changed
                    <p className="result-message">It will take approximately {timeToReachGoal} months to reach your savings goal.</p>
                )}
            </div>
        </div>
    );
}

export default Calculator;
