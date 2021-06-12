import io from "socket.io-client";
import store from "../storage";
import action from "../storage/action";
// import { newOrder, updateStatusCustomer } from "../../redux/reducers/customer";
import { TAG_EVENT, ORDER_STATUS } from "./TAG_EVENT";
import { getToken } from "../utils/Token";

const config = { SERVER_URL_SOCKET: "http://localhost:8010" };

const Socket = class {
  constructor() {
    this.socket = null;
  }

  async connect() {
    const token = await getToken();

    this.socket = io.connect(config.SERVER_URL_SOCKET);

    this.socket.on("connect", () => {
      this.socket.emit("authenticate", { token });
    });

    this.socket.on("unauthenticate", (message) => {
      // alert(message);
      // success
    });

    this.socket.on("authenticated", (message) => {
      // alert(message);
      // failed
    });

    this.socket.on(TAG_EVENT.RESPONSE_JOIN_ROOM, (res) => {
      console.log(res);
    });

    this.socket.on(TAG_EVENT.RESPONSE_DISCONNECT_ROOM, (res) =>
      console.log(res)
    );

    this.socket.on(TAG_EVENT.RESPONSE_CUSTOMER_RECONNECT, (res) => {
      const listOrder = res.data.listOrder;
      console.log(res.data);
      listOrder.forEach((order) => {
        // store.dispatch(newOrder(order));
      });
    });

    // KH -> chi tiet don hang -> JOIN this.socket.emit(TAG.REQUEST_JOIN_ROOM)
    this.socket.on(TAG_EVENT.RESPONSE_CHANGE_STATUS_ROOM, (res) => {
      // check order is canceled
      const { status } = res.data;
      store.dispatch(action.orderAction.updateStatus(status));

      console.log("RESPONSE_CHANGE_STATUS_ROOM: " + JSON.stringify(res));

      switch (status) {
        case ORDER_STATUS.WAITING:
          break;
        case ORDER_STATUS.MERCHANT_CONFIRM:
          break;
        case ORDER_STATUS.DURING_GET:
          const shipper = {
            Avatar: "https://gravatar.com/avatar/a839d991c3428ec1c3f65a3959b8770c?s=400&d=robohash&r=x",
            FullName: "Giàng A Sử",
            Phone: "0776250197"
          }
          store.dispatch(action.orderAction.updateShipperInfo(shipper));
          break;
        case ORDER_STATUS.DURING_SHIP:
          break;
        case ORDER_STATUS.DELIVERED:
          break;
        case ORDER_STATUS.CANCEL_BY_CUSTOMER:
          break;
        case ORDER_STATUS.CANCEL_BY_MERCHANT:
          break;
        case ORDER_STATUS.CANCEL_BY_SHIPPER:
          break;
        default:
          break;
      }
    });

    this.socket.on(TAG_EVENT.RESPONSE_SHIPPER_CHANGE_COOR, (res) => {
      console.log(res);
    });

    return this.socket;
  }

  cancelOrder(orderID) {
    this.socket.emit(TAG_EVENT.REQUEST_CUSTOMER_CANCEL_ORDER, { orderID });
  }

  disconnect() {
    if (this.socket !== null) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  addCallback(tag, callback) {
    this.socket.on(tag, callback);
  }

  removeCallback(tag) {
    this.socket.removeListener(tag);
  }

  createOrder(restaurantID) {
    // const order = {
    //   restaurantID,
    //   orderID: generateObjectID(),
    // };
    // this.socket.emit("new order", order);
    // this.socket.emit(TAG_EVENT.REQUEST_JOIN_ROOM, { orderID: order.orderID });
    //store.dispatch(newOrder({ id: order.orderID, status: 0 }));
  }
};

const socket = new Socket();

export default socket;
