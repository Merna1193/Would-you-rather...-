import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Question from './questions'


class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="container">
        <Tabs >
          <TabList>
            <Tab label="UNAnswered Questions">UNAnswered Questions</Tab>
            <Tab label="Answered Questions">Answered Questions</Tab>
          </TabList>
          <TabPanel>
            <ul className='dashboard-list'>
              {this.props.unansweredQuestionIds.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className='dashboard-list'>
              {this.props.answeredQuestionIds.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </TabPanel>

        </Tabs>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const questionsIds = Object.keys(questions)
  const authedUserAnswers = Object.keys(users[authedUser].answers)
  const answeredQuestionIds = questionsIds
    .filter((id) => authedUserAnswers.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestionIds = questionsIds
    .filter((id) => !authedUserAnswers.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  }
}

export default connect(mapStateToProps)(Dashboard)