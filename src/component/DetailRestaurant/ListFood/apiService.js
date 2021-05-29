import { useScrollTrigger } from "@material-ui/core";
import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  getRestaurantCategories: async (restaurantId) => {
    const url = URL.RESTAURANT.GET_CATEGORIES.replace("resId", restaurantId);
    const response = await axiosClient.get(url);

    return response;
  },
};

export default APIService;
