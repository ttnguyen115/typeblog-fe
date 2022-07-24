import LoginPass from "components/auth/Login/LoginPass";
import LoginSMS from "components/auth/Login/LoginSMS";
import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [sms, setSms] = React.useState(false);
  const { data: user } = useQuery('user');

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <LoginWrapper className="container">
      <LoginContainer>
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        {sms ? <LoginSMS /> : <LoginPass />}

        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to='/forgot_password' className="col-6">
              Forgot password?
            </Link>
          </span>

          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          You don't have an account?
          <Link to={`/register`} style={{ color: 'crimson' }}>{` `}Register Now</Link>
        </p>
      </LoginContainer>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  width: 100%;
  padding: 2.5rem 0;
  background-color: #fdfdfd;
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  background-color: #fff;
  max-width: 400px;
  width: 100%;
  border: 1px solid #ddd;
  padding: 2.7rem 1.7rem;
`;

export default Login