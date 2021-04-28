import axios from "axios";
import queryString from "query-string";
import config from "../config/EnvConfig";
import { getToken } from "../utils/Token";

// Note: - This module is Http Client.
//       - Control all requests from client to server, all requests go through this port.
//
// Component:
//    |                         -------------
//    |- component1 <--------> | Http Client |
//    |- component2 <--------> |     ---     | <=========> APIServer
//    |- component3 <--------> | axiosClient |
//                              -------------
//
// Author: BaoBao

const axiosClient = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClient.interceptors.request.use(async (config) => {
  // ..Handle token
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // ..Handle error

    throw error;
  }
);

export default axiosClient;
