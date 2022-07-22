import { IUser, IUserLogin } from "@types";
import axiosClient from "api";
import axios, { AxiosResponse } from "axios";
import { useUser } from "lib/user/useUser";
import { toast } from "react-toastify";

interface UseAuth {
  login: (user: IUserLogin) => Promise<void>,
  signup: (user: any) => Promise<void>,
  logout: () => Promise<void>,
}

type UserResponse = { user: IUser };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    user: IUser | IUserLogin,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosClient({
        url: urlEndpoint,
        method: 'POST',
        data: user,
        headers: { 'Content-Type': 'application/json' },
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
  }

  async function login({ account, password }: IUserLogin): Promise<void> {
    authServerCall('/api/login', { account, password });
  };
  async function signup(user: any): Promise<void> { };
  async function logout(): Promise<void> {
    // clear user from stored user data
    clearUser();
    toast.info('Logged out!');
  };

  return {
    login,
    signup,
    logout,
  };
}