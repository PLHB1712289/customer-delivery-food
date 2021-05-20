import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  signInWithPhoneNumber: async (phone) => {
    const payload = { phone: phone };
    const response = await axiosClient.post(URL.OTP.PHONE_CALL, payload);

    return response;
  },
};

export default APIService;
