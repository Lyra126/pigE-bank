import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
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
                <a className="nav-link" href="/AboutUs">About Us</a>
              </li>
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

{/* Welcome Page Div */}
      <div>
        <div className = "container">
        <div>
            <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 40}}>Welcome to your new</h2>
            <h1 style = {{fontFamily: "Poppins-Bold", fontSize: 100, marginTop: -20}}> PIG E-BANK!</h1>
            <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 25, marginTop: -20, marginBottom: 20}}>(Piggy Bank)</h2>
          </div>
        <div className="header-container">
          <div className="header-content container" style = {{marginTop: 150}}>
            {/* <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 40}}>Welcome to your new</h2>
            <h1 style = {{fontFamily: "Poppins-Bold", fontSize: 100, marginTop: -20}}> PIG E-BANK!</h1>
            <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 25, marginTop: -20, marginBottom: 20}}>(Piggy Bank)</h2> */}
            <p>Welcome to our cutting-edge personal finance management solution! Picture this: a powerful platform designed to revolutionize the way you manage your finances. Our software not only tracks your accounts and balances but also provides robust user authentication to keep your information secure.</p>
            <p>But here's where the magic happens: our core feature sets us apart. Imagine setting savings goals and having the confidence that your funds are safe until you reach them. No more impulse spending, no more unnecessary purchases. Our intuitive interface, inspired by the timeless charm of a "Piggy bank," motivates you to stay focused on your financial objectives.</p>
            <p>Security is our top priority. With our innovative lock feature, your savings are safeguarded. In emergencies, rest assured, our perma-lock and emergency lock options ensure quick access to your funds when you need them most.</p>
            <p>Track your progress effortlessly with our dynamic progression bar, visually representing your journey to financial success. Join us today and take the first step towards a brighter financial future!</p>
            <Link to="/createAccount" className="get-started-button">Get Started</Link>
          </div>
          <div className="header-image" style = {{marginTop: 100}}>
            <img src="money_pig.png" alt="money_pig"/>
          </div>
        </div>
        <br/>
        
        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
