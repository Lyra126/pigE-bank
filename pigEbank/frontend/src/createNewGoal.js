import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './createNewGoal.css'; // Import CSS file for custom styles

function CreateNewGoal() {
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Handler function to update the selected option
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    function handleSubmit(event) {
      event.preventDefault();
      
  }

  const logout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

    return (
        <div>
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
                                <Link className="nav-link" to="/profile"> Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="top-div2">
                <div className="create-account-container box_shadow">
                    <h1 className="text-center mb-4" style = {{marginTop: 20, fontFamily: "Poppins-SemiBold", paddingBottom: 10}}>Create a New Goal</h1>
                    <p className = "text-center" style = {{marginTop: -20}}>Add a new pig to your stables!</p>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className='input-field'>
                            <label>Goal Name</label>
                            <input type='text' placeholder='Enter your new goal name' className='form-control'
                                onChange={e => setGoalName(e.target.value)} required/>
                        </div>
                        <div className='input-field'>
                            <label>Goal Amount</label>
                            <input type='text' placeholder='Enter your desired goal amount' className='form-control'
                                onChange={e => setGoalAmount(e.target.value)} required/>
                        </div>

                        <div>
                        <label htmlFor="dropdown">Select an option:</label>
                        <br/>
                            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                                <option value="">Choose an option</option>
                                <option value="asset">Asset</option>
                                <option value="necessities">Necessities</option>
                                <option value="education">Education</option>
                                <option value="vacation">Vacation</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="richie">Other</option>
                            </select>
                        </div>
                      
                        <button className='btn-goal'>Submit</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewGoal;
