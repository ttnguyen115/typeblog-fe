import { IUserSigup } from "@types";

const MAX_LENGTH_NAME: number = 20;
const REG_EXP_EMAIL: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_EXP_PHONE_NUMBERS: RegExp = /^[+]/g;

export const validSignup = (data: IUserSigup) => {
  const { name, account, password, cf_password } = data;
  const errors: Array<string> = [];

  if (!name) errors.push("Please add your name.");
  else if (name.length > MAX_LENGTH_NAME)
    errors.push("Your name is only up to 20 characters.");

  if (!account) errors.push("Please add your email or phone numbers.");
  else if (isInvalidAccount(account)) {
    errors.push("Email or phone numbers format is incorrect.");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  } else if (password !== cf_password) {
    errors.push("Confirm password did not match.");
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

function validateEmail(email: string) {
  return REG_EXP_EMAIL.test(String(email).toLowerCase());
}

function validatePhone(phone: string) {
  return REG_EXP_PHONE_NUMBERS.test(phone);
}

function isInvalidAccount(info: string) {
  return !validatePhone(info) && !validateEmail(info);
}
