import axios from "axios";
import config from "../config/EnvConfig";
import jwtDecode from "jwt-decode";

let refreshTokenRequest = null;
const isExpired = (token) => {
  try {
    const decode = jwtDecode(token);
    const dateNow = Math.floor(Date.now() / 1000);

    console.log(decode.exp, dateNow);

    if (decode.exp < dateNow) return true;
    return false;
  } catch (e) {
    console.log(`[TOKEN_ERROR]: ${e.message}`);
    return false;
  }
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
    console.log("EXPIRED TOKEN");
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshTokenAPI();

    const newToken = await refreshTokenRequest;
    refreshTokenRequest = null;

    localStorage.setItem("token", newToken);
    return newToken;
  } else return token;
};
