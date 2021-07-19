import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }
    handleChangeOptionOneText = (e) => {
        const optionOneText = e.target.value

        this.setState(() => ({
            optionOneText
        }))
    }
    handleChangeOptionTwoText = (e) => {
        const optionTwoText = e.target.value

        this.setState(() => ({
            optionTwoText
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state

        const { dispatch } = this.props


        this.setState({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        },() => dispatch(handleAddQuestion(optionOneText, optionTwoText)))
        
    }
    render() {
        const { optionOneText, optionTwoText, toHome } = this.state
      
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit} className="row g-3 border p-2 m-5">
                    <h1 className="border-bottom text-center">Create New Question</h1>
                    <h3>Complete the question</h3>
                    <h2 className='center'>Would You Rather...</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Add option1" value={optionOneText} onChange={this.handleChangeOptionOneText} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text className="text-muted text-center">
                            OR
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Add option2" value={optionTwoText} onChange={this.handleChangeOptionTwoText} />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={optionOneText === '' || optionTwoText === ''}>
                        Submit
                    </Button>
                </Form>
            </div>


        )
    }
}

export default connect()(NewQuestion)