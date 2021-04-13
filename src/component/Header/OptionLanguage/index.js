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
    let current_language = localStorage.getItem("langType");
    current_language = current_language !== undefined && current_language !== null ? current_language : LangConfig.DEFAULT_LANGUAGE;
    LangConfig.changeLang(parseInt(current_language));

    return (
        <DropdownButton
            beforeImage={ImageUtils.getFileFlag(LangConfig.DEFAULT_LANGUAGE)}
            buttonProps={languageButtonStyle}
            dropdownList={DataUtils.getListOptionLanguage()}
            handleItemClick={onChangeLanguage} />
    );
};

const languageButtonStyle = {
    backgroundColor: "rgba(240, 240, 240, 0.7)",
    width: "50px",
    height: "30px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    transform: "translateY(60%)",
};
