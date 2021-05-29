import { useScrollTrigger } from "@material-ui/core";
import axiosClient from "../../../api";
import URL from "../../../api/url";

const APIService = {
  getShipFee: async (restaurantId, longitude, latitude) => {
    const response = await axiosClient.get(URL.ORDER.GET_SHIP_FEE, {
        params: {
            restaurant: restaurantId,
            longitude: longitude,
            latitude: latitude
        }
    });
    return response;
  },

  sendOrder: async (data) => {
    const payload = data;
    const response = await axiosClient.post(URL.ORDER.SEND_ORDER, payload);
    return response;
  },
};

export default APIService;
