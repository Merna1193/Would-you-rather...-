import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom'

class Question extends Component {

    render() {
        console.log(this.props)
        return (
            <Fragment>
                <Card border="primary">
                    <Card.Header>{`${this.props.ques.author} Asks`}</Card.Header>
                    <Card.Body>
                        <Card.Img src={`${this.props.questionUser.avatarURL}`}></Card.Img>
                        <Card.Title>Would You Rather....?</Card.Title>
                        <Card.Text>
                            {`${this.props.ques.optionOne.text} `}
                        </Card.Text>
                        <Link to={`/questions/${this.props.ques.id}`}>
                        <Button variant="outline-dark">View Poll</Button>
                        </Link>
      
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }

}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    let ques = questions[id]
    let questionUser = users[ques.author]

    return {
        ques,
        authedUser,
        questionUser
    }
}

export default connect(mapStateToProps)(Question)