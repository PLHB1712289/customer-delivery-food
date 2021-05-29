import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  vertifyPhone: async (user, phone) => {
    const payload = { user: user, phone: phone };
    const response = await axiosClient.post(URL.OTP.CALL, payload);
    return response;
  }
};

export default APIService;
