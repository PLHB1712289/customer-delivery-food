import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  getRestaurant: async (id) => {
    const response = await axiosClient.get(URL.RESTAURANT.GET_BY_ID + id);

    return response;
  },
};

export default APIService;
