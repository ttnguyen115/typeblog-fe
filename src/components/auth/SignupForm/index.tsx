import { FormSubmit, InputChange } from '@types';
import { useAuth } from 'lib/auth/useAuth';
import React from "react";
import styled from 'styled-components';

function SignupForm() {
  const auth = useAuth();
  const initialState = { account: "", password: "", name: "", cf_password: "" };
  const [userSignup, setUserSignup] = React.useState(initialState);
  const { name, account, password, cf_password } = userSignup;

  const [typePass, setTypePass] = React.useState(false);
  const [typeCfPass, setTypeCfPass] = React.useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserSignup({ ...userSignup, [name]: value });
  }

  const handleFormSubmit = (e: FormSubmit) => {
    e.preventDefault();
    auth.signup(userSignup);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-group mb-3'>
        <label htmlFor="name" className="form-label">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          className="form-control"
          placeholder='Your name is up to 20 characters.'
        />
      </div>

      <div className='form-group mb-3'>
        <label htmlFor="account" className="form-label">Email / Phone number</label>
        <input
          type="text"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          className="form-control"
          placeholder='Example@gmail.com/+12345678910'
        />
      </div>

      <div className='form-group mb-3'>
        <label htmlFor="password" className="form-label">Password</label>
        <PasswordField>
          <input
            type={typePass ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            className="form-control"
            placeholder='Password must be at least 6 characters.'
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'Show'}</small>
        </PasswordField>
      </div>

      <div className='form-group mb-3'>
        <label htmlFor="cf_password" className="form-label">Confirm Password</label>
        <PasswordField>
          <input
            type={typeCfPass ? "text" : "password"}
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            className="form-control"
            placeholder='Your confirm password.'
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? 'Hide' : 'Show'}</small>
        </PasswordField>
      </div>

      <button type='submit' className="btn btn-dark w-100 mt-1">
        Signup
      </button>
    </form>
  )
}

const PasswordField = styled.div`
  position: relative;

  small {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default React.memo(SignupForm)