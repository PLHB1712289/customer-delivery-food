import React from "react";
import "./styles.css";

import { ThumbUpAlt } from "@material-ui/icons";

export default function SpanLike(props) {
  const { size } = props;


  return (
    <div className="container-span-like small">
        <ThumbUpAlt className="icon-like"/>
        <div className="text-like">Yêu thích</div>
    </div>
  );
}
