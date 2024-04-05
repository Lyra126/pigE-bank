import React, { useState} from 'react';
import "./updateUsername.css";
import axios from 'axios';


function UsernameModal({ setOpenUsernameModal }) {
    const [username, setUsername] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
        axios.put("/accounts/updateUsername", {email: email, username: username})
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setOpenUsernameModal(false);
        window.location.reload();
    }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenUsernameModal(false);}}>X</button>
        </div>
            <form onSubmit={handleSubmit}>

                <div className='input-field'>
                    <label htmlFor='username'>New Username</label>
                    <input type='username' placeholder='Enter Username' className='form-control'
                    onChange={e => setUsername(e.target.value)} required pattern="[a-zA-Z0-9]{4,10}"/>
                    <p className = "instruction"> Username must be 4-10 characters long and must contain only letters and numbers </p>                
                </div>

                <div className="footer">
                  <button onClick={() => {setOpenUsernameModal(false);}}id="cancelBtn">Cancel</button>
                  <button className='btn btn-success'>Update</button>
                  
                </div>
            </form>
      </div>
    </div>
  );
}

export default UsernameModal;