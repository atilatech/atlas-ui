import React, {Component} from "react";
import AtilaAPI from "../services/AtilaAPI";

export class Login extends Component<{}, LoginState> {

    constructor(props: any) {
        super(props)

        this.state = {
            loading: "",
            username: "",
            password: "",
        }
    }

    login = () => {
        const { username, password } = this.state;
        this.setState({loading: "Logging in..."})
        AtilaAPI
            .login(username, password)
            .then()
    }

    render() {
        const { loading } = this.state;

        return (
            <button onClick={()=>this.login()} className="btn btn-link" disabled={!!loading}>
                Login
            </button>
        )
    }
}


type LoginState = {
    loading?: string;
    username: string;
    password: string;
}