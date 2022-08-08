import React from 'react';
import Login from "./Login";

function Settings() {

    const isLoggedIn = localStorage.getItem("jwt_token")

    if (!isLoggedIn) {
        return (
            <div className="Settings">
                <Login />
            </div>
        )
    }

    const logOut = () => {
        localStorage.removeItem("jwt_token")
        window.location.reload()
    }

    return (
        <div className="Settings">
            <button onClick={()=>logOut()} className="btn btn-primary">
                Log out
            </button>
        </div>
    )
}

export default Settings