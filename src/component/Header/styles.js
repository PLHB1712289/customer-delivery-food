const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    position: "relative",
    top: 0
  },

  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#FFFFFF",
    height: "10vh",
    position: "sticky",
    top: 0
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    width: 122,
    height: 30,
    boxSizing: "border-box",
    // paddingBottom: 6,
    // paddingTop: 6,
    // paddingLeft: 16,
    // paddingRight: 16,
    // borderRadius: 5,
    textDecoration: "none",
    color: "white",

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.5)",
      color: "black",
    },
  },
  logo: {
    maxWidth: 100,
    maxHeight: 40,
    transform: "translateY(10%)",
  },
  iconButton: {
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "white",
    width: "120px",
    height: "50px",
    borderRadius: "10px",
    border: "2px solid #cf2127",
    color: "#cf2127",
    fontSize: "15px",
    fontWeight: "bold",
    transform: "translateY(15%)",
    "&:hover": {
      backgroundColor: "#cf2127",
      color: "white"
    }
  },
  dropdownButton: {
    backgroundColor: "white",
    width: "120px",
    height: "50px",
    borderRadius: "10px",
    border: "2px solid #cf2127",
    color: "#cf2127",
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: "5px",
    transform: "translateY(15%)",
  },
  groupInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    border: "2px solid #cf2127",
    color: "#000S",
    fontSize: 15,
    height: "50px",
    width: "450px",
    marginTop: "auto",
    position: "absolute",
    alignItems: "center",
    transform: "translateY(10%)",
  },
  searchInput: {
    width: "363px",
    height: "40px",
    fontSize: "16px",
    border: "none", 
    outline: "none", 
    marginLeft: "20px", 
    marginTop: "3px" ,
  },
  searchButton: {
    position: "sticky",
    right: 0,
    backgroundColor: "#cf2127", 
    width: "60px", 
    height: "105%", 
    marginBottom: "2px",     
    marginRight: -5,   
    borderRadius:"0px 10px 10px 0px",
    "&:hover": {
      backgroundColor: "#F24E4E"
    }
  }
}));
