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
        //add data validation somewhere here
    }
    
    return(
        <div className='gradient_bg_green d-flex flex-column vh-100 justify-content-center align-items-center'>
            <nav className="navbar">
                 <text className ="site-title"> lallala</text>
            </nav>

                {/* Pig E-Bank Title*/} 
                <h2 className="p-8 text-center w-25">Pig E-Bank</h2>
                <h1 className="p-8 text-center "> Howdy! Great to see you again!</h1>
            <div className='p-3 login_box'>
                <form onSubmit={handleSubmit}>
                {/* Logo Image */}
                <img src="favicon.ico" alt="pig" className = "login_piggy"/>
                    <div className='mb-3'>
                        <label htmlFor='username'>Username</label>
                        <input type='username' placeholder='Enter Username' className='form-control'
                        onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className = 'd-flex flex-column'>
                        <button className='btn btn-success'>Login</button>
                        <text>No account? Make one today!</text>
                        <button className='btn btn-success'>Create an Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
