import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  getListRestaurant: async (page) => {
    page = page || 1;
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_ALL);
  },

  getListRestaurantNew: async (page) => {
    page = page || 1;
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_NEW+ `?page=${page}`);
  },

  getListRestaurantBestDiscount: async (page) => {
    page = page || 1;
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_DISCOUNT+ `?page=${page}`);
  },

  getListRestaurantNearest: async (page) => {
    page = page || 1;
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_NEAREST+ `?page=${page}`);
  },
};

export default APIService;
