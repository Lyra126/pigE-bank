import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Settings.css';
import axios from 'axios';
import PasswordModal from "./update/updatePassword";
import UsernameModal from "./update/updateUsername";

function Settings() {
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [usernameModalOpen, setUsernameModalOpen] = useState(false);
    const navigate = useNavigate();
    const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
    // Function to toggle password visibility

    const deleteAccount = (email) => {
        var url = "/accounts/deleteAccount/" + email
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
                            <a className="nav-link" href="/Profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
            <div className="container-fluid bg-white py-4"> 
                <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}>Settings</h1>
                <button className="open-modal" onClick={() => {setPasswordModalOpen(true);}}> Change Password </button>
                {passwordModalOpen && <PasswordModal setOpenPasswordModal={setPasswordModalOpen} />}

                <p></p>
                <p><button className="open-modal" onClick={() => {setUsernameModalOpen(true);}}> Change Username </button></p>
                {usernameModalOpen && <UsernameModal setOpenUsernameModal={setUsernameModalOpen} />}

                <p></p>
                <p> <button className="delete-btn" onClick={()=> {deleteAccount(email)}}> Delete Account </button></p>

            </div>
        </div>
    </div>
    );
}

export default Settings;
