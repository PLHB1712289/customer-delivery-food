import React from "react";
import "./styles.css";
import Localize from "../../../config/Localization";
import Localization from "../../../config/Localization";

const TimeLineCancel = (props) => {
  const { message } = props;

  const totalItems = items.length;
  const numberOfActiveItems = items.length;
  const progressBarWidth =
    totalItems > 1 ? ((numberOfActiveItems - 1) / (totalItems - 1)) * 100 : 0;

  return (
    <div className="timeline_cancel">
      <div
        className="timeline_cancel-progress"
        style={{ width: `${progressBarWidth}%` }}
      ></div>
      <div className="timeline_cancel-items">
        {items.map((item, i) => (
          <div key={i} className="timeline_cancel-item active">
            {item.name !== "" ? (
              <div className="timeline_cancel-content">{message}</div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

var items = [
  {
    name: "",
  },
  {
    name: Localization.text("txt_order_get"),
  },
];

export default TimeLineCancel;
