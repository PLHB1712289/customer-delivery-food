import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Paper, Grow, Divider, Icon, Popper } from "@material-ui/core";
import classNames from "classnames";

// core components
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";

export default function CustomDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (param) => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const handleCloseAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };
  const classes = useStyles();
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    left,
    rtlActive,
    noLiPadding,
    beforeImage,
    handleItemClick,
    handleSelect,
    type
  } = props;
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  let image = null;
  let icon = null;
  switch (typeof buttonIcon) {
    case "object":
      icon = <props.buttonIcon className={classes.buttonIcon} />;
      break;
    case "string":
      icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
      break;
    default:
      icon = null;
      break;
  }

  if (beforeImage) {
    image = <img alt="" src={beforeImage}></img>;
  }

  return (
    <div>
      <div>
        <Button
          aria-label="Notifications"
          aria-owns={anchorEl ? "menu-list" : null}
          aria-haspopup="true"
          style={{ ...buttonProps }}
          onClick={handleClick}
        >
          {image}
          {icon}
          <div>{buttonText !== undefined ? buttonText : null}</div>
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={
          dropup
            ? left
              ? "top-start"
              : "top"
            : left
            ? "bottom-start"
            : "bottom"
        }
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.popperResponsive]: true,
        })}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            id="menu-list"
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <Paper
              className={
                type === "filter" ? classes.dropdownFilter : classes.dropdown
              }
            >
              <ClickAwayListener onClickAway={handleCloseAway}>
                <MenuList role="menu" className={classes.menuList}>
                  {dropdownHeader !== undefined ? (
                    <MenuItem
                      onClick={() => handleClose(dropdownHeader)}
                      className={classes.dropdownHeader}
                    >
                      {dropdownHeader}
                    </MenuItem>
                  ) : null}
                  {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                      return (
                        <Divider
                          key={key}
                          onClick={() => handleClose("divider")}
                          className={classes.dropdownDividerItem}
                        />
                      );
                    }

                    if (beforeImage) {
                      return (
                        <MenuItem
                          key={key}
                          onClick={() => handleItemClick(prop.tag)}
                        >
                          <img
                            src={prop.image}
                            style={{ marginRight: "10px" }}
                          ></img>
                          {prop.text}
                        </MenuItem>
                      );
                    }

                    if (type === "filter") {
                        return (

                            <MenuItem
                                key={key}
                                style={filterStyle}
                                onClick={() => handleItemClick(prop.index)}
                            >
                                {prop.name}
                            </MenuItem>
                        );
                    }

                    return (
                      <MenuItem
                        key={key}
                        onClick={() => handleSelect(key)}
                        style={key == 0 ? itemAboveStyle : itemMiddleStyle}
                      >
                        {prop}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: "primary",
};

const itemAboveStyle = {
  border: "1px solid #CCC",
  padding: "1px 0px 1px 20px",
  margin: 0,
  top: 0,
  right: 0,
};

const itemMiddleStyle = {
  borderLeft: "1px solid #CCC",
  borderRight: "1px solid #CCC",
  borderBottom: "1px solid #CCC",
  borderTop: "0px solid #CCC",
  padding: "1px 0px 1px 20px",
  margin: 0,
  top: 0,
  right: 0,
};

const filterStyle = {
  top: 0,
  left: 0,
  textAlign: "left",
  lineHeight: "1",
};
