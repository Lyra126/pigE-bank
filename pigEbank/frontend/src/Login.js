import React, { useState } from 'react'; // Import useState from React
import './Login.css'; // Importing Login specific css
import './bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
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
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pig E-Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="aboutus">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home Page</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

        {/* Main Login Stuff */}
        <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
                {/* Login Message */}
                <h1 className="p-8 text-center login_title_message" style ={{marginTop: 10}}> Howdy! Great to see you again!</h1>
            <div className='p-3 login_box'>
                <form onSubmit={handleSubmit}>
                {/* Logo Image */}
                <img src="images/favicon.ico" alt="pig" className = "login_piggy"/>
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
                        <button className='btn btn-success' style={{ fontFamily: 'DM_Sans-Medium', objectPosition: "center", minWidth: 300}}>Login</button>
                            {/* If username/password is incorrect */}
                            <text style ={{fontSize: 12, marginTop: 4, color: "red", textAlign: 'center'}}>Your username or password is incorrect. Please try again.</text>
                        <text style={{marginTop: 20, marginLeft: 60, marginBottom: 5}}>No account? Make one today!</text>
                        <Link to = "/createAccount" className='btn btn-outline-success' style ={{objectPosition: "center", minWidth: 300}}>Create an Account</Link>
                    </div>
                </form>
             </div>

            </div>
        </div>

        
    )
}

export default Login;
