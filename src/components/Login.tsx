import React, {Component} from "react";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export class Login extends Component<{}, LoginProps> {

    constructor(props: any) {
        super(props)

        this.state = {
            loading: ""
        }
    }

    login = () => {

    }

    render() {
        // @ts-ignore (temp)
        const { loading } = this.state;

        return (
            <button onClick={()=>this.login()} className="btn btn-link" disabled={loading}>
                Login
            </button>
        )
    }
}


interface LoginProps {

}