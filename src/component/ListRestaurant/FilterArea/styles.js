const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
    button: {
        width: "8rem",
      },
  popperClose: {
    pointerEvents: "none",
  },
  dropdown: {
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    top: "100%",
    zIndex: "1000",
    width: "50rem",
    padding: 0,
    left: -50,
    fontSize: "12px",
    textAlign: "center",
    backgroundColor: "#fff",
    position: "absolute"
  },

  container: {
    width: "100%",
  },

  formGroup: {
    width: "100%",
    margin: "0px !important",
    border: "1px solid #ccc",
    textAlign: "left",
    paddingLeft: "1rem"
  },

  popperResponsive: {
    zIndex: "1200",
    [theme.breakpoints.down("sm")]: {
      zIndex: "1640",
      position: "static",
      float: "none",
      width: "100%",
      marginTop: "0",
      backgroundColor: "transparent",
      border: "0",
      boxShadow: "none",
      color: "black",
    },
  },

  caret: {
    transition: "all 150ms ease-in",
    display: "inline-block",
    width: "7px",
    height: "7px",
    transform: "translateY(30%)",
    marginLeft: "15px",
    verticalAlign: "middle",
    borderTop: "4px solid",
    borderRight: "4px solid transparent",
    borderLeft: "4px solid transparent",
  },
  caretActive: {
    transform: "rotate(180deg)",
  },

  buttonText: {
    display: "block",
  },

  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "25%",
    width: "1.2rem",
    height: "1.2rem",
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "white",
    "input:hover ~ &": {
      backgroundColor: "white",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "white",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: "1.2rem",
      height: "1.2rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23cf2127'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
}));
