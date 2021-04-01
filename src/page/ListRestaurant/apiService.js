import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  getListRestaurant: async () => {
    return await axiosClient.get(URL.RESTAURANT.GET_LIST);
  },
};

export default APIService;
