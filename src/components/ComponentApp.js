import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard'
import NewQuestion from './newQuestion'
import ViewQuestion from './viewQuestion'
import Leaderboard from './leaderboard'
import Navigation from './Navigation'
import NotFound from './NotFound'

class ComponentApp extends Component {

  render() {
    return (
      <Router>
        <Fragment>

          <div className='container margin20'>
            <Navigation />
            <div>
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:questionId' component={ViewQuestion} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}



export default ComponentApp