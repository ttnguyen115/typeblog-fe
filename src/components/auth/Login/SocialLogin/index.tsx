import { useAuth } from 'lib/auth/useAuth';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';

function SocialLogin() {
  const { googleLogin } = useAuth();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    googleLogin(id_token);
  }

  return (
    <div className='my-2'>
      <GoogleLogin
        client_id="116919744253-rtafb61g0vqrls3clr774ke3hop6dref.apps.googleusercontent.com"
        cookiepolicy='single-host-origin'
        onSuccess={onSuccess}
      />
    </div>
  )
}

export default SocialLogin