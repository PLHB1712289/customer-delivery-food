import React from "react";
import useStyles from "./styles";
import {
  Paper,
  Grow,
  ClickAwayListener,
  Popper,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@material-ui/core";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AccountCircle,
  History,
  CardGiftcard,
  ExitToApp,
} from "@material-ui/icons";

import action from "../../../storage/action";
import StrUtils from "../../../utils/StrUtils";
import Localization from "../../../config/Localization";

export default function SimpleMenu(props) {
  const classes = useStyles();

  // dispatch
  const dispatch = useDispatch();

  // history
  const history = useHistory();

  // use local storage
  const { token } = useSelector((state) => state.token);
  const  profile  = useSelector((state) => state.profile);

//   let userID = 1;
//   let avatarUrl = "Martin";
//   let fullName = "Martin";

  let userID = profile.id;
  let avatarUrl = profile.fullName;
  let fullName = profile.avatarUrl;

  if (userID === -1) {
    userID = localStorage.getItem("userID");
    avatarUrl = localStorage.getItem("avatar");
    fullName = localStorage.getItem("fullName");
  }

  const { customStyle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  // handle open
  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // handle close
  const handleCloseAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(action.tokenAction.signOut());
    dispatch(action.profileAction.update(-1, "", ""));
    localStorage.removeItem("token");
    localStorage.setItem("userID", -1);
    localStorage.setItem("avatar", "");
    localStorage.setItem("fullName", "");
    // dispatch(action.tokenAction.signOut());
    // dispatch(action.profileAction.update("", null, ""));
    history.push("/sign-in");
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={customStyle}
      >
        <div className={classes.titleText}>
          {StrUtils.formatUsernameUI(fullName)}
        </div>
        <Avatar className={classes.small} src={avatarUrl}></Avatar>
        <b className={classes.caret} />
      </Button>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={"bottom-start"}
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
        })}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            id="menu-list"
            style={{ transformOrigin: "0 0 0" }}
          >
            <Paper className={classes.dropdown}>
              <ClickAwayListener onClickAway={handleCloseAway}>
                <MenuList role="menu" className={classes.menuList}>
                  <MenuItem className={classes.itemFirst}>
                    <History className={classes.iconOrder} />
                    {Localization.text("txt_order_history")}
                  </MenuItem>
                  <MenuItem className={classes.item}>
                    <CardGiftcard
                      className={classes.iconVoucher}
                      color="primary"
                    />
                    {Localization.text("txt_my_vouchers")}
                  </MenuItem>
                  <MenuItem className={classes.item}>
                    <AccountCircle className={classes.iconAccount} />
                    {Localization.text("txt_update_account")}
                  </MenuItem>
                  <MenuItem className={classes.item} onClick={handleLogout}>
                    <ExitToApp className={classes.iconLogout} />
                    {Localization.text("txt_logout")}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
