import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  signInWithPhoneNumber: async (phone) => {
    const payload = { phone: phone };
    const response = await axiosClient.post(URL.OTP.PHONE_CALL, payload);

    return response;
  },

  vertifyOTP: async (phone, otp) => {
    const payload = { phone: phone, otp: otp };
    const response = await axiosClient.post(URL.OTP.PHONE_VERIFY, payload);
    return response;
  },

  getUserInfo: async (userId) => {
    const payload = {};
    const response = await axiosClient.get(URL.USER_INFO.GET + userId, payload);

    return response;
  }
};

export default APIService;
