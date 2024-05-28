import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const App = () => {

  const [user, setUser] = useState({})


  const handleCallbackResponse = (token) => {
    console.log(token);
    let userObject = jwtDecode(token)

    // setUser(userObject)
    console.log(userObject)
  };


  return (
    <GoogleOAuthProvider clientId="592014387547-4ignro9ukodcue88pchph53c0v02ne9t.apps.googleusercontent.com">
      <h1>Login button</h1>
      <GoogleLogin
        onSuccess={credentialResponse => {
          handleCallbackResponse(credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />;
    </GoogleOAuthProvider>
  );
};

export default App;
