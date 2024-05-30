import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import LoginPage from './components/LoginPage';
import ProtectedPage from './components/ProtectedPage';
import ProtectedRoute from './components/ProtectedRoute';
import { setUser } from './redux/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      try {
        const userObject = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (userObject.exp > currentTime) {
          dispatch(setUser(userObject));
        } else {
          Cookies.remove('jwtToken');
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/protected" 
        element={
          <ProtectedRoute>
            <ProtectedPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
