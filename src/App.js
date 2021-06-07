import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from './components/Index';
import Applicant from './components/Applicant';
import Create from './components/Create';
import Edit from './components/Edit';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/applicant/:id" component={Applicant} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  )
}

export default App