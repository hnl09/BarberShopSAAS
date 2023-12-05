import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { AppointmentsContextProvider } from './context/appointmentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppointmentsContextProvider>
        <App />
      </AppointmentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
