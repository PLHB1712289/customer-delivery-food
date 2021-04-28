import axios from "axios";
import config from "../config/EnvConfig";
import jwtDecode from "jwt-decode";

let refreshTokenRequest = null;
const isExpired = (token) => {
  const decode = jwtDecode.decode(token);
  const dateNow = new Date();

  if (decode.exp < dateNow.getTime()) return true;
  return false;
};

const refreshTokenAPI = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken)
    // return await axios.post(`${config.SERVER_URL}/refresh-token`, {
    //   refreshToken,
    // });

    return new Promise((resolve) =>
      setTimeout(resolve({ token: "new token" }), 1000)
    );

  localStorage.removeItem("refresToken");
  localStorage.removeItem("token");
  return null;
};

export const getToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  if (isExpired(token)) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshTokenAPI();

    const newToken = await refreshTokenRequest;
    refreshTokenRequest = null;

    localStorage.setItem("token", newToken);
    return newToken;
  } else return token;
};
