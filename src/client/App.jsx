import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withAuth } from './providers/AuthProvider';

import Navbar from './components/Navbar';

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = ({ auth }) => (
  <>
    <Navbar />
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        {auth.token ? (
          <>
            <Route path="/dashboard" component={Dashboard} />
            <Redirect path="/" to="/dashboard" />
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect path="/" to="/login" />
          </>
        )}
      </Switch>
    </Suspense>
  </>
);

export default withAuth(App);
