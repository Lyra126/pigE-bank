import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
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

      <div className="gradient_bg_green">
        <header className="about-header">
          <h1>About Us</h1>
          <p>We propose a comprehensive personal finance management software. Not only does this software keep track of users, their account balances, and implements user authentication, but its core feature is that it has the ability to create savings goals that prevent withdrawals until the goal is met, preventing the user from spending their hard-earned money on unnecessary items. The UI is modeled after a "Piggy bank" aesthetic, encouraging users to stay on track to their financial goals To enhance security, a lock feature on the user’s savings will be implemented, however in emergencies, we will implement a perma-lock and emergency lock to allow the user to access any necessary funds. Users can contribute to their savings via a cartoon UI, and an optional automatic mode ensures discretion by not displaying the amount. A dynamic progression bar visually represents the percentage of goal fulfillment.</p>
        </header>
        
        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
      </div>
    </div>
  );
}

export default WelcomePage;
