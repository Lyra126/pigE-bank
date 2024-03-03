import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { Empty } from 'antd';

function Dashboard() {
  const [numberOfGoals, setNumberOfGoals] = useState(0);
  const [goalNames, setGoalNames] = useState([]);

  useEffect(() => {
    const username = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
    const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];

    axios.get('/accounts')
      .then(response => {
        const user = response.data.find(user => user.email === email);
        if (user) {
          setNumberOfGoals(user.numOfGoals);

          axios.get('/accounts/getGoals/' + email)
            .then(res => {
              const goals = res.data;
              const goalNamesArray = goals.map(goal => goal.pigName);
              setGoalNames(goalNamesArray);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(error => {
        console.error('Error fetching number of goals:', error);
      });
  }, []); 

  const logout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pig E-Bank</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/Profile">Profile</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='background2'>
        <div className="grid-container">
          {[...Array(Math.max(numberOfGoals, 12))].map((_, index) => (
            <div className="grid-item" key={index}>
              <div className="content">
                {index < numberOfGoals ? (
                  <Link to={`/PigInfo/${goalNames[index]}`}>
                    <img src={`images/favicon.ico`} alt={`Pig ${index + 1}`} />
                    <div className="overlay">Visit {goalNames[index] || 'Loading...'}</div>
                  </Link>
                ) : index === numberOfGoals ? (
                  <Link to={`/createNewGoal`}>
                    <img src="images/testPlus.jpg" alt={`Pig ${index + 1}`} />
                  </Link>
                ) : (
                    <img src="images/test_bg_image.png" alt={`Pig ${index + 1}`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
