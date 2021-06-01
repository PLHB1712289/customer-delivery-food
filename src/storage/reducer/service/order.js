import TAG from "../../TAG";

const INITIAL_STATE = {
  orderId: -1,
  status: -1,
  shipper: {
    fullName: "",
    phone: "",
    latitude: null,
    longitude: null,
  },
  dataOrder: {},
};

const orderReducer = (order = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.ORDER.CREATE:
      return {
        ...order,
        dataOrder: action.payload.data,
      };
    case TAG.ORDER.UPDATE_STATUS:
      return {
        ...order,
        status: action.payload.status,
      };
    case TAG.ORDER.RESET:
      return {
        ...order,
        orderId: -1,
        status: -1,
        shipper: {
          fullName: "",
          phone: "",
          latitude: null,
          longitude: null,
        },
        dataOrder: {},
      };
    default:
      return order;
  }
};

export default orderReducer;
