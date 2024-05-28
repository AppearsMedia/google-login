import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { sendGoogleTokenToBackend } from './api';

const CLIENT_ID = '592014387547-coftp5qg5l1bhpk3puf7g599iqvio5f8.apps.googleusercontent.com';

const GoogleLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const responseGoogle = (response) => {
    
    if (response.profileObj) {
      setIsLoggedIn(true);
      setUser(response.profileObj);

      // Extract the token and send it to the backend
      const token = response.tokenId;
      sendGoogleTokenToBackend(token);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;
