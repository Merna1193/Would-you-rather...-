import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleSaveAnswerQuestion } from '../actions/questions'
import { Card } from 'react-bootstrap';
import NotFound from './NotFound'

class UnAnswered extends Component {
    state = {
        errorMsg: '',
    }

    handleSubmit = (qid, e) => {
        const answer = this.form.answer.value;
        console.log("++++++++++++++++++" + answer)
        console.log("++++++++++++++++++" + qid)
        console.log(this.props)
        const { dispatch, authedUser } = this.props;

        e.preventDefault();

        if (answer !== '') {
            dispatch(handleSaveAnswerQuestion(
                {
                    authedUser,
                    qid,
                    answer
                }));
        } else {
            this.setState({ errorMsg: 'You must make a choice' });
        }
    };
    render() {
        console.log(this.props)
        if (this.props.question === null) {
            return <NotFound />;
        }
        return (
            <div>
                <Card border="primary">
                    <Card.Header>
                        <Card.Img src={`${this.props.user.avatarURL}`}></Card.Img>
                        <Card.Title>{`Asked by ${this.props.question.author} `}</Card.Title>
                    </Card.Header>
                    <Card.Body style={{ textAlign: 'center' }}>
                        <Form
                            onSubmit={(e) => this.handleSubmit(this.props.question.id, e)}
                            className="row g-3 border p-2 m-5"
                            ref={(f) => (this.form = f)}>

                            <Form.Check
                                custom
                                type="radio"
                                id="optionOne"
                                label={this.props.question.optionOne.text}
                                value="optionOne"
                                name="answer"
                                className="mb-2"

                            />

                            <Form.Check
                                custom
                                type="radio"
                                id="optionTwo"
                                label={this.props.question.optionTwo.text}
                                value="optionTwo"
                                name="answer"
                                className="mb-2"

                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id];
    const user = users[authedUser]

    return {
        question:  question ? question : null,
        author:  question ? users[question.author] : null,
        authedUser:question ? authedUser : null,
        user:question ? user : null,
    };
}


export default connect(mapStateToProps)(UnAnswered)