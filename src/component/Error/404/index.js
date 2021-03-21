import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid container item md={12}>
                    <Grid item md={12}>

                        <div id="notfound">
                            <div class="notfound">
                                <div>
                                    <div className={classes.notfound_404}>
                                        <h1 className={classes.notfoundSymbol}>!</h1>
                                    </div>
                                    <h2 className={classes.errorText}>Error 404</h2>
                                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="#">Back to homepage</a></p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Footer;