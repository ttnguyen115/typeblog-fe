import { IUser, IUserLogin, IUserSigup } from "@types";
import axiosClient from "api";
import axios, { AxiosResponse } from "axios";
import { useUser } from "lib/user/useUser";
import { toast } from "react-toastify";
import { validSignup } from "utils/common/valid";

interface UseAuth {
  login: (user: IUserLogin) => Promise<void>,
  signup: (user: any) => Promise<void>,
  logout: () => Promise<void>,
  refresh: () => Promise<void>,
}

type UserResponse = { user: IUser };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    user: IUserSigup | IUserLogin | null,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosClient({
        url: urlEndpoint,
        method: user ? 'POST' : 'GET',
        withCredentials: true,
        data: user,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 400) {
        const title = 'message' in data ? data.message : 'Unauthorized';
        toast.warn(title);
        return;
      }

      if ('user' in data && 'accessToken' in data) {
        const { user } = data;
        const title = `Logged in as ${user['account']}`;
        toast.info(title);

        // update stored user data
        updateUser(user);
      }
    } catch (errorResponse: any) {
      const errorMessage = errorResponse?.response?.data?.message;
      const title = axios.isAxiosError(errorResponse) && errorMessage ? errorMessage : SERVER_ERROR;
      toast.error(title);
    }
  };

  async function login(user: IUserLogin): Promise<void> {
    authServerCall('/api/login', user);
  };

  async function signup(user: IUserSigup): Promise<void> {
    const check = validSignup(user);
    if (check.errLength > 0) toast.error(check.errMsg[0]);
    else authServerCall('/api/register', user);
  };

  async function logout(): Promise<void> {
    // clear user from stored user data
    clearUser();
    toast.info('Logged out!');
  };

  async function refresh(): Promise<void> {
    authServerCall('/api/refresh_token', null);
  }

  return {
    login,
    signup,
    logout,
    refresh,
  };
}