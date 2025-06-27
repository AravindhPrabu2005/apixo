import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/Signup';
import LoginPage from './components/Loginpage';
import Home from './components/Home';
import Landing from './components/Lander';
import Logs from './components/Logs';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing /> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<PrivateRoute element={<Home /> } />} />
        <Route path="/logs" element={<PrivateRoute element={<Logs /> } />} />
      </Routes>
    </Router>
  );
}

export default App;
