import React from "react";
import useStyles from "./styles";
import { SemipolarLoading } from "react-loadingg";
import { useSelector } from "react-redux";

const Loading = () => {
    const classes = useStyles();

    const { isdisplay } = useSelector((state) => state.loading);

    return (
        <>
            {isdisplay ? (
                <>
                    <div className={classes.root}>
                        <div className={classes.case}>
                            <div>
                                <SemipolarLoading />
                            </div>
                        </div>
                        <div
                            style={{
                                color: "white",
                                marginTop: 100,
                                textAlign: "center",
                                fontWeight: 600,
                            }}
                        >
                            loading
            </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default Loading;
// export default Loading;
