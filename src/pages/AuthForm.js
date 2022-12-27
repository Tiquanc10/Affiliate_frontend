import React, { Component } from 'react';
import axios from 'axios';
import {Form, Container, Button} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loggedin: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post("http://127.0.0.1:5000/login", user)
            .then(response =>
                response.data.LOGGED_IN === true ?
                this.setState({
                    loggedin: true
                })
                :
                null
            )
            .catch(error => 
                console.error(error))
    }


    render() {
        return (
            <Container fluid className='mt-4'>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control as="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />

                    <Form.Label>Password</Form.Label>
                    <Form.Control as="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <div>
                        <Button type="submit">Login</Button>
                    </div>
                  {this.state.loggedin && <Navigate to="/admin"/>}  
                </Form>
            
            </Container>
        );
    }
}