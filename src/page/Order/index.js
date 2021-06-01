import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
// serivce
import action from "../../storage/action";
import store from "../../storage";
import "./style.css";
// config
import Localization from "../../config/Localization";

const Order = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const order = useSelector((state) => state.order);

    
  useEffect(() => {
    
  }, [order]);

    return (
        <>
            {JSON.stringify(order)}
        </>
    )
}

export default Order;