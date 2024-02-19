import React from 'react';
import './AboutUs.css'; // Import a separate CSS file for component-specific styles

function Aboutus() {
  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pig E-Bank</a>
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
      <div className = "d-flex flex-column justify-content-center" style = {{marginTop: -35}}>
        {/* Header */}
      <div className="container" style = {{fontFamily: "DM_Sans-Regular"}}>
        <div>
            <h1 style ={{fontSize: 60, marginTop: 80, textAlign: 'center', fontFamily: "PaytoneOne-Regular"}}>So, why Pig E-Bank?</h1>
            <h2 style ={{fontSize: 30, textAlign: 'center', fontFamily: "DM_Sans-Regular", marginTop: 25}}>Well, we're really bad saving money.</h2>
            <p style = {{fontSize: 30, textAlign: 'center', marginTop: -10}}>So, we made a website that helps take care of that. </p>
            <p style = {{textAlign: 'center', paddingTop: 15, paddingBottom: 15}}> As college students, we have to balance a lot of different financial things, whether that's getting groceries, purchasing new textbooks, or paying rent. Sometimes, it's hard to keep track of our money, especially if we're trying to save up for our own personal stuff. Many popular savings websites are boring, and sometimes we want to be rewarded for the money we save. So our team proposed a unique way to save money that not only keeps track of your balances, but also makes it fun!</p>
            <p style = {{textAlign: 'center'}}> We took inspiration from our childhood games, changing it up to help us out with our finances. We've customized Pig E-Bank to feel fun and engaging, allowing for people of all ages to take charge of their money. We understand that saving money can be difficult (we're college students, we know), but that doesn't mean it should feel boring! </p>
            </div>
        </div>
        <img src="images/team_pig_horizontal.png" alt = "team_piggy"/>

        {/* Clarissa */}
        <section className="developer-section">
          <h2 style ={{marginTop: 40, fontSize: 45, textAlign: 'center', fontFamily: "Poppins-SemiBold", marginBottom: 20}}>Who's in our team?</h2>
          <div className = "developer-container">
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Clarissa Cheung</h2>
            <img src="images/CC.jpg" alt="CC"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>Hi! I'm Clarissa Cheung, and I'm a 2nd year computer science major and economics minor at UF.</p>
            <br/>
              <section className = "socials">
            <a href="https://instagram.com/clynae2"><img src = "images/instagram_logo.png" width="50" height="50"/></a>
            <a href="www.linkedin.com/in/clarissa-cheung2"><img src = "images/linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Rachel */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Rachel Pu</h2>
            <img src="images/Rachel_Pu.png" alt="Rachel Pu"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}> Hello! I'm Rachel Pu, and I'm a 2nd year Computer Science major at UF. I enjoy drawing colorful, silly pigs and giving them sunglasses.</p>
              <section className = "socials">
            <a href="https://instagram.com/kazuhimi"><img src = "images/instagram_logo.png" width="50" height="50"/></a>
            <a href="https://www.linkedin.com/in/rachel-pu-ufl/"><img src = "images/linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Ibet */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, marginRight: 10, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Ibet Gonzalez</h2>
            <img src="images/money_pig.png" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>Hello! I'm Ibet Gonzalez, and I'm a 4th year Computer Science major at UF.</p>
            <section className = "socials">
            <a href="https://instagram.com"><img src = "images/instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "images/linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>

          {/* Michael */}
          <div className="developer gradient_bg_white_transparent box_shadow" style = {{borderRadius: 12, width: 280}}>
            <h2 style = {{fontFamily: "DM_Sans-Medium", marginTop: 20}}>Michael Knauf</h2>
            <img src="images/money_pig.png" alt="luxray"  width="200" height="200" className = "developer-img"/>
            <p style ={{margin: 15}}>Developer 4</p>
            <section className = "socials">
            <a href="https://instagram.com"><img src = "images/instagram_logo.png" width="50" height="50"/></a>
            <a href="https://linkedIn.com"><img src = "images/linkedIn_logo.png" width="40" height="40"/></a>
              </section> 
          </div>
          </div>
        </section>
        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
    </div>
  </div>
  );
}

export default Aboutus;
