import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Avatar } from "@material-ui/core";
import { Person, ArrowForwardRounded } from "@material-ui/icons";

// serivce
import "./styles.css";
// config
import Localization from "../../../config/Localization";
import action from "../../../storage/action";
// utils

const SideBar = () => {
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
  const indexProfile = useSelector((state) => state.indexProfile);
  console.log("indexxx: " + indexProfile);
  // handle select
  const handleSelect = (k) => {
    if (indexProfile !== k) {
      dispatch(action.indexProfileAction.update(k));
    }
  };

  // local
  const itemStyle = [
    "profile_sidebar_item",
    "profile_sidebar_item",
    "profile_sidebar_item",
  ];
  itemStyle[indexProfile] += " profile_sidebar_item_active";

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
              {Localization.text("txt_order_history")}
            </div>
            <ArrowForwardRounded className="profile_sidebar_icon_2"></ArrowForwardRounded>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={itemStyle[2]} onClick={() => handleSelect(2)}>
            <Person className="profile_sidebar_icon"></Person>
            <div className="profile_sidebar_item_title">
              {Localization.text("txt_payment_type")}
            </div>
            <ArrowForwardRounded className="profile_sidebar_icon_2"></ArrowForwardRounded>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
