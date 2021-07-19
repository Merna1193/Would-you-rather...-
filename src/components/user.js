import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap';

class User extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Card border="primary">
                    <Card.Header>{`${this.props.user.name}`}</Card.Header>
                    <Card.Body>
                        <Card.Img src={`${this.props.user.avatarURL}`}></Card.Img>
                      
                        <Card.Text>
                        {`Answered Questions : ${this.props.user.answersLength} `}
                        </Card.Text>
                        <Card.Text>
                        {`Created Questions : ${this.props.user.createdQustionsLength} `}
                        </Card.Text>
                        <Card.Text>
                        {`Score : ${this.props.user.score} `}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

function mapStateToProps({users},{id}) {
    let user = users[id]
    let userAnswersLength=Object.keys(users[id].answers).length
    let userCreatedQustionsLength=Object.keys(users[id].questions).length
    let userScore= userAnswersLength + userCreatedQustionsLength
    user.answersLength=userAnswersLength
    user.createdQustionsLength=userCreatedQustionsLength
    user.score=userScore
    return {
        user
    }
}

export default connect(mapStateToProps)(User)