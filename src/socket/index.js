import io from "socket.io-client";
import config from "../config/EnvConfig";
import { TAG_EVENT } from "./TAG_EVENT";

console.log(config);

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.QZP_WIN3WTUPaevU2BNlJCXCNEvt_gVBgWb-uQa4Tqs";

// const token = null;

const Socket = class {
  constructor() {
    this.socket = null;
    this.connect();
  }

  connect() {
    this.socket = io.connect(config.SERVER_URL_SOCKET);

    this.socket.on("connect", () => {
      this.socket.emit("authenticate", { token });
    });

    this.socket.on("unauthenticate", (message) => {
      // alert(message);
    });

    this.socket.on("authenticated", (message) => {
      // alert(message);
    });

    return this.socket;
  }

  disconnect() {
    this.socket.disconnect();
    this.socket = null;
  }

  addCallback(tag, callback) {
    this.socket.on(tag, callback);
  }

  removeCallback(tag) {
    this.socket.removeListener(tag);
  }
};

const socket = new Socket();

export default socket;
