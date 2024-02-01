import React, { useState } from 'react'; // Import useState from React
import './bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login(){
    const [username, setUsername] = useState(''); // Define username state
    const [password, setPassword] = useState(''); // Define password state

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/login', {username, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
    return(
        <div className='d-flex vh-100 justify-content-center align-items-center bg-success'> {/* Change bg-primary to bg-success */}
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='username'>Username</label>
                        <input type='username' placeholder='Enter Username' className='form-control'
                        onChange={u => setUsername(u.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'/>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
