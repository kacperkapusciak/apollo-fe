import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from 'providers/AuthProvider';

import App from './App';

const app = (
  <AuthProvider>
    <App/>
  </AuthProvider>
);

ReactDOM.render(app, document.getElementById('root'));
