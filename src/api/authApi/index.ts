import { IUserLogin } from './../../@types/index';
import axiosClient from "api";

const authApi = {
  login(params: IUserLogin) {
    const url = "/api/login";
    return axiosClient.post(url, params);
  },
};

export default authApi;
