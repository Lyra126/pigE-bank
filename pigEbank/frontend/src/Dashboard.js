import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; 

function Dashboard() {
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
                <a className="nav-link" href="/Profile">Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='background'>
        <div className="grid-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(index => (
            <div className="grid-item" key={index}>
              <div className="content">
                <Link to={`/PigInfo/Pig${index}`}>
                  <img src="images/favicon.ico" alt={`Pig ${index}`} />
                  <div className="overlay">Visit</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
