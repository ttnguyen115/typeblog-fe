import { IUser, IUserLogin, IUserSigup } from "@types";
import axiosClient from "api";
import { AxiosResponse } from "axios";
import { useUser } from "lib/user/useUser";
import { toast } from "react-toastify";
import { validSignup } from "utils/common/valid";

interface UseAuth {
  login: (user: IUserLogin) => Promise<void>,
  signup: (user: IUserSigup) => Promise<void>,
  logout: () => Promise<void>,
  refresh: () => Promise<void>,
  googleLogin: (token: string) => Promise<void>,
}

type UserResponse = { user: IUser };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    user: IUserSigup | IUserLogin | string | null,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosClient({
        url: urlEndpoint,
        method: user ? 'POST' : 'GET',
        withCredentials: true,
        data: typeof user === 'string' ? { id_token: user } : user,
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
      const errorMessage = errorResponse?.data?.message;
      const title = errorMessage || SERVER_ERROR;
      if (title === "Please login now!") return;
      else toast.error(title);
    }
  };

  async function login(user: IUserLogin): Promise<void> {
    authServerCall('/api/login', user);
  };

  async function googleLogin(id_token: string): Promise<void> {
    authServerCall('/api/google_login', id_token);
  };

  async function signup(user: IUserSigup): Promise<void> {
    const check = validSignup(user);
    if (check.errLength > 0) toast.error(check.errMsg[0]);
    else authServerCall('/api/register', user);
  };

  async function logout(): Promise<void> {
    // clear user from stored user data
    clearUser();
    authServerCall('/api/logout', null);
    window.location.href = "/";
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
    googleLogin
  };
}