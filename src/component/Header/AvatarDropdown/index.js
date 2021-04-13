import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import {
  AccountCircle,
  History,
  CardGiftcard,
  ExitToApp,
} from "@material-ui/icons";

// service
import action from "../../../storage/action";
// config
import ProfileConfig from "../../../config/ProfileConfig";
import StrUtils from "../../../utils/StrUtils";
import Localization from "../../../config/Localization";
import { act } from "react-dom/test-utils";

export default function SimpleMenu(props) {
  const classes = useStyles();

  // dispatch
  const dispatch = useDispatch();

  // history
  const history = useHistory();

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

  // handle select
  const handleSelect = (index) => {
    dispatch(action.indexProfileAction.update(index));
    history.push({
      pathname: "/profile",
    });
  };

  // handle logout
  const handleLogout = () => {
    dispatch(action.tokenAction.signOut());
    dispatch(action.profileAction.signOut());
    localStorage.removeItem("token");
    localStorage.setItem("userID", -1);
    localStorage.setItem("avatar", "");
    localStorage.setItem("fullName", "");
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
        <Avatar className={classes.small} src={avatarUrl}></Avatar>
        <div className={classes.name}>
          {StrUtils.formatUsernameUI(fullName)}
        </div>
        {/* <b className={classes.caret} /> */}
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
                    <div className={classes.username}>{"Hi, " + fullName}</div>
                  </MenuItem>
                  <MenuItem
                    className={classes.item}
                    onClick={() =>
                      handleSelect(ProfileConfig.TYPE.ORDER_HISTORY)
                    }
                  >
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
                  <MenuItem
                    className={classes.item}
                    onClick={() =>
                      handleSelect(ProfileConfig.TYPE.UPDATE_ACCOUNT)
                    }
                  >
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
