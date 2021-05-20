import TAG from "../TAG";

const action = {
  updateAddress: (addressDelivery) => ({
    type: TAG.ADDRESS_DELIVERY.UPDATE_ADDRESS,
    payload: { addressDelivery },
  }),

  updateCoordinate: (lat, lng) => ({
    type: TAG.ADDRESS_DELIVERY.UPDATE_COORDINATE,
    payload: { lat, lng },
  }),
};

export default action;
