import { ChangeEvent, FormEvent } from "react";

export interface IParams {
  page?: string;
  slug?: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;
