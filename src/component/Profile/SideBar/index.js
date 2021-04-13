import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";
import { Button, Grid, Avatar } from "@material-ui/core";
import { Person, ArrowForwardRounded } from "@material-ui/icons";

// serivce
import "./styles.css";
// config
import Localization from "../../../config/Localization";
// utils

const SideBar = () => {
  // React router hook
  const history = useHistory();
  const location = useLocation();
  // use dispatch
  const dispatch = useDispatch();

  // use local storage
  let { token } = useSelector((state) => state.token);
  let { userID, fullName, avatarUrl } = useSelector((state) => state.profile);
  // use redux
  if (token === null) {
    token = localStorage.getItem("token");
    userID = localStorage.getItem("userID");
    avatarUrl = localStorage.getItem("avatar");
    fullName = localStorage.getItem("fullName");
  }

  // use State
  let index = 0;
  if (location.state) {
    index = location.state.index;
  }
  const [key, setKey] = useState(index ? index : 0);

  // local
  const itemStyle = [
    "profile_sidebar_item",
    "profile_sidebar_item",
    "profile_sidebar_item",
  ];

  // handle select
  const handleSelect = (k) => {
    if (key !== k) {
      setKey(k);
    }
  };

  itemStyle[key] += " profile_sidebar_item_active";

  return (
    <div className="profile_sidebar_global">
      <Grid container>
        <Grid item md={12}>
          <div className="profile_sidebar_user">
            <Avatar className="profile_sidebar_avatar" src={avatarUrl}></Avatar>
            <div className="profile_sidebar_username">{fullName}</div>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={itemStyle[0]} onClick={() => handleSelect(0)}>
            <Person className="profile_sidebar_icon"></Person>
            <div className="profile_sidebar_item_title">
              {Localization.text("txt_update_account")}
            </div>
            <ArrowForwardRounded className="profile_sidebar_icon_2"></ArrowForwardRounded>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={itemStyle[1]} onClick={() => handleSelect(1)}>
            <Person className="profile_sidebar_icon"></Person>
            <div className="profile_sidebar_item_title">
              {Localization.text("txt_payment_type")}
            </div>
            <ArrowForwardRounded className="profile_sidebar_icon_2"></ArrowForwardRounded>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={itemStyle[2]} onClick={() => handleSelect(2)}>
            <Person className="profile_sidebar_icon"></Person>
            <div className="profile_sidebar_item_title">
              {Localization.text("txt_order_history")}
            </div>
            <ArrowForwardRounded className="profile_sidebar_icon_2"></ArrowForwardRounded>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
