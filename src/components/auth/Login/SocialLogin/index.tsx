import { useAuth } from 'lib/auth/useAuth';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import React from 'react';

function SocialLogin() {
  const { googleLogin, facebookLogin } = useAuth();

  const onGgSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    googleLogin(id_token);
  }

  const onFbSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;
    facebookLogin(accessToken, userID);
  }

  return (
    <React.Fragment>
      <div className='my-2'>
        <GoogleLogin
          client_id="116919744253-rtafb61g0vqrls3clr774ke3hop6dref.apps.googleusercontent.com"
          cookiepolicy='single-host-origin'
          onSuccess={onGgSuccess}
        />
      </div>
      <div className='my-2'>
        <FacebookLogin
          appId="782525139442678"
          onSuccess={onFbSuccess}
        />
      </div>
    </React.Fragment>
  )
}

export default SocialLogin