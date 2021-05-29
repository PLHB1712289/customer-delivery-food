import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  vertifyOTP: async (user, otp) => {
    const payload = { user: user, otp: otp };
    const response = await axiosClient.post(URL.OTP.VERIFY, payload);
    return response;
  },

  getUserInfo: async (userId) => {
    const payload = {};
    const response = await axiosClient.get(URL.USER_INFO.GET + userId, payload);

    return response;
  }
};

export default APIService;
