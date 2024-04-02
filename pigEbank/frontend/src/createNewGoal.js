import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './createNewGoal.css'; // Import CSS file for custom styles
import axios from 'axios';

function CreateNewGoal() {
    const [goalName, setGoalName] = useState('');
    const [pigName, setPigName] = useState('');
    const [savingsGoal, setSavingsGoal] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!document.cookie) {
          navigate('/login');
        }
    });

    // Handler function to update the selected option
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    function handleSubmit(event) {
      event.preventDefault();

      //Add backend code
      const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
      axios.post("/goals/newGoal", {goalName: goalName, pigName: pigName, savingsGoal: savingsGoal, ownerEmail: email})
        .then(res => {
            console.log(res)
            navigate('/dashboard');
        })
        .catch(err => console.log(err));;
  }

  const logout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

            <div className="createNewGoal">
                <div className="createNewGoal-new-goal-div ">
                    <h1 className="text-center mb-4" style = {{marginTop: 30, fontFamily: "Poppins-SemiBold", paddingBottom: 5}}>Create a New Goal</h1>
                    <p className = "text-center" style = {{marginTop: -20}}>Add a new pig to your stables!</p>
                    <form onSubmit={handleSubmit} className="createNewGoal-form-container">
                        <div className='createNewGoal-input-field'>
                            <label>Pig Name</label>
                            <input type='text' placeholder='Enter your new pigs name' className='form-control'
                                onChange={e => setPigName(e.target.value)} required/>
                        </div>
                        <div className='createNewGoal-input-field'>
                            <label>Goal Name</label>
                            <input type='text' placeholder='Enter your new goal name' className='form-control'
                                onChange={e => setGoalName(e.target.value)} required/>
                        </div>
                        <div className='createNewGoal-input-field'>
                            <label>Goal Amount</label>
                            <input type='text' placeholder='Enter your desired goal amount' className='form-control'
                                onChange={e => setSavingsGoal(e.target.value)} required/>
                        </div>

                        <div className = "createNewGoal-dropdown-div">
                            <label>Goal Type</label>
                            <br/>
                            <select id="dropdown" className = "createNewGoal-dropdown" value={selectedOption} onChange={handleSelectChange}>
                                <option value="">Choose an option</option>
                                <option value="asset">Asset</option>
                                <option value="education">Education</option>
                                <option value="vacation">Vacation</option>
                                <option value="richie">Other</option>
                            </select>
                        </div>
                      
                        <button className='createNewGoal-btn-goal'>Submit</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewGoal;
