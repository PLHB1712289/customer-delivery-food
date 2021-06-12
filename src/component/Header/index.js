import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "../../config/Localization";
import action from "../../storage/action";
import ImageUtils from "../../utils/ImageUtils";
import APIService from "./apiService";
import Avatar from "./AvatarDropdown";
import ListArea from "./ListArea";
import OptionLanguage from "./OptionLanguage";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const Navbar = ({ onChangeLanguage }) => {
  // Styles
  const classes = useStyles();
  // use history
  const history = useHistory();
  // React router hook
  const dispatch = useDispatch();

  // Token
  let { token } = useSelector((state) => state.token);
  if (token === null) {
    token = localStorage.getItem("token");
  }

  const [keyword, setKeyword] = useState("");

  React.useEffect(() => {
 
  }, [token]);

  const onChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };

  const onSearch = () => {
      dispatch(action.searchAction.update(keyword));

      history.push({
        pathname: "restaurants",
        search: `?keyword=${keyword}`,
        state: {keyword: keyword}
      });
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item md={1}></Grid>
            <Grid container item md={10}>
              <Grid item md={1}>
                <Typography className={classes.toolbarTitle}>
                  <Link to={"/"}>
                    <Button>
                      <img
                        src={ImageUtils.getLogo()}
                        alt="Now Logo"
                        className={classes.logo}
                      />
                    </Button>
                  </Link>
                </Typography>
              </Grid>

              {/* Group Selection */}
              <Grid item md={3} style={{paddingLeft: "5%"}}>
                <ListArea />
              </Grid>

              {/* Group Search */}
              <Grid item md={5}>
                <form className={classes.groupInput}>
                  <input
                    placeholder={Localization.text("txt_search")}
                    className={classes.searchInput}
                    onChange={onChangeKeyWord}
                  />
                  <Button className={classes.searchButton} onClick={onSearch}>
                    <SearchIcon className={classes.iconButton} />
                  </Button>
                </form>
              </Grid>

              <Grid item md={2}>
                {!token ? (
                  <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                    <Button className={classes.button}>
                      {Localization.text("txt_login")}
                    </Button>
                  </Link>
                ) : (
                  <Avatar customStyle={avatarStyle}></Avatar>
                )}
              </Grid>

              <Grid item md={1}>
                <OptionLanguage onChangeLanguage={onChangeLanguage} />
              </Grid>
            </Grid>
            <Grid item md={1}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

const avatarStyle = {
  backgroundColor: "rgba(220, 220, 220, 0.5)",
  borderRadius: "10px",
  transform: "translateY(10%)",
  "&:hover": {
    backgroundColor: "red",
    color: "white",
  },
};
