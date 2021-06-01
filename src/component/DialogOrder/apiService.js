import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  getMerchainInfo: async (resId) => {
    const url = URL.RESTAURANT.GET_BY_ID + resId;
    const response = await axiosClient.get(url);
    return response;
  },
};

export default APIService;
