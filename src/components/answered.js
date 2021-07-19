import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import NotFound from './NotFound'


class Answered extends Component {

    render() {
        console.log(this.props)
        if (this.props.ques === null) {
			return <NotFound />;
		}
        const optionOnePercentage = Math.round((this.props.optionOneVotes / this.props.sumVotes) * 100);
		const optionTwoPercentage = Math.round((this.props.optionTwoVotes / this.props.sumVotes) * 100);
        return (
            <div>
                <Card border="primary">
                    <Card.Header>
                        <Card.Img src={`${this.props.questionUser.avatarURL}`}></Card.Img>
                        <Card.Title>{`Asked by ${this.props.ques.author} `}</Card.Title>
                    </Card.Header>
                    <Card.Body  style={{ textAlign: 'center' }}>
                        <Card border="primary">
                            <Card.Header>
                                {`Would You Rather ${this.props.ques.optionOne.text}?`}
                                {this.props.authedUserVoteOptionOne ? (
                                    <span className="text-danger ml-2">
                                        (Your choice)
                                    </span>
                                ) : null}
                            </Card.Header>
                            <ProgressBar
									now={optionOnePercentage}
									label={`${optionOnePercentage}%`}
									variant="info"
								/>
                            <Card.Title>{`${this.props.optionOneVotes} Out Of ${this.props.sumVotes} Votes`}</Card.Title>

                        </Card>
                        <Card border="primary">
                            <Card.Header>
                                {`Would You Rather ${this.props.ques.optionTwo.text}?`}
                                {!this.props.authedUserVoteOptionOne ? (
                                    <span className="text-danger ml-2">
                                        (Your choice)
                                    </span>
                                ) : null}
                            </Card.Header>
                            <ProgressBar
									now={optionTwoPercentage}
									label={`${optionTwoPercentage}%`}
									variant="info"
								/>
                            <Card.Title>{`${this.props.optionTwoVotes} Out Of ${this.props.sumVotes} Votes`}</Card.Title>

                        </Card>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    let ques = questions[id]
    let questionUser = users[ques.author]
    let optionOneVotes = ques.optionOne.votes.length
    let optionTwoVotes = ques.optionTwo.votes.length
    let sumVotes = optionOneVotes + optionTwoVotes
    let authedUserVoteOptionOne = ques.optionOne.votes.includes(authedUser)
    return {
        ques:ques ? ques : null,
        questionUser:ques ? questionUser : null,
        optionOneVotes:ques ? optionOneVotes : null,
        optionTwoVotes:ques ? optionTwoVotes : null,
        sumVotes:ques ? sumVotes : null,
        authedUserVoteOptionOne:ques ? authedUserVoteOptionOne : null,
    }
}

export default connect(mapStateToProps)(Answered)