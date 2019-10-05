import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withAuth } from './providers/AuthProvider';

import Login from './pages/Login/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const App = ({ auth }) => (
  <>
    <Navbar />
    {auth.token ? (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect path="/" to="/dashboard" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect path="/" to="/login" />
      </Switch>
    )}
  </>
);

export default withAuth(App);
