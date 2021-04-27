import io from "socket.io-client";
import config from "../config/EnvConfig";
import { TAG_EVENT } from "./TAG_EVENT";

console.log(config);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.EyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.QZP_WIN3WTUPaevU2BNlJCXCNEvt_gVBgWb-uQa4Tqs";

const Socket = class {
  constructor() {
    this.socket = null;
    this.connect();
  }

  connect() {
    this.socket = io.connect(config.SERVER_URL_SOCKET, {
      extraHeaders: { Authorization: `Bearer ${token}` },
      forceNew: true,
    });

    //---- <Setup> ----
    this.socket
      .on("authenticated", () => {
        console.log("authenticated");
      })
      .on("unauthorized", (error) => {
        // ^- i don't know why it not work!!
        alert("User token has expired");
        if (
          error.data.type == "UnauthorizedError" ||
          error.data.code == "invalid_token"
        ) {
          // redirect user to login page perhaps?
          alert("User token has expired");
        }
      })
      .on("error", (err) => {
        console.log("Global Error:");
        console.log(err);
      });

    this.socket.emit("HELLo");
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
