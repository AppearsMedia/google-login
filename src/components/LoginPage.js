import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/protected');
    }
  }, [user, navigate]);

  const handleCallbackResponse = (token) => {
    try {
      const userObject = jwtDecode(token);
      dispatch(setUser(userObject));
      Cookies.set('jwtToken', token, { expires: 1 / 24 });
      console.log(userObject);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={credentialResponse => handleCallbackResponse(credentialResponse.credential)}
        onError={() => console.log('Login Failed')}
      />
    </>
  );
};

export default LoginPage;
