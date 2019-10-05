import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './providers/AuthProvider';

import './index.css';

const app = (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
