import axiosClient from "../../api";
import URL from "../../api/url";
import RestaurantConfig from "../../config/RestaurantConfig";

const APIService = {
  getListRestaurant: async (page, city, areas, types, sort, keyword) => {
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_ALL,{
      params: {
        page: page, // int
        city: city, // int - ID của city
        district: areas, // array int - ID của các quận 
        types: types, // array int - ID của filter thể loại
        sort: sort,   // int - ID của sort
        keyword: keyword,  // String - search value
        perpage: RestaurantConfig.COUNT_PER_PAGE // int - item per page
      }
    });
  }
};

export default APIService;
