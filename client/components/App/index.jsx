// @flow
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from '../../routes/login';
import Main from '../../routes/main';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/main" component={Main} />
        <Redirect exact path="" to="/main" />
      </Switch>
    </Router>
  );
}
