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
        <div> 
            {/* navigation bar */}
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link" href="createAccount">Home Page</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="Homepage">About Us</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        {/* Main Login Stuff */}
        <div className='gradient_bg_green d-flex flex-column vh-100 justify-content-center align-items-center'>
                {/* Login Message */}
                <h1 className="p-8 text-center login_title_message"> Howdy! Great to see you again!</h1>
            <div className='p-3 login_box'>
                <form onSubmit={handleSubmit}>
                {/* Logo Image */}
                <img src="favicon.ico" alt="pig" className = "login_piggy"/>
                    <div className='mb-3'>
                        <label htmlFor='username' style={{ fontFamily: 'DM_Sans-Medium' }}>Username</label>
                        <input type='username' placeholder='Enter Username' className='form-control'
                        onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' style={{ fontFamily: 'DM_Sans-Medium' }}>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className = 'd-flex flex-column'>
                        <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium' }}>Login</button>
                            {/* If username/password is incorrect */}
                            <text style ={{fontSize: 12, marginTop: 4, color: "red"}}>Your username or password is incorrect. Please try again.</text>
                        <text style={{marginTop: 20, marginLeft: 60}}>No account? Make one today!</text>
                        <button className='btn btn-outline-success'>Create an Account</button>
                    </div>
                </form>
             </div>
            </div>
        </div>
    )
}

export default Login;
