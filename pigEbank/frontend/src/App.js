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
import Settings from './Settings';
import AccountRecovery from './AccountRecovery';
import ResetPassword from './ResetPassword';
import SecurityQuestions from './SecurityQuestions';


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
          <Route path="/settings" element={<Settings />} />
          <Route path="/accountRecovery" element={<AccountRecovery />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/securityQuestions" element={<SecurityQuestions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
