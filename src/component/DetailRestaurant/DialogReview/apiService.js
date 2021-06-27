import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  getListReview: async (restaurantId) => {
    const url = URL.RESTAURANT.GET_REVIEWS.replace("resId", restaurantId.toString());
    const response = await axiosClient.get(url);
    return response;
  },
};

export default APIService;
