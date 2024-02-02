import React from 'react';

function Homepage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success"> {/* Use bg-success for background color */}
        <div className="container-fluid">
          <a className="navbar-brand" href="Homepage">Website Description</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="Login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="createAccount">Create Account</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      <div className="container">
        <header>
          <h1>Pig E-Bank</h1>
          <p>We propose a comprehensive personal finance management software. Not only does this software keep track of users, their account balances, and implements user authentication, but its core feature is that it has the ability to create savings goals that prevent withdrawals until the goal is met, preventing the user from spending their hard earned money on unnecessary items. The UI is modeled after a "Piggy bank" aesthetic, encouraging users to stay on track to their financial goals To enhance security, a lock feature on the user’s savings will be implemented, however in emergencies, we will implement a perma-lock and emergency lock to allow the user to access any necessary funds. Users can contribute to their savings via a cartoon UI, and an optional automatic mode ensures discretion by not displaying the amount. A dynamic progression bar visually represents the percentage of goal fulfillment.</p>
        </header>
        <br/>
        <section className="container">
          <div className="developer">
            <h2>Clarissa Cheung</h2>
            <img src="luxray.jpg" alt="luxray"  width="300" height="300"/>
            <p>2nd year computer science major and economics minor.</p>
          </div>
          <div className="developer">
            <h2>Rachel Pu</h2>
            {/* Add Image */}
            <p>Developer 2</p>
          </div>
          <div className="developer">
            <h2>Ibet Gonzalez</h2>
            {/* Add Image */}
            <p>Developer 3</p>
          </div>
          <div className="developer">
            <h2>Michael Knauf</h2>
            {/* Add Image */}
            <p>Developer 4</p>
          </div>
        </section>

        <footer>
          <p>&copy; 2024 Pig E-Bank</p>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
