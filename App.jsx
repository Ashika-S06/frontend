import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useAppContext } from './src/context/AppContext';
import AppRouter from './src/router/AppRouter';

const AuthInit = ({ children }) => {
  const { dispatch } = useAppContext();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      import('./src/services/api').then(({ getMeAPI }) => {
        getMeAPI().then(res => {
          dispatch({ type: 'SET_AUTH', payload: { role: res.data.data.role, token } });
        }).catch(() => {
          localStorage.removeItem('token');
        });
      });
    }
  }, []);
  return children;
};

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <AuthInit>
        <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Segoe UI, sans-serif' }}>
          <AppRouter />
        </div>
      </AuthInit>
    </BrowserRouter>
  </AppProvider>
);

export default App;
