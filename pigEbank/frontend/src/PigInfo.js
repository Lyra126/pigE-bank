import React, { useState } from 'react';
import './PigInfo.css';
import { Link, useParams } from 'react-router-dom'; 

function PigInfo() {
    const { pigName } = useParams();
    const [currentSavings, setCurrentSavings] = useState(60);
    const [savingsGoal, setSavingsGoal] = useState(100);
    const [newGoal, setNewGoal] = useState('');

    // Assuming progress is a value between 0 and 100 representing the progress percentage
    const progress = (currentSavings / savingsGoal) * 100; // Calculate progress based on current savings and savings goal

    const handleGoalUpdate = () => {
        if (newGoal !== '') {
            setSavingsGoal(parseFloat(newGoal));
            setNewGoal('');
        }
    };

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/createNewGoal">Create New Goal</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='background'>
                <title>Pig Info</title>
                <div className="edit-goal-btn" onClick={() => alert('Edit Goal clicked')}>Edit Goal</div>
                <div>
                    <h1>{pigName}</h1>
                    <br/>
                    <h2>Current Savings: $ {currentSavings} </h2>
                    <h2>Savings Goal: $ {savingsGoal} </h2>
                    {/* Progress Bar */}
                    <div className="progress" style={{ height: '30px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, color: 'black' }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                            {progress.toFixed(2)}% {/* Show progress with 2 decimal places */}
                        </div>
                    </div>
                    <br/>
                    {/* Update Savings Goal */}
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
            </div>
        </div>
    );
}

export default PigInfo;
