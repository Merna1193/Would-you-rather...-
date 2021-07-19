import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { reSetAuthedUser } from '../actions/authedUser';

function Navigation(props) {
    const { user, dispatch } = props;
    console.log(props)
    const handleLogout = () => {
        dispatch(reSetAuthedUser());
    };

    return (
        <Fragment>
            <Navbar expand="lg" bg="light" variant="light" className="my-3 border">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto flex-grow-1">
                        <Nav.Link as={NavLink} to="/" exact>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add">
                            New Question
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/leaderboard">
                            Leaderboard
                        </Nav.Link>
                    </Nav>
                    <Nav className="align-items-start justify-content-end">
                        <img alt={`${user.name}`} src={user.avatarURL} className="navAvatar" />
                        <Navbar.Text>{user.name}</Navbar.Text>
                        <Button
                            variant="outline-dark"
                            onClick={handleLogout}
                            className="mx-3"
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
}

function mapStateToProps({ users, authedUser }) {
    return {
        user: users[authedUser]
    };
}

export default connect(mapStateToProps)(Navigation);
