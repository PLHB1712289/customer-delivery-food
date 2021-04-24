import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  vertifyOTP: async (user, otp) => {
    const payload = { user, otp };
    const response = await axiosClient.post(URL.OTP.VERIFY, payload);
    return response;
  }
};

export default APIService;
