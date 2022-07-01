import { FormSubmit, InputChange } from '@types';
import React from "react";
import styled from 'styled-components';

function LoginPass() {
  const initialState = { account: "", password: "" };
  const [userLogin, setUserLogin] = React.useState(initialState);
  const [typePass, setTypePass] = React.useState(false);
  const { account, password } = userLogin;

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  }

  const handleFormSubmit = (e: FormSubmit) => {
    e.preventDefault();
    //const {data} = useQueries('login', authApi.login, )
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-group mb-3'>
        <label htmlFor="account" className="form-label">Email / Phone number</label>
        <input
          type="text"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          className="form-control"
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
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'Show'}</small>
        </PasswordField>
      </div>

      <button type='submit' disabled={!(account && password)} className="btn btn-dark w-100 mt-1">Login</button>
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

export default LoginPass