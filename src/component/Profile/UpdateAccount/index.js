import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CustomDialog, useDialog } from "react-st-modal";
import { Button, Grid, Avatar } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

// serivce
import "./styles.css";
import action from "../../../storage/action";
import service from "./service";
// config
import Localization from "../../../config/Localization";
// utils
import DataUtils from "../../../utils/DataUtils";

const SideBar = () => {
  // React router hook
  const history = useHistory();
  const location = useLocation();
  // use dispatch
  const dispatch = useDispatch();

  // use state
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullname] = useState("");
  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0);
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [_address, _setAddress] = useState("");
  const [_avatarUrl, _setAvatarUrl] = useState("");
  const [_fullName, _setFullname] = useState("");
  const [_city, _setCity] = useState(0);
  const [_district, _setDistrict] = useState(0);
  const [_gender, _setGender] = useState(0);
  const [_email, _setEmail] = useState("");
  const [_password, _setPassword] = useState("");
  const [_phoneNumber, _setPhoneNumber] = useState("");

  const [disabledAddress, setDisabledAddress] = useState("disabled");
  const [disabledInfo, setDisabledInfo] = useState("disabled");

  // use effect
  useEffect(() => {
    dispatch(action.loadingAction.turnOn());

    (async () => {
      try {
        let { status, message, data } = await service.getProfile();

        dispatch(action.loadingAction.turnOff());
        status = parseInt(status);

        if (status === 0) {
          setAvatarUrl(data.avatarUrl);
          setFullname(data.fullName);
          setAddress(data.address);
          setCity(data.city);
          setDistrict(data.district);
          setGender(data.gender);
          setEmail(data.email);
          setPassword(data.password);
          setPhoneNumber(data.phoneNumber);

          _setAvatarUrl(data.avatarUrl);
          _setFullname(data.fullName);
          _setAddress(data.address);
          _setCity(data.city);
          _setDistrict(data.district);
          _setGender(data.gender);
          _setEmail(data.email);
          _setPassword(data.password);
          _setPhoneNumber(data.phoneNumber);
        } else {
          // alert(message);
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_VOUCHER]: ${e.message}`);
      }
    })();
  }, []);

  // handle
  const onChangeAddress = (e) => {
    _setAddress(e.target.value);
  };

  const onChangeFullname = (e) => {
    _setFullname(e.target.value);
  };

  const handleSelectCity = (e) => {
    _setCity(parseInt(e.target.value));
    _setDistrict(parseInt(0));
  };

  const handleSelectArea = (e) => {
    _setDistrict(parseInt(e.target.value));
  };

  const handleSelectGender = (e) => {
    _setGender(parseInt(e.target.value));
  };

  // change

  const onHanldeAddress = () => {
    if (disabledAddress === "disabled") {
      setDisabledAddress("");
    } else {
      onUpdateProfile();
      setDisabledAddress("disabled");
    }
  };

  const onHanldeInfo = () => {
    if (disabledInfo === "disabled") {
      setDisabledInfo("");
    } else {
      onUpdateProfile();
      setDisabledInfo("disabled");
    }
  };

  const onCancelAddress = () => {
    _setAddress(address);
    _setCity(city);
    _setDistrict(district);
    setDisabledAddress("disabled");
  };

  const onCancelInfo = () => {
    _setFullname(fullName);
    _setGender(gender);
    setDisabledInfo("disabled");
  };

  const onUpdateProfile = async () => {
    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        const passData = {
          fullName: _fullName,
          address: _address,
          city: _city,
          district: _district,
          avatarUrl: _avatarUrl,
          gender: _gender,
          email: _email,
          password: _password,
          phoneNumber: _phoneNumber,
        };

        // request to server
        const { status, message, data } = await service.updateProfile(passData);

        dispatch(action.loadingAction.turnOff());

        if (status === 0) {
          setAvatarUrl(_avatarUrl);
          setFullname(_fullName);
          setAddress(_address);
          setCity(_city);
          setDistrict(_district);
          setGender(_gender);
          setEmail(_email);
          setPassword(_password);
          setPhoneNumber(_phoneNumber);
        }
      } catch (e) {
        console.log(`[Update Profile Failed]: ${e.message}`);
      }
    })();
  };

  return (
    <div className="profile_updateAccount_global">
      <Grid container>
        <Grid item md={12}>
          <div className="profile_updateAccount_title">
            {Localization.text("txt_profile_info")}
          </div>
          <hr className="profile_updateAccount_breakLine"></hr>
        </Grid>
        <Grid item md={12}>
          <Avatar
            className="profile_updateAccount_avatar"
            src={_avatarUrl}
          ></Avatar>
          <div className="profile_updateAccount_spanUpdateAvatar">
            <div>cập nhập ảnh đại diện với kích thước tối đa 2MB</div>
            <button className="profile_updateAccount_button">
              {Localization.text("txt_update")}
            </button>
          </div>
          <hr className="profile_updateAccount_breakLine2"></hr>
        </Grid>
        <Grid item md={12}>
          <div className="profile_updateAccount_subTitile">
            {Localization.text("txt_address_info")}
          </div>
          <form className="profile_updateAccount_formAddress">
            <input
              className="profile_updateAccount_inputHomeAddress"
              value={_address}
              onChange={onChangeAddress}
              placeholder="Địa chỉ - số nhà, tên đường, phường,..."
              disabled={disabledAddress}
            ></input>
            {/* <select
              className="profile_updateAccount_inputCity"
              disabled={disabledAddress}
              onChange={handleSelectCity}
            >
              {DataUtils.mapCityProfile()}
            </select> */}
            {/* <select
              className="profile_updateAccount_inputCity"
              disabled={disabledAddress}
              onChange={handleSelectArea}
            >
              {DataUtils.mapAreaProfile(_city)}
            </select> */}
          </form>
          {disabledAddress === "disabled" ? (
            <button
              className="profile_updateAccount_button_address"
              onClick={onHanldeAddress}
            >
              {Localization.text("txt_update")}
            </button>
          ) : (
            <>
              <button
                className="profile_updateAccount_button_address profile_updateAccount_button_access"
                onClick={onHanldeAddress}
              >
                {Localization.text("txt_save")}
              </button>
              <button
                className="profile_updateAccount_button_cancel"
                onClick={onCancelAddress}
              >
                {Localization.text("txt_cancel")}
              </button>
            </>
          )}
          <hr className="profile_updateAccount_breakLine2"></hr>
        </Grid>
        <Grid item md={12}>
          <div className="profile_updateAccount_subTitile">
            {Localization.text("txt_personal_info")}
          </div>
          <form className="profile_updateAccount_formInfo">
            <label for="fname">{Localization.text("txt_fullname")}:</label>
            <input
              className="profile_updateAccount_inputInfo"
              type="text"
              id="fname"
              name="fname"
              value={_fullName}
              onChange={onChangeFullname}
              disabled={disabledInfo}
            ></input>
            <label for="lname">{Localization.text("txt_gender")}:</label>
            <select
              className="profile_updateAccount_inputInfo"
              disabled={disabledInfo}
              onChange={handleSelectGender}
            >
              {DataUtils.mapGenderProfile()}
            </select>
          </form>
          <div className="profile_updateAccount_hardInfo">
            <div style={{ float: "left" }}>Email:</div>
            <div style={{ marginLeft: "7.5em" }}>{_email}</div>
          </div>
          <div className="profile_updateAccount_hardInfo">
            <div style={{ float: "left" }}>
              {Localization.text("txt_password")}:
            </div>
            <div style={{ marginLeft: "7.5em", fontWeight: "bold" }}>
              {_password}
            </div>
          </div>
          {disabledInfo === "disabled" ? (
            <button
              className="profile_updateAccount_button_info"
              onClick={onHanldeInfo}
            >
              {Localization.text("txt_update")}
            </button>
          ) : (
            <>
              <button
                className="profile_updateAccount_button_info profile_updateAccount_button_access"
                onClick={onHanldeInfo}
              >
                {Localization.text("txt_save")}
              </button>
              <button
                className="profile_updateAccount_button_cancel"
                onClick={onCancelInfo}
              >
                {Localization.text("txt_cancel")}
              </button>
            </>
          )}
          <hr className="profile_updateAccount_breakLine2"></hr>
        </Grid>
        <Grid item md={12}>
          <div className="profile_updateAccount_subTitile">
            {Localization.text("Phone number management")}
          </div>
          <div className="profile_updateAccount_phoneNumber">
            <div style={{ display: "inline", float: "left" }}>
              {_phoneNumber}
            </div>
            <div className="profile_updateAccount_vertifyPhoneNumber">
              <CheckCircle
                style={{
                  float: "left",
                  width: "20px",
                  height: "20px",
                  color: "green",
                }}
              ></CheckCircle>
              <div style={{ marginLeft: "30px" }}>
                {Localization.text("Phone number is authenticated")}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
