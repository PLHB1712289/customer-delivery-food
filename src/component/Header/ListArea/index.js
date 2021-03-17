import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import DropdownButton from "../../Common/CustomDropdown";

import Localization from "../../../config/Localization";
import LangConfig from "../../../config/LangConfig";
import ImageUtils from "../../../utils/ImageUtils";
import DataUtils from "../../../utils/DataUtils";

export default function SimpleMenu(props) {
    const { onChangeLanguage } = props;

    const classes = useStyles();

    // state

    return (
        <DropdownButton
            buttonText="TP. HCM"
            buttonProps={dropdownButtonStyle}
            hoverColor={"#000000"}
            dropdownList={["a", "b"]} />
    );
};

const dropdownButtonStyle = {
    float: "left",
    backgroundColor: "rgba(240, 240, 240, 0.7)",
    width: "120px",
    height: "45px",
    color: "#252525",
    fontSize: "15px",
    marginLeft: "15px",
    transform: "translateY(20%)",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    }
};