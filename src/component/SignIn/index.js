import React, { useEffect, useState } from "react";
import {
    Button, Grid, Checkbox, FormControl, FormLabel, FormControlLabel,
    FormGroup, IconButton, OutlinedInput, InputAdornment
} from "@material-ui/core";
import {
    Facebook, AccountCircle, Lock,
    PhoneAndroid, GitHub, Visibility, VisibilityOff
} from '@material-ui/icons';

import useStyles from "./styles";
import Localization from "../../config/Localization";


const Footer = () => {
    // Styles
    const classes = useStyles();

    // local state
    var [passwordVisible, setPasswordVisible] = useState(false);
    var [errMsg, setErrMsg] = useState("");

    // region local handle
    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <Grid container className={classes.global}>
                <Grid item md={1} xs={0}></Grid>
                <Grid container item md={12}>

                    <Grid item md={3}>
                    </Grid>

                    <Grid item md={6}>
                        <div className={classes.panel}>
                            <p className={classes.title}>{Localization.text("txt_login")}</p>
                            {/* Button Login With Phone */}
                            <Button className={[classes.buttonPhone, classes.button].join(" ")}>
                                <PhoneAndroid className={classes.buttonIcon} />
                                <p className={classes.buttonText}>{Localization.text("txt_phone")}</p>
                            </Button>

                            {/* Button Login With Facebook */}
                            <Button className={[classes.buttonFacebook, classes.button].join(" ")}>
                                <Facebook className={classes.buttonIcon} />
                                <p className={classes.buttonText}>FACEBOOK</p>
                            </Button>

                            {/* Button Login With Google */}
                            <Button className={[classes.buttonGoogle, classes.button].join(" ")}>
                                <GitHub className={classes.buttonIcon} />
                                <p className={classes.buttonText}>GOOGLE</p>
                            </Button>
                            {/* Div notify error */}
                            <div
                                className={classes.errorSpan}
                                style={{display: errMsg === "" ? "none" : ""}}
                            >
                                <div className={classes.errorText}>Vui lòng nhập email hoặc số điện thoại</div>
                            </div>

                            {/* Div Text Login */}
                            <div className={classes.spanOptionLogin}>
                                {Localization.text("txt_optionSignIn")}
                            </div>

                            {/* Input Account */}
                            <OutlinedInput
                                className={classes.input}
                                id="outlined-adornment-password"
                                placeholder="Username or email"
                                type={'text'}
                                startAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="start"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            {/* Input Password */}
                            <OutlinedInput
                                className={classes.input}
                                id="outlined-adornment-password"
                                placeholder="Password"
                                type={passwordVisible ? "text" : "password"}
                                startAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="start"
                                        >
                                            <Lock />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            aria-label="toggle password visibility"
                                            edge="start"
                                        >
                                            {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            {/* Cache Sign In */}
                            <FormControl className={classes.checkBoxCacheSignIn}>
                                <FormGroup row>
                                    <FormControlLabel
                                        style={{ fontSize: "10px", fontFamily: "Arial" }}
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="disable"
                                            />
                                        }
                                        label={Localization.text("txt_cacheSignIn")}
                                    />
                                    <FormLabel style={{ fontSize: "10px", fontFamily: "Arial" }} label="dsadsadasdas" />
                                </FormGroup>
                            </FormControl >

                            {/* Div Quên mật khẩu */}
                            <div style={{ textAlign: "right", marginRight: "5%", marginTop: "20px" }}>
                                <a href="#" style={{ textDecoration: "none" }}>{Localization.text("txt_forgotPassword")}</a>
                            </div>

                            {/* Button Login  */}
                            <Button className={[classes.buttonSignIn, classes.button].join(" ")}>
                                <p className={classes.buttonText}>{Localization.text("txt_login").toUpperCase()}</p>
                            </Button>

                            {/* Div Policy */}
                            <div className={classes.policy}>
                               {Localization.text("txt_policy")}
                            </div>
                        </div>
                    </Grid>

                    <Grid item md={3}>
                    </Grid>
                </Grid>
                <Grid item md={1} xs={0}></Grid>
            </Grid>
        </>
    );
};

export default Footer;