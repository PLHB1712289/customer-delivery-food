import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "../../config/Localization";
import tokenAction from "../../storage/action/tokenAction";
import ImageUtils from "../../utils/ImageUtils";
import APIService from "./apiService";
import Avatar from "./AvatarDropdown";
import ListArea from "./ListArea";
import OptionLanguage from "./OptionLanguage";
import useStyles from "./styles";

const Navbar = ({ onChangeLanguage }) => {
  // Styles
  const classes = useStyles();

  // React router hook
  const dispatch = useDispatch();

  // Token
  const { token } = useSelector((state) => state.token);

  // Sync account
  useEffect(() => {
    // IIFE tech
    (async () => {
      // 1. Get token from localStorage:
      const token = localStorage.getItem("token");

      try {
        // 2. If token is exist, send request for get account from server API:
        const { success, data } = await APIService.syncAccount(token);

        if (success) {
          // 3. Dispatch data to save user:
          dispatch(tokenAction.signIn(token, data.user));
        } else {
          // 3.1 Remove token:
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.log(`[SYNC_ACCOUNT_FAILED]: ${e.message}`);
      }
    })();
  }, []);

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
            <Grid item md={1} xs={0}></Grid>
            <Grid container item md={10} xs={12}>
              <Grid item md={1} xs={1}>
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
              <Grid item md={3} xs={3}>
                <ListArea />
                <ListArea />
              </Grid>

              {/* Group Search */}
              <Grid item md={5} xs={5}>
                <form className={classes.groupInput}>
                  <input
                    placeholder={Localization.text("txt_search")}
                    className={classes.searchInput}
                  />
                  <Button className={classes.searchButton}>
                    <SearchIcon className={classes.iconButton} />
                  </Button>
                </form>
              </Grid>

              <Grid item md={2} xs={2}>
                {token === null ? (
                  <Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                    <Button className={classes.button}>
                      {Localization.text("txt_login")}
                    </Button>
                  </Link>
                ) : (
                  <Avatar customStyle={avatarStyle}></Avatar>
                )}
              </Grid>

              <Grid item md={1} xs={1}>
                <OptionLanguage onChangeLanguage={onChangeLanguage} />
              </Grid>
            </Grid>
            <Grid item md={1} xs={0}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

const avatarStyle = {
  backgroundColor: "rgba(240, 240, 240, 0.7)",
  borderRadius: "10px",
  transform: "translateY(20%)",
  "&:hover": {
    backgroundColor: "red",
    color: "white",
  },
};
