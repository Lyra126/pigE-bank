import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; 

function Dashboard() {
  return (
    <div className='background'>
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

      <title>Interactive Dashboard</title>

      <div className="grid-container">
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 1" />
          </div>
          <div className="content">
          <Link to={{ pathname: "/PigInfo/Pig1" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 2" />
          </div>
          <div className="content">
          <Link to={{ pathname: "/PigInfo/Pig2" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 3" />
          </div>
          <div className="content">
          <Link to={{ pathname: "/PigInfo/Pig3" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 4" />
          </div>
          <div className="content">
            <Link to={{ pathname: "/PigInfo/Pig4" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 5" />
          </div>
          <div className="content">
            <Link to={{ pathname: "/PigInfo/Pig5" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
        <div className="grid-item">
          <div className="content">
            <img src="favicon.ico" alt="Pig 6" />
          </div>
          <div className="content">
            <Link to={{ pathname: "/PigInfo/Pig6" }}>
              <button>Visit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
