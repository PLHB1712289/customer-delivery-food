import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import {} from "@material-ui/icons";
// componets
import SideBar from "../../component/Profile/SideBar";
import UpdateAccount from "../../component/Profile/UpdateAccount";
import OrderHistory from "../../component/Profile/OrderHistory";
import PaymentMethod from "../../component/Profile/PaymentMethods";
// serivce
import action from "../../storage/action";
import store from "../../storage";
import "./styles.css";
// config
import ProfileConfig from "../../config/ProfileConfig";
import Localization from "../../config/Localization";

const Profile = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  // token
  let { token } = useSelector((state) => state.token);
  if (token === null) {
    token = localStorage.getItem("token");
    if (token === null) {
      history.push("/sign-in");
    }
  }

  // index profile
  const indexProfile = useSelector((state) => state.indexProfile);
  var component = null;

  switch (indexProfile) {
    case ProfileConfig.TYPE.UPDATE_ACCOUNT:
      component = <UpdateAccount></UpdateAccount>;
      break;
    case ProfileConfig.TYPE.ORDER_HISTORY:
      component = <OrderHistory></OrderHistory>;
      break;
    case ProfileConfig.TYPE.PAYMENT_METHODS:
      component = <PaymentMethod></PaymentMethod>;
      break;
    default:
      component = <UpdateAccount></UpdateAccount>;
      break;
  }

  return (
    <>
      <Grid container className="profile_global">
        <Grid container item md={3}>
          <SideBar></SideBar>
        </Grid>
        <Grid container item md={9}>
          {component}
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
