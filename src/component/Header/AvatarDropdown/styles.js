const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: theme.spacing(2)
    },
    name: {
        fontWeight: "bold"
    },
    caret: {
        transition: "all 150ms ease-in",
        display: "inline-block",
        width: "7px",
        height: "7px",
        transform: "translateY(30%)",
        marginLeft:  theme.spacing(1),
        verticalAlign: "middle",
        borderTop: "4px solid",
        borderRight: "4px solid transparent",
        borderLeft: "4px solid transparent"
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    titleIcon: {
        marginLeft: theme.spacing(1)
    },
    titleText: {
        fontWeight: "bold"
    },
    itemFirst: {
        width: theme.spacing(25),
        height: theme.spacing(7),
        border: "1px solid #CCC",
        margin: "0px",
        top: "0px",
        right: "0px",
        padding: "1px 0px 1px 20px",
        fontSize: "15px"
    },
    item: {
        width: theme.spacing(25),
        height: theme.spacing(7),
        borderLeft: "1px solid #CCC",
        borderRight: "1px solid #CCC",
        borderBottom: "1px solid #CCC",
        margin: "0px",
        top: "0px",
        right: "0px",
        padding: "1px 0px 1px 20px",
        fontSize: "15px"
    },
    menuList: {
        padding: 0,
        margin: 0,
    },
    iconOrder: {
        color: "green",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1)
    },
    iconVoucher: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1)
    },
    iconAccount: {
        color: "orange",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1)
    },
    iconLogout: {
        color: "gray",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1)
    },
    username: {
        marginLeft: theme.spacing(1),
        fontWeight: "bold"
    }
}));
