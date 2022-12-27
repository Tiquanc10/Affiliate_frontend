import React, { Component } from "react";
import AuthForm from "./AuthForm";


export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <AuthForm />
            </div>
    );
    }
}