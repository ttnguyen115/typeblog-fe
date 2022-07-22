import { IUserLogin } from './../../@types/index';
import axiosClient from "api";

const authApi = {
  async login(params: IUserLogin) {
    const url = "/api/login";
    const res = await axiosClient.post(url, params);
    return res;
  },
};

export default authApi;
