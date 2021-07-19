import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './user'


class Leaderboard extends Component {
    render() {
        console.log(JSON.stringify(this.props.usersIdsSorted))
        return (
            <div className="container">
                <ul className='dashboard-list'>
                    {this.props.usersIdsSorted.map((id) => (
                        <li key={id}>
                            <User id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    const usersIds = Object.keys(users)

    let answersArr = usersIds.map((user) => {
        let answerLength = Object.keys(users[user].answers).length
        let createdQuestionLength = Object.keys(users[user].questions).length
        let score = answerLength + createdQuestionLength

        return { id: user, score }
    })
    let arr = Object.keys(answersArr)
        .sort((a, b) => answersArr[b].score - answersArr[a].score)

    let usersIdsSorted = arr.map((num) => {
        let numa = parseInt(num)
        return answersArr[numa].id
    })
    return {
        usersIdsSorted

    }
}

export default connect(mapStateToProps)(Leaderboard)