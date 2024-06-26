import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import PasswordModal from "./update/updatePassword";
import UsernameModal from "./update/updateUsername";
import ViewArchived from "./ViewArchived.js";
import { Tooltip, toggleTooltip } from 'react-tooltip'

function Profile() {
    const [username, setUsername] = useState('');
    const [numberOfGoals, setNumberOfGoals] = useState(0);
    const [totalCurrency, setTotalCurrency] = useState('0');
    const [accountCreationDate, setAccountCreationDate] = useState('');
    const [email, setEmail]  = useState('');
    const navigate = useNavigate();
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
    const [usernameModalOpen, setUsernameModalOpen] = useState(false);
    const [goalNames, setGoalNames] = useState([]);
    const [goalSavings, setGoalSavings] = useState([]);
    const [goalTypes, setGoalTypes] = useState([]);

    useEffect(() => {
        if (!document.cookie) {
            navigate('/login');
            return;
        }
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
        

        axios.put("/accounts/updateTotalSavings", {email: email})
            .then(res => console.log(res))
            .catch(err => console.log(err));

        axios.get('/accounts')
            .then(response => {
                const user = response.data.find(user => user.email === email);
                if (user) {
                    setUsername(user.username);
                    //setPassword(user.password);
                    setNumberOfGoals(user.numOfGoals);
                    setAccountCreationDate(user.creation);
                    setEmail(user.email);
                    setTotalCurrency(user.totalSavings)
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
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

    const deleteAccount = (email) => {
        let url = "/accounts/deleteAccount/" + email
        console.log(email);
        axios.delete(url)
        .then(response => {
            navigate('/');
        })
        .catch(error => {
            console.log("Could not delete Account.");
        });

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
                                <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='d-flex flex-row vh-100 justify-content-center align-items-center'>
                <div className="container-fluid bg-white mx-2">
                    <br/>
                    <div className="d-flex justify-content-center">
                        <img src="images/piggies/other/pig.jpg" alt="piggie" width="200" height="200" className="align-items-center" />
                    </div>
                    <h1 className="text-center login_title_message" style={{ marginTop: 20, fontSize: 30, fontFamily: "Lexend-SemiBold"}}> Profile</h1>
                    <p className="text-center " style={{ marginTop: 20, fontSize: 20, fontFamily: "Lexend-Regular"}}>Username: {username}</p>
                    <p className="text-center " style={{ marginTop: 20, fontSize: 20, fontFamily: "Lexend-Regular"}}>Email: {email}</p>
                    <p className="text-center " style={{ marginTop: 20, fontSize: 20, fontFamily: "Lexend-Regular"}}>Total Archived Goals: {Object.keys(goalNames).length}</p>
                    <p><button className="btn open-modal" onClick={() => {setArchiveModalOpen(true);}}> View Archived Goals </button></p>
                        {archiveModalOpen && <ViewArchived setOpenArchive={setArchiveModalOpen} />}

                </div>

                <div className="d-flex flex-column"> 
                    <div className='container-statistics'>
                        <h1 className="text-center login_title_message" style={{ marginTop: 30, fontSize: 30, fontFamily: "Lexend-SemiBold"}}> Statistics</h1>
                        <p className="text-center " style={{ marginTop: 10, fontSize: 20, fontFamily: "Lexend-Regular"}}>Total Currency: {totalCurrency}</p>
                        <p className="text-center " style={{ marginTop: 10, fontSize: 20, fontFamily: "Lexend-Regular"}}>Total Number of Goals: {numberOfGoals}</p>
                        <p className="text-center " style={{ marginTop: 10, fontSize: 20, fontFamily: "Lexend-Regular"}}>Creation Date: {accountCreationDate}</p>
                    </div>
                    <div style={{ margin: '5px 0' }} />
                    <div className='edit-settings'>
                        <h1 className="text-center login_title_message" style={{ marginTop: 30, fontSize: 30, fontFamily: "Lexend-SemiBold"}}> Edit Settings</h1>
                        <p><button className="btn open-modal" onClick={() => {setPasswordModalOpen(true);}}> Change Password </button></p>
                        {passwordModalOpen && <PasswordModal setOpenPasswordModal={setPasswordModalOpen} />}

                        <p></p>
                        <p><button className="btn open-modal" onClick={() => {setUsernameModalOpen(true);}}> Change Username </button></p>
                        {usernameModalOpen && <UsernameModal setOpenUsernameModal={setUsernameModalOpen} />}

                        <p></p>
                        <p>
                            {/*<button className="btn delete-btn" onClick={()=> {deleteAccount(email)}}> Delete Account </button></p>*/}
                            <a className = "btn delete-btn" data-tooltip-id="my-tooltip-click">Delete Account</a>
                            <Tooltip id="my-tooltip-click"
                                     events={['click']}
                                     style = {{padding: '15px'}}
                                     place="right"
                                     clickable={true}
                                     globalEventOff="click">

                                <div>
                                    <h2 style = {{fontSize: "15px"}}> Are you sure you want to delete?</h2>
                                    <button style={{fontSize: "15px", width: '100%'}} className="btn delete-btn" onClick={()=> {deleteAccount(email)}}> Confirm Delete </button>
                                </div>
                            </Tooltip>
                        </p>
                    </div>
                </div>
             </div>
        </div>
    );
}

export default Profile;
