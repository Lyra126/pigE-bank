import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

function WelcomePage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pig E-Bank</a>
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
          <div className = "title-bg">
            <div className = "title-container">
                <h2 className = "h2-subtitle">Welcome to your new</h2>
                <h1 className = "h1-title"> Pig E-Bank!</h1>
            </div>
        <p className = "text-center" style = {{fontSize: 20, marginTop: -23, fontFamily: "DM_Sans-Regular"}}>Say hello to your newest financial companion.</p>
        <p className = "text-center" style = {{fontSize: 20, marginTop: -15, paddingBottom: 80, fontFamily: "DM_Sans-Regular"}}>Not only is he cute, but he's here to help you save your money!</p>
          </div>
        <div className = "description-container">

            {/* container 1 */}
          <div className="container-1 ">
              <div className="container-text">
              <h2 className = "description-header">Take hold of your money!</h2>
              <p>Welcome to our cutting-edge personal finance management solution! Picture this: a powerful platform designed to revolutionize the way you manage your finances. Our software not only tracks your accounts and balances but also provides robust user authentication to keep your information secure.</p>
              </div>
              <div className="header-image" style = {{marginTop: 100}}>
              <img src="images/money_pig.png" alt="money_pig"/>
              </div>
          </div>

            {/* container 2 */}
          <div className="container-2 ">
              <ScrollAnimation animateIn="fadeIn">
              <div className="container-text">
              <h2 className = "description-header">Transform your saving goals into delightful adventures with our charming Pig Banks!</h2>
              <p> Each Pig Bank represents a unique savings goal waiting to be achieved. Work diligently towards your goal to unlock exciting accessories and bring your Pig Bank's dream of becoming a real pig to life!</p>
              </div>
            <div className="header-image" style = {{marginTop: 100}}>
            <img src="images/money_pig.png" alt="money_pig"/>
            </div>
              </ScrollAnimation>

           </div>

            {/* container 3 */}
           <div className="container-1 ">
            <div className="container-text">
              <h2 className="description-header">Tend to your stables and watch your savings flourish!</h2>
              <p>With each Pig added to the stable, unlock a plethora of prizes and rewards. Aim high and complete all five saving goal categories, plus other achievements, to uncover special surprises waiting just for you! Start saving today and turn your dreams into reality!</p>
            </div>
            <div className="header-image" style={{ marginTop: 100 }}>
              <img src="images/money_pig.png" alt="money_pig" />
            </div>
          </div>

            <div className="button-container ">
                <h2 className = "get-started-description-header" style={{paddingTop: 60}}> Ready to raise your piggy? </h2>
                <Link to="/createAccount" className="get-started-button">Get Started</Link>
                <footer style={{paddingTop: 60}}>
                    <p>&copy; 2024 Pig E-Bank</p>
                </footer>
            </div>

          </div>
        {/*  button */}
        </div>
        </div>
      
      

  );
}

export default WelcomePage;
