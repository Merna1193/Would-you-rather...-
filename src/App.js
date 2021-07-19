import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Login from './components/login';
import ComponentApp from './components/ComponentApp';
import { handleInitialData } from './actions/shared'
import { LoadingBar } from 'react-redux-loading-bar'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser, loadingBar } = this.props;

        if (loadingBar.default === undefined || loadingBar.default === 1) {
            //loading
            return (
                <LoadingBar />
            );
        } else {
            return <Fragment>{!authedUser ? <Login /> : <ComponentApp />}</Fragment>;
        }
    }
}

function mapStateToProps({ authedUser, loadingBar }) {
    return {
        authedUser,
        loadingBar
    };
}

export default connect(mapStateToProps)(App);
