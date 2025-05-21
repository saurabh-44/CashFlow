import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import './App.css';
import Dashboard from './components/Dashboard';
import SignUpSignIn from './components/Signup';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <div className="app-container">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <SignUpSignIn />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
