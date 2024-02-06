import React from 'react';
import './AboutUs.css'; // Import a separate CSS file for component-specific styles

function Aboutus() {
  return (
    <div>
      {/* Navigation bar */}
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

      {/* About Us */}
      <div className = "gradient_bg_green d-flex flex-column justify-content-center">
        {/* Header */}
      <div className="container" style = {{fontFamily: "DM_Sans-Regular"}}>
        <div>
            <h1 style ={{fontSize: 60, marginTop: 80, textAlign: 'center', fontFamily: "Poppins-SemiBold"}}>So, why Pig E-Bank?</h1>
            <h2 style ={{fontSize: 30, textAlign: 'center', fontFamily: "DM_Sans-Regular", marginTop: 25}}>Well, we're really bad saving money.</h2>
            <p style = {{fontSize: 30, textAlign: 'center', marginTop: -10}}>So, we made a website that helps take care of that. </p>
            <p style = {{textAlign: 'center'}}>
            We propose a unique way to save money that not only keeps track of your balances, but also has the ability to prevent withdrawals until your savings goal has been met. We modeled our website after a real piggy bank, encouraging users to stay on track to their financial goals.               </p>
        </div>
        </div>
        <img src="team_pig_horizontal.png" alt = "team_piggy"/>
        {/* Clarissa */}
        <section className="developer-section">
          <h2 style ={{marginTop: 40, fontSize: 45, textAlign: 'center', fontFamily: "Poppins-SemiBold", marginBottom: 20}}>Who's in our team?</h2>
          <div className = "developer-container">
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Clarissa Cheung</h2>
            <img src="luxray.jpg" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>2nd year computer science major and economics minor.</p>
            <br/>
              <section className = "socials">
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Rachel */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Rachel Pu</h2>
            <img src="Rachel_Pu.png" alt="Rachel Pu"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}> Hello! I'm Rachel Pu, and I'm currently a 2nd year Computer Science major at UF. I enjoy drawing colorful, silly pigs and eating bacon.</p>
              <section className = "socials">
            <a href="https://instagram.com/kazuhimi"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://www.linkedin.com/in/rachel-pu-ufl/"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Ibet */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Ibet Gonzalez</h2>
            <img src="money_pig.png" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>Developer 3</p>
            <section className = "socials">
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Michael */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Michael Knauf</h2>
            <img src="money_pig.png" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>Developer 4</p>
            <section className = "socials">
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          </div>
        </section>
        <br/>
        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
      
    </div>
  </div>
  );
}

export default Aboutus;
