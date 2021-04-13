import React from "react";
import "./styles.css";

import { ThumbUpAlt } from "@material-ui/icons";

import Localization from "../../../config/Localization";

export default function SpanLike(props) {
  const { size } = props;


  return (
    <div className="container-span-like small">
        <ThumbUpAlt className="icon-like"/>
        <div className="text-like">{Localization.text("txt_preferred")}</div>
    </div>
  );
}
