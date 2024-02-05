import React from 'react';
import './AboutUs.css'; // Import a separate CSS file for component-specific styles

function Aboutus() {
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

      <div className = "gradient_bg_green d-flex flex-column justify-content-center">
      <div className="container" style = {{fontFamily: "DM_Sans-Regular"}}>
        <header>
          <h1 style ={{fontSize: 50, marginTop: 80, textAlign: 'center', fontFamily: "Poppins-SemiBold"}}>About Us</h1>
          <p>We propose a new and unique personal finance management software. Not only does this software keep track of users, their account balances, and implements user authentication, but its core feature is that it has the ability to create savings goals that prevent withdrawals until the goal is met, preventing the user from spending their hard earned money on unnecessary items. The UI is modeled after a "Piggy bank" aesthetic, encouraging users to stay on track to their financial goals To enhance security, a lock feature on the user’s savings will be implemented, however in emergencies, we will implement a perma-lock and emergency lock to allow the user to access any necessary funds. Users can contribute to their savings via a cartoon UI, and an optional automatic mode ensures discretion by not displaying the amount. A dynamic progression bar visually represents the percentage of goal fulfillment.</p>
        </header>
        </div>
        <br/>

        {/* Clarissa */}
        <section className="container" style = {{textAlign: "center"}}>
          <h2 style ={{fontSize: 35, textAlign: 'center', fontFamily: "Poppins-SemiBold", marginBottom: 20}}>Who's in our team?</h2>
          <div className = "d-flex">
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, minWidth: 300}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Clarissa Cheung</h2>
            <img src="luxray.jpg" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>2nd year computer science major and economics minor.</p>
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
          </div>

          {/* Rachel */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, minWidth: 300}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Rachel Pu</h2>
            <img src="Rachel_Pu.png" alt="Rachel Pu"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}> Hello! I'm Rachel Pu, and I'm currently a 2nd year Computer Science major at UF.</p>
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
          </div>

          {/* Ibet */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, minWidth: 300}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Ibet Gonzalez</h2>
            {/* Add Image */}
            <p style ={{margin: 15}}>Developer 3</p>
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
          </div>

          {/* Michael */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, minWidth: 300}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Michael Knauf</h2>
            {/* Add Image */}
            <p style ={{margin: 15}}>Developer 4</p>
            <a href="https://instagram.com"><img src = "instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "linkedIn_logo.png" width="40" height="40"/></a>
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
