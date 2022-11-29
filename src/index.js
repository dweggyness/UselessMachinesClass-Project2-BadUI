import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from 'react-helmet';
import './index.css';
import App from './App';
import './styles/globals.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet>
        <title>My Title</title>
    </Helmet>
    <App />
  </React.StrictMode>
);