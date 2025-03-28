import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./scss/style.css";
import reportWebVitals from './reportWebVitals';
import GenerateRoutes from './routing/GenerateRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from './context/Auth.context';
import { LeagueStateProvider } from './context/League.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthenticationProvider>
        <LeagueStateProvider>
          <GenerateRoutes />
        </LeagueStateProvider>
      </AuthenticationProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
