const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  footer_global: {
    clear: "both",
    position: "relative",
    height: "45vh",
  },
  appBar: {
    backgroundColor: "#f2f2f2",
    height: "100%"
  },
  toolbar: {
    margin: "20px 0px 0px 0px"
  },
  link: {
    textDecoration: "none",
    color: "#0288d1"
  },
  companyTitle: {
    fontFamily: "Arial",
    marginBottom: theme.spacing(2)
  },
  companyText: {
    fontFamily: "Noto Sans",
  },
  companyAddressTitle: {
    fontFamily: "Arial",
    textAlign: "right",
    marginBottom: theme.spacing(2)
  },
  companyAddress: {
    fontFamily: "Noto Sans",
    textAlign: "right"
  },
  spanLink: {
    width: theme.spacing(15),
    height: theme.spacing(5),
    marginTop: theme.spacing(2),
    fontSize: "16px",
    fontWeight: "400",
    backgroundColor: "white",
    border: "1px solid #d7d7d7",
    color: "#464646",
    paddingLeft: 10,
    "&:hover": {
      color: "#0288d1",
      border: "1px solid #0288d1",
    },
  },
  spanIcon: {
    marginTop: theme.spacing(0.4),
    marginRight: theme.spacing(1),
    display: "inline",
    float: "left"
  },
  logo: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    display: "block",
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
  seal: {
    width: theme.spacing(25),
    height: theme.spacing(9),
    float: "right",
    marginTop: theme.spacing(2),
  },
  corporation: {
    marginTop: theme.spacing(2),
    color: "#959595",
    fontSize: ".75rem",
    fontFamily: "Noto Sans",
    textAlign: "center"
  },
  socialIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: theme.spacing(1)
  }
}));
