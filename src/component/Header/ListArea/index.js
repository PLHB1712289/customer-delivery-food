import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import DropdownButton from "../../Common/CustomDropdown";

import Localization from "../../../config/Localization";
import LangConfig from "../../../config/LangConfig";
import RestaurantConfig from "../../../config/RestaurantConfig";
import ImageUtils from "../../../utils/ImageUtils";
import ArrayUtils from "../../../utils/ArrayUtils";

import action from "../../../storage/action";


export default function SimpleMenu() {
  const classes = useStyles();

  const dispatch = useDispatch();

  // state
  const data = ArrayUtils.jsonToArray(RestaurantConfig.CITY);
  const [city, setCity] = useState(0);

  // handle select
  const handleSelect = (index) => {
      setCity(index);
      dispatch(action.cityAction.update(index));
  };

  return (
    <DropdownButton
      buttonText={RestaurantConfig.CITY[city]}
      buttonProps={dropdownButtonStyle}
      hoverColor={"#000000"}
      dropdownList={data}
      handleSelect={handleSelect}
    />
  );
}

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
  },
};
