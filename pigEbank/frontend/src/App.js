import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Login from './Login';
import CreateAccount from './createAccount';
import CreateNewGoal from './createNewGoal';
import Aboutus from './AboutUs';
import Dashboard from './Dashboard';
import PigInfo from './PigInfo';
import Profile from './Profile';
<<<<<<< HEAD
=======
import Calculator from './Calculator';
import Settings from './Settings';
>>>>>>> refs/remotes/origin/main

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/PigInfo/:pigName" element={<PigInfo />} />
          <Route path="/createNewGoal" element={<CreateNewGoal />} />
          <Route path="/Profile" element={<Profile />} />
<<<<<<< HEAD
=======
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/settings" element={<Settings />} />
>>>>>>> refs/remotes/origin/main
        </Routes>
      </Router>
    </div>
  );
}

export default App;
