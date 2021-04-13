import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import classNames from "classnames";

// core components
import {
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Grow,
  Popper,
  ClickAwayListener,
} from "@material-ui/core";

// config
import RestaurantConfig from "../../../config/RestaurantConfig";
// utils
import ArrayUtils from "../../../utils/ArrayUtils";
// use style
import useStyles from "./styles";
import Localization from "../../../config/Localization";

export default function FilterArea(props) {
  const { buttonText, buttonProps, handleSelect, handleFilter, state } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // use Selector
  const city  = useSelector((state) => state.city);

  // handle click
  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // handle close away
  const handleCloseAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    handleFilter();
  };

  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
  });

  // map data
  const listArea = ArrayUtils.jsonToArray(RestaurantConfig.AREA[city]);
  const data = listArea.map(function (area, index) {
    return (
      <Grid item md={4} key={index}>
        <FormControlLabel
          control={
            <Checkbox
              checked={state[index.toString()]}
              onChange={handleSelect}
              name={index.toString()}
              checkedIcon={
                <span className={clsx(classes.icon, classes.checkedIcon)} />
              }
              icon={<span className={classes.icon} />}
            />
          }
          label={Localization.text("txt_district_" + + city + "_" + (index + 1))}
        />
      </Grid>
    );
  });

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
          <div className={classes.buttonText}>
            {buttonText !== undefined ? buttonText : null}
          </div>
          <div>
            <b className={caretClasses} />
          </div>
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={"bottom"}
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
                <Grid container className={classes.container}>
                  <FormGroup row className={classes.formGroup}>
                    {data}
                  </FormGroup>
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
