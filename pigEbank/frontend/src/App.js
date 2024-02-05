import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Login from './Login';
import CreateAccount from './createAccount';
import CreateNewGoal from './createNewGoal';
import AboutUs from './AboutUs';
import HomePage from './HomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/createNewGoal" element={<CreateNewGoal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
