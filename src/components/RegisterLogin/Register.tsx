import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserProfileService } from '../../services/UserProfileService';
// import UserProfileService from './UserProfileService';

interface Props {}

const Register: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await UserProfileService.create(email, username, password);
        console.log({response});
    }

    return (
        <div className="Atlas container card shadow my-5 p-5">
            <form className="form-group row p-3" onSubmit={handleSubmit}>
                <label>
                    <input className="col-12 my-3 form-control" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    <input className="col-12 my-3 form-control" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <div className="col-10 input-group mb-3">
                    <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button className="input-group-text" onClick={(event) =>  {event.preventDefault(); setShowPassword(!showPassword)}}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <div className='mb-3'>
                    <button className="btn btn-primary form-control" type="submit">Register</button>
                </div>
                <hr/>
                <Link to="/login"> Already have an account? Login
                </Link>
            </form>
        </div>
        
    );
};

export default Register;