import React, { useState, useEffect } from 'react';
import "./updatePassword.css";
import axios from 'axios';


function PasswordModal({ setOpenPasswordModal }) {
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
        axios.put("/accounts/updatePassword", {email: email, password: password})
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setOpenPasswordModal(false);
    }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenPasswordModal(false);}}>X</button>
        </div>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                            <label htmlFor='password'>New Password</label>
                            <input type='password' placeholder='Enter New Password' className='form-control'
                                onChange={e => setPassword(e.target.value)} required pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/>
                                <p className = "instruction"> Password must include upper case, lower case, a number, a special character, and must be at least 8 characters long </p>
                </div>

                <div className="footer">
                  <button onClick={() => {setOpenPasswordModal(false);}}id="cancelBtn">Cancel</button>
                  <button className='btn btn-success'>Update</button>
                  
                </div>
            </form>
      </div>
    </div>
  );
}

export default PasswordModal;