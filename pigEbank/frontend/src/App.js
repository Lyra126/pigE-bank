import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Login from './Login';
import CreateAccount from './createAccount';
import CreateNewGoal from './createNewGoal';
import Aboutus from './Aboutus';
import HomePage from './Homepage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/aboutus" element={<Aboutus />} />
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
