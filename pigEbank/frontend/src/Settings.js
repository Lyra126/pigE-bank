import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';
import axios from 'axios';
import PasswordModal from "./update/updatePassword";
import UsernameModal from "./update/updateUsername";

function Settings() {
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [usernameModalOpen, setUsernameModalOpen] = useState(false);
    // Function to toggle password visibility

    useEffect(() => {
        axios.get('/accounts')
            .then(response => {
               console.log('yep')
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

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
                            <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
            <div className="container-fluid bg-white py-4"> 
                <h1 className="p-8 text-center login_title_message" style={{ marginTop: 10 }}>Settings</h1>
                <button className="openModalBtn" onClick={() => {setPasswordModalOpen(true);}}> Change Password </button>
                {passwordModalOpen && <PasswordModal setOpenPasswordModal={setPasswordModalOpen} />}

                <p></p>
                <p><button className="openModalBtn" onClick={() => {setUsernameModalOpen(true);}}> Change Username </button></p>
                {usernameModalOpen && <UsernameModal setOpenUsernameModal={setUsernameModalOpen} />}

            </div>
        </div>
    </div>
    );
}

export default Settings;
