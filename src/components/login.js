import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
    state = {
		errorMsg: '',
	};

	handleSubmit = (e) => {
		const userID = this.userID.value;
		const { dispatch } = this.props;

		e.preventDefault();

		if (userID !== '') {
			dispatch(setAuthedUser(userID));
		} else {
			this.setState({ errorMsg: 'You must choose a username' });
		}
	};
    render() {
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit} className="row g-3 border p-2 m-5">
                    <h1 className="border-bottom text-center">Login</h1>
                    <img src="/logo512.png" alt="React logo " />
                    <Form.Control
                        as="select"
                        ref={(id) => (this.userID = id)}
                    >
                        <option value="">Select user</option>
                        {this.props.userIds.map((id) => (
                            <option value={this.props.users[id].id} key={id}>
                                {this.props.users[id].name}
                            </option>
                        ))}
                    </Form.Control>
                    <Button variant="primary" type="submit" >
                        Sign in
                    </Button>
                </Form>
            </div>
        )
    }

}

function mapStateToProps({users}) {
    let userIds = Object.keys(users)
    return {
        userIds,
        users
    }
}

export default connect(mapStateToProps)(Login)