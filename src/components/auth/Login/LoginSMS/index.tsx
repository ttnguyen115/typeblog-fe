import { InputChange } from "@types";
import React from "react";

function LoginSMS() {
  const [phone, setPhone] = React.useState('');

  const handleChangePhoneNumber = (e: InputChange) => setPhone(e.target.value)

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">Phone number</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          onChange={handleChangePhoneNumber}
        />
      </div>

      <button type="submit" className="btn btn-dark w-100" disabled={!phone}>Login</button>
    </form>
  )
}

export default LoginSMS