import React, { useState } from 'react';
// import UserProfileService from './UserProfileService';

interface Props {}

const Register: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // UserProfileService.create({username, email, password});
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
                <div className="form-group">
                    <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button className="btn btn-link" type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"} Password
                    </button>
                </div>
                <button className="btn btn-primary" type="submit">Create</button>
            </form>
        </div>
        
    );
};

export default Register;