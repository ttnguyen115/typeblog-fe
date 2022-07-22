import { ChangeEvent, FormEvent } from "react";

export interface IParams {
  page?: string;
  slug?: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserSigup extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _v: number;
  _id: string;
}

export interface IAuth {
  token?: string;
  user?: IUser;
}

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;
