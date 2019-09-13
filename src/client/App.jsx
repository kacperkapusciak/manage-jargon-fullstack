import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { AuthProvider } from './providers/AuthProvider';

import Login from './pages/Login/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const App = () => (
  <AuthProvider>
    <Navbar />
    <Router>
      <Redirect path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </AuthProvider>
);

export default App;
