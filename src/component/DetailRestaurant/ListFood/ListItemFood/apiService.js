import axiosClient from "../../../../api";
import URL from "../../../../api/url";

const APIService = {
  getRestaurantCategoryFood: async (restaurantId, catId) => {
    var url = URL.RESTAURANT.GET_FOODS.replace("resId", restaurantId);
    url = url.replace("catId", catId);

    const response = await axiosClient.get(url);

    return response;
  },
};

export default APIService;
