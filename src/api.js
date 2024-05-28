import axios from 'axios';

export const sendGoogleTokenToBackend = (token) => {
  axios.post('http://your-backend.com/auth/google', {
    token: token,
  })
  .then(response => {
    console.log('Backend response:', response);
  })
  .catch(error => {
    console.error('Backend error:', error);
  });
};
