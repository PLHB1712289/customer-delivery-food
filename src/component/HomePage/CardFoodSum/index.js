import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button, Grid, Checkbox, FormControl, FormLabel, FormControlLabel,
    FormGroup, IconButton, OutlinedInput, InputAdornment
} from "@material-ui/core";
import {
    Facebook, AccountCircle, Lock,
    PhoneAndroid, GitHub, Visibility, VisibilityOff
} from '@material-ui/icons';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';

import ImageUtils from "../../../utils/ImageUtils";
import DataUtils from "../../../utils/DataUtils";

import action from "../../../storage/action"
// import apiService from "./apiService";
import Localization from "../../../config/Localization";

import "./styles.css";


const Card = () => {
    // React router hook
    const history = useHistory();
    // use dispatch
    const dispatch = useDispatch();

    return (
        <>
           <div className="card-custom">
               <div className="status"></div>
                <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="image"></img>
                <h2 className="title">Quán Bún Dì Vân</h2>
                <p className="address">Địa chỉ nè</p>
                <hr></hr>
           </div>
        </>
    );
};

export default Card;