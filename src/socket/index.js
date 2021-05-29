import io from "socket.io-client";
import config from "../config/EnvConfig";
import { getToken } from "../utils/Token";
import { TAG_EVENT } from "./TAG_EVENT";

const Socket = class {
  constructor() {
    this.socket = null;
    this.connect();
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
