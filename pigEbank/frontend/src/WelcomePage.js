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
        <div className = "title-container">
            <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 40, marginTop: -30}}>Welcome to your new</h2>
            <h1 style = {{fontFamily: "PaytoneOne-Regular", fontSize: 160, marginTop: -40}}> Pig E-Bank!</h1>
            <h2 style = {{fontFamily: "DM_Sans-SemiBold", fontSize: 20, marginTop: -20, marginBottom: 20, marginLeft: 8}}>(Piggy Bank)</h2>
        </div>
        <p className = "text-center" style = {{fontSize: 20, marginTop: -23, fontFamily: "DM_Sans-Regular"}}>Say hello to your newest financial companion.</p>
        <p className = "text-center" style = {{fontSize: 20, marginTop: -15, paddingBottom: 50, fontFamily: "DM_Sans-Regular"}}>Not only is he cute, but he's here to help you save your money!</p>

        <div className = "description-container">

          <div className="container-1">
              <div className="container-text">
              <h2 className = "description-header">Take hold of your money</h2>
              <p>Welcome to our cutting-edge personal finance management solution! Picture this: a powerful platform designed to revolutionize the way you manage your finances. Our software not only tracks your accounts and balances but also provides robust user authentication to keep your information secure.</p>
              </div>
              <div className="header-image" style = {{marginTop: 100}}>
              <img src="images/money_pig.png" alt="money_pig"/>
              </div>
          </div>

          <div className="container-2">
              <div className="container-text">
              <h2 className = "description-header">Take hold of your money</h2>
              <p>Welcome to our cutting-edge personal finance management solution! Picture this: a powerful platform designed to revolutionize the way you manage your finances. Our software not only tracks your accounts and balances but also provides robust user authentication to keep your information secure.</p>
              </div>
            <div className="header-image" style = {{marginTop: 100}}>
            <img src="images/money_pig.png" alt="money_pig"/></div>

           </div>
           
           <div className="container-1">
           <div className="container-text">
              <h2 className = "description-header">Take hold of your money</h2>
              <p>Welcome to our cutting-edge personal finance management solution! Picture this: a powerful platform designed to revolutionize the way you manage your finances. Our software not only tracks your accounts and balances but also provides robust user authentication to keep your information secure.</p>
              </div>
              <div className="header-image" style = {{marginTop: 100}}>
              <img src="images/money_pig.png" alt="money_pig"/>
              </div>
          </div>

          <div className="container-4 bg-success">
            <p className="container-text">But here's where the magic happens: our core feature sets us apart. Imagine setting savings goals and having the confidence that your funds are safe until you reach them. No more impulse spending, no more unnecessary purchases. Our intuitive interface, inspired by the timeless charm of a "Piggy bank," motivates you to stay focused on your financial objectives.</p>
            <div className="header-image" style = {{marginTop: 100}}>
            <img src="images/money_pig.png" alt="money_pig"/></div>
           </div>

            <div className = "text-center"><Link to="/createAccount" className="get-started-button">Get Started</Link></div>
          </div>
          
        </div>
        <br/>
        
        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
        </div>
      
      

  );
}

export default WelcomePage;
