import TAG from "../../TAG";

const INITIAL_STATE = { address: "Địa chỉ giao hàng", lat: -1, lng: -1 };

const addressDeliveryReducer = (addressDelivery = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.ADDRESS_DELIVERY.UPDATE_ADDRESS:
      return { ...addressDelivery, address: action.payload.addressDelivery };

    case TAG.ADDRESS_DELIVERY.UPDATE_COORDINATE:
      return {
        ...addressDelivery,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };

    default:
      return addressDelivery;
  }
};

export default addressDeliveryReducer;
