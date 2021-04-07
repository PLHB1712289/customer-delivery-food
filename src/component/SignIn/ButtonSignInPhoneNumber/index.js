import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";

// service 
import "./styles.css";
// config
import Localization from "../../../config/Localization";

// The element to be shown in the modal window
function CustomDialogContent() {
  // use this hook to control the dialog
  const dialog = useDialog();

  const [value, setValue] = useState();

  return (
    <div className="popupSignInPhoneNumber_panel">
        <input
            type="text"
            onChange={(e) => {
            setValue(e.target.value);
            }}
        />
        <button
            onClick={() => {
            // Сlose the dialog and return the value
            dialog.close(value);
            }}
        >
            Custom button
        </button>
    </div>
  );
}

export default CustomDialogContent;

