import { ImportantDevices } from "@material-ui/icons";

const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  notfound_404: {
    left: 0,
    top: 0,
    width: "170px",
    height: "170px",
    backgroundColor: "#e01818",
    borderRadius: "7x",
    WebkitBoxShadow: "0px 0px 0px 10px #e01818 inset, 0px 0px 0px 20px #fff inset",
    boxShadow: "0px 0px 0px 10px #e01818 inset, 0px 0px 0px 20px #fff inset"
  },
  notfoundSymbol: {
    fontFamily: "Chango",
    color: "#fff",
    fontSize: "118px",
    margin: "0px",
    height: "60px",
    float: "left"
  },
  errorText: {
    fontFamily: ["Chango", "cursive"],
    fontSize: "68px",
    color: "#222",
    fontWeight: "900px",
    textTransform: "uppercase",
    margin: "0px",
    lineHeight: 1.1,
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)"
  }
}));
