import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import UserProfileService from './UserProfileService';

interface Props {}

const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className="Atlas container card shadow my-5 p-5">
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input className="form-control" id="emailOrUsername" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <label htmlFor="emailOrUsername">Email or Username</label>
                </div>
                <div className="col-10 input-group mb-3">
                    <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button className="input-group-text" onClick={(event) =>  {event.preventDefault(); setShowPassword(!showPassword)}}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button className="btn btn-primary col-12" type="submit">Login</button>
                <hr/>
                <Link to="/register"> Don't have an account? Register
                </Link>
            </form>
        </div>
        
    );
};

export default Login;