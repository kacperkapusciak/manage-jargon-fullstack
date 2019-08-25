import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Redirect path="/" exact to="/dashboard" />
  </Router>
);

export default App;
