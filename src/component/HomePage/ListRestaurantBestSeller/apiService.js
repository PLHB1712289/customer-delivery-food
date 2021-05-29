import axiosClient from "../../../api";
import URL from "../../../api/url";

const MAX_ITEM = 9;

const APIService = {
  getListRestaurant: async (page, city) => {
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_ALL,{
      params: {
        page: page, // int
        city: city, // int - ID của city
        district: [], // array int - ID của các quận 
        types: [], // array int - ID của filter thể loại
       // sort: 1,   // int - ID của sort
        keyword: "",  // String - search value
        perpage: MAX_ITEM // int - item per page
      }
    });
  },

  getMoreRestaurant: async (page, city) => {
    return await axiosClient.get(URL.RESTAURANT.GET_LIST_ALL,{
      params: {
        page: page, // int
        city: city, // int - ID của city
        district: [], // array int - ID của các quận 
        types: [], // array int - ID của filter thể loại
        //sort: 1,   // int - ID của sort
        keyword: "",  // String - search value
        perpage: MAX_ITEM // int - item per page
      }
    });
  }
};

export default APIService;
