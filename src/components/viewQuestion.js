import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Answered from './answered'
import UnAnswered from './unAnswered'


class ViewQuestion extends Component {

    render() {
        let questionId = this.props.match.params.questionId;
        let isAuthedUserAnswer = this.props.authedUserAnswers.includes(questionId)
        return (
            <Fragment>
                {isAuthedUserAnswer ? <Answered id={questionId} /> : <UnAnswered id={questionId} />}
            </Fragment>
        )
    }

}
function mapStateToProps({ authedUser, users, questions }) {
    let authedUserAnswers = Object.keys(users[authedUser].answers)

    return {
        authedUserAnswers
    }
}

export default connect(mapStateToProps)(ViewQuestion)