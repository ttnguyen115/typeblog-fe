import SignupForm from 'components/auth/SignupForm';
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Signup() {
  return (
    <SignupWrapper className="container">
      <SignupContainer>
        <h3 className="text-uppercase text-center mb-4">Signup</h3>
        <SignupForm />
        <p>
          Already have an account?
          <Link to={`/login`} style={{ color: 'crimson' }}>{` `}Login Now</Link>
        </p>
      </SignupContainer>
    </SignupWrapper>
  )
}

const SignupWrapper = styled.div`
  width: 100%;
  padding: 2.5rem 0;
  background-color: #fdfdfd;
  display: flex;
  justify-content: center;
`;

const SignupContainer = styled.div`
  background-color: #fff;
  max-width: 400px;
  width: 100%;
  border: 1px solid #ddd;
  padding: 2.7rem 1.7rem;
`;

export default Signup