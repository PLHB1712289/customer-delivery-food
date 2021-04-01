import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  vertifyPhone: async (userID, phone) => {
    const payload = { userID, phone };
    const response = await axiosClient.post(URL.VERIFY.PHONE, payload);
    return response;
  }
};

export default APIService;
