import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  getListRestaurant: async (page) => {
    page = page || 1;
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_ALL);
  }
};

export default APIService;
