const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  global: {
    backgroundColor: "#f2f2f2"
  },
  panel: {
    backgroundColor: "white",
    width: "80%",
    height: theme.spacing(80),
    margin: "10px auto"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: theme.spacing(3),
    fontFamily: "Arial"
  },
  button: {
    width: "90%",
    height: theme.spacing(5),
    marginLeft: "5%",
    marginTop: theme.spacing(1)
  },
  buttonFacebook: {
    border: "none",
    backgroundColor: "#187caa",
    "&:hover": {
      backgroundColor: "#187caa",
    }
  },
  loginHidden: {
    minWidth: "100%",
    minHeight: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    "&:hover": {
      opacity: 0,
      visibility: "hidden"
    },
  },
  buttonPhone: {
    backgroundColor: "#329900",
    color: "white",
    "&:hover": {
      backgroundColor: "#329900",
    }
  },
  buttonGoogle: {
    backgroundColor: "#ff5252",
    "&:hover": {
      backgroundColor: "#ff5252",
    }
  },
  buttonSignIn: {
    marginTop: theme.spacing(3),
    backgroundColor: "#0288d1",
    "&:hover": {
      backgroundColor: "#0288d1",
    }
  },
  buttonIcon: {
    position: "absolute",
    color: "white",
    left: theme.spacing(2),
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arial"
  },
  errorSpan: {
    width: "90%",
    height: theme.spacing(6),
    marginLeft: "5%",
    marginTop: theme.spacing(3),
    borderRadius: "4px",
    backgroundColor: "#f2dede"
  },
  errorText: {
    fontFamily: "Arial",
    fontSize: "15px",
    marginLeft: theme.spacing(3),
    color: "#a94442",
    transform: "translateY(65%)"
  },
  spanOptionLogin: {
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: "12px",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    color: "#464646"
  },
  checkBoxCacheSignIn: {
    left: "5%",
    float: "left",
    marginTop: theme.spacing(1)
  },
  policy: {
    width: "90%",
    marginLeft: "5%",
    marginTop: theme.spacing(5),
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: "14px"
  },
  input: {
    width: "90%",
    height: theme.spacing(6),
    marginLeft: "5%",
  }
}));
