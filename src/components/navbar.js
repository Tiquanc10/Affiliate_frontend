import React, { Fragment } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Container className='products'>
                    <Navbar.Brand as={Link} to="/">Welcome to TCVISIONS Picks!</Navbar.Brand>
                </Container>
            </Navbar>

            <Outlet />
        </Fragment>
    )
}