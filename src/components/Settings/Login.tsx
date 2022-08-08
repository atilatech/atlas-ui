import React, {useState} from "react";
import AtilaAPI from "../../services/AtilaAPI";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const login = () => {
        setLoading("Logging in...")
        AtilaAPI
            .login(username, password)
            .then(res => {
                localStorage.setItem("jwt_token", res.token)
            })
            .finally(()=> {
                setLoading("")
            })
    }

    return (
        <div>
            <input className="form-control mb-3"
                   placeholder='Username'
                   value={username}
                   onChange={event => setUsername(event.target.value)} />
            <input className="form-control mb-3"
                   placeholder='Password'
                   type='password'
                   value={password}
                   onChange={event => setPassword(event.target.value)} />
            <button onClick={()=>login()} className="btn btn-primary" disabled={!!loading}>
                Login
            </button>
        </div>
    )
}

export default Login