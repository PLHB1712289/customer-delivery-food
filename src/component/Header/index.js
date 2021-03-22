import {
    AppBar,
    Button,
    CssBaseline,
    Grid,
    Toolbar,
    Typography
} from "@material-ui/core";
import DropdownButton from "../Common/CustomDropdown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";

import Avatar from "./AvatarDropdown";
import OptionLanguage from "./OptionLanguage";
import ListArea from "./ListArea";

import ImageUtils from "../../utils/ImageUtils";
import Localization from "../../config/Localization";



const Navbar = (props) => {
    // Styles
    const classes = useStyles();
    // React router hook
    const history = useHistory();

    const { onChangeLanguage } = props;

    // state
    const { token } = useSelector((state) => state.token);
    console.log("tokennn: " + token);

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
                                            <img src={ImageUtils.getLogo()} alt="Now Logo" className={classes.logo} />
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
                                <form
                                    className={classes.groupInput}
                                >
                                    <input
                                        placeholder={Localization.text("txt_search")}
                                        className={classes.searchInput}
                                    />
                                    <Button className={classes.searchButton}>
                                        <SearchIcon className={classes.iconButton} />
                                    </Button>
                                </form >
                            </Grid>

                            <Grid item md={2} xs={2}>
                                {token === null ?
                                    (<Link to={"/sign-in"} style={{ textDecoration: "none" }}>
                                        <Button className={classes.button}>{Localization.text("txt_login")}</Button>
                                    </Link>) 
                                    :
                                    (<Avatar customStyle={avatarStyle}></Avatar>)
                                }
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
        color: "white"
    }
};