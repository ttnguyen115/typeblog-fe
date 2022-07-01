import axiosClient from "api";

const authApi = {
  login(params: object) {
    const url = "/api/login";
    return axiosClient.get(url, { params });
  },
};

export default authApi;
