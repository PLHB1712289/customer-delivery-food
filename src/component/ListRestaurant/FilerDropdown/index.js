import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import DropdownButton from "../../Common/CustomDropdown";

import Localization from "../../../config/Localization";
import LangConfig from "../../../config/LangConfig";
import ImageUtils from "../../../utils/ImageUtils";
import DataUtils from "../../../utils/DataUtils";

export default function FilterDropdown(props) {
    const classes = useStyles();
    const data = DataUtils.getFilterRestaurant();

    const { handleSelect } = props;

    // state
    let [index, setIndex] = useState(0);

    const handleItemClick = (i) => {
        if (index !== i) {
            setIndex(i);
            handleSelect(i);
        }
    };

    return (
        <DropdownButton
            buttonText={data[index].name}
            type="filter"
            buttonProps={dropdownButtonStyle}
            dropdownList={data}
            handleItemClick={handleItemClick}
             />
    );
};

const dropdownButtonStyle = {
    backgroundColor: "white",
    border: "1px solid #bbb",
    fontSize: "12px",
    width: "13em",
    paddingLeft: 0
};