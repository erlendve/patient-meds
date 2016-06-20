import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import MainContainer from '../containers/MainContainer'
import PatientsContainer from '../containers/PatientsContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={PatientsContainer} />
    </Route>
  </Router>
)

module.exports = routes
