import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Cookies from 'js-cookie';

const ProtectedPage = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove('jwtToken');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user?.name}</p>
      <p>Username: {user?.given_name}</p>
      <p>Last Name: {user?.family_name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
