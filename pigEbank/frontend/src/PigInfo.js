import React from 'react';
import './PigInfo.css';
import { Link, useParams } from 'react-router-dom'; 

function PigInfo() {
    const { pigName } = useParams();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/createAccount">Create Account</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='background'>
                <title>Pig Info</title>
                        
                <div>
                    <h1>Pig Information</h1>
                    <p>This is information about {pigName}.</p>
                </div>
            </div>
        </div>
    );
}

export default PigInfo;
