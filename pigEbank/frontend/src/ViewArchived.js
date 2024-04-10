import React, {useState, useEffect} from 'react';
import "./ViewArchived.css";
import axios from 'axios';


function ViewArchived({ setOpenArchive }) {
    const [goalNames, setGoalNames] = useState([]);
    const [goalSavings, setGoalSavings] = useState([]);
    const [goalTypes, setGoalTypes] = useState([]);
    const [email, setEmail]  = useState('');

    useEffect(() => {
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
        axios.get('/accounts/getArchivedGoals/' + email)
        .then(response => {
                const goals = response.data;
                setGoalNames(goals.map(goal => goal.goalName));
                setGoalSavings(goals.map(goal => goal.savingsGoal));
                setGoalTypes(goals.map(goal => goal.goalType));
            })
        .catch(error => {
            console.error('Error fetching archived goals:', error);
        });
    }, []);

  return (
    <div className="modalBackground2">
      <div className="modalContainer2">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenArchive(false);}}>X</button>
        </div>
        <h2>Archived Goals</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Savings Goal</th>
            </tr>
          </thead>
          <tbody>
            {goalNames.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{goalTypes[index]}</td>
                <td>{goalSavings[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewArchived;