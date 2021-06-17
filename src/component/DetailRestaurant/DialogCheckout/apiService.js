import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  getShipFee: async (restaurantId, location) => {
    const response = await axiosClient.get(URL.ORDER.GET_SHIP_FEE, {
        params: {
            restaurant: restaurantId,
            destination: location
        }
    });
    return response;
  },

  sendOrder: async (data) => {
    const response = await axiosClient.post(URL.ORDER.SEND_ORDER, data);
    return response;
  },
};

export default APIService;
