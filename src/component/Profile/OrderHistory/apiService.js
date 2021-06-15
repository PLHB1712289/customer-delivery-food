import axiosClient from "../../../api";
import URL from "../../../api/url";
import OrderConfig from "../../../config/OrderConfig";

const APIService = {
  getOrders: async (page, status) => {
    console.log("status: " + JSON.stringify(status));
    return await axiosClient.get(URL.ORDER.GET_ORDERS,{
      params: {
        page: page, // int
        status: status,
        perpage: OrderConfig.ITEM_PER_PAGE
      }
    });
    // expect data: {listOrder (<=9), totalOrder}
  }
};

export default APIService;
