import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  signInNormal: async (username, password) => {
    const payload = { username, password };
    const response = await axiosClient.post(URL.SIGN_IN.NORMAL, payload);

    return response;
  },

  signInWithFB: async (id, accessToken) => {
    const payload = { id, accessToken };
    const response = await axiosClient.post(URL.SIGN_IN.FACEBOOK, payload);

    return response;
  },

  signInWithGG: async (tokenId, accessToken) => {
    const payload = { id: tokenId, accessToken };
    const response = await axiosClient.post(URL.SIGN_IN.GOOGLE, payload);

    return response;
  },

  signInWithPhone: async (tokenId, accessToken) => {
    const payload = { id: tokenId, accessToken };
    const response = await axiosClient.post(URL.SIGN_IN.PHONE, payload);

    return response;
  },
};

export default APIService;
