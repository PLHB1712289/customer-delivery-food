import React from 'react';
import useStyles from "./styles";
import {
    Paper, Grow, Divider, Icon, ClickAwayListener,
    Popper, MenuList, MenuItem, Button, Avatar
} from "@material-ui/core";
import classNames from "classnames";
import {AccountCircle, History, CardGiftcard, ExitToApp} from '@material-ui/icons';
import Localization from "../../../config/Localization";

export default function SimpleMenu(props) {
    const classes = useStyles();

    const { customStyle } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleCloseAway = event => {
        if (anchorEl.contains(event.target)) {
            return;
        }
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={customStyle}>
                <div className={classes.titleText}>{"Tử Văn"}</div>
                <Avatar className={classes.small}></Avatar>
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
                    [classes.popperResponsive]: true
                })}
            >
                {() => (
                    <Grow
                        in={Boolean(anchorEl)}
                        id="menu-list"
                        style={{ transformOrigin: "0 0 0" }
                        }
                    >
                        <Paper className={classes.dropdown}>
                            <ClickAwayListener onClickAway={handleCloseAway}>
                                <MenuList role="menu" className={classes.menuList}>
                                    <MenuItem className={classes.itemFirst}>
                                        <History className={classes.iconOrder}></History>
                                        {Localization.text("txt_order_history")}
                                    </MenuItem>
                                    <MenuItem className={classes.item}>
                                        <CardGiftcard className={classes.iconVoucher}></CardGiftcard>
                                        {Localization.text("txt_my_vouchers")}
                                    </MenuItem>
                                    <MenuItem className={classes.item}>
                                        <AccountCircle className={classes.iconAccount}></AccountCircle>
                                        {Localization.text("txt_update_account")}
                                    </MenuItem>
                                    <MenuItem className={classes.item}>
                                        <ExitToApp className={classes.iconLogout}></ExitToApp>
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
};

