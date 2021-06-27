import { useToasts } from "react-toast-notifications";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {
  FormGroup,
  FormControlLabel,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from "../../HomePage/DialogChangeAddress/Map";
import StrUtils from "../../../utils/StrUtils";
import "./styles.css";
import service from "./service";
import clsx from "clsx";
import action from "../../../storage/action";
import {
  geoConvertAddressToLatLong,
  geoConvertLatLongToAddress,
} from "../../../utils/Geocode";
import Localization from "../../../config/Localization";
import apiService from "./apiService";
import { useHistory } from "react-router-dom";
import ZaloPayIcon from "../../../assets/img/zalopay-icon.png";
import CashIcon from "../../../assets/img/cash-icon.png";
import { ORDER_STATUS } from "../../../socket/TAG_EVENT";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const titleDialog = "Xác nhận đặt hàng";
const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

const PaymentMethod = {
  CASH: 0,
  ZALO_PAY: 1,
};

export default function DialogCheckout({
  open,
  onClose,
  renderSignInPage,
  openDialogPayment,
  setDataPayment,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const cart = useSelector((state) => state.cart);
  const { infoRestaurant, listOrder, note } = cart;
  const [feeShip, setFeeShip] = useState(15000);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CASH);
  const typingTimeoutRef = useRef(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Token
  let order = useSelector((state) => state.order);
  let { token } = useSelector((state) => state.token);
  let { userID, fullName, avatarUrl, phone } = useSelector(
    (state) => state.profile
  );
  if (token === null) {
    token = localStorage.getItem("token");
    token = localStorage.getItem("token");
    userID = localStorage.getItem("userID");
    avatarUrl = localStorage.getItem("avatar");
    fullName = localStorage.getItem("fullName");
    phone = localStorage.getItem("phone");
  }

  useEffect(() => {
    if (!location) return;

    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.getShipFee(
          cart.infoRestaurant.id,
          location
        );

        if (errorCode === 0) {
          setFeeShip(data.fee);
        }
      } catch (e) {
        console.log(`[HANDLE_GET_SHIP_FEE]: ${e.message}`);
      }
    })();
  }, [cart]);

  const updateCurrentLocation = async (pos) => {
    const { latitude, longitude } = pos.coords;
    const address = await geoConvertLatLongToAddress(latitude, longitude);
    setLocation(address);
    setLat(latitude);
    setLng(longitude);
    onGetFeeShip();
    dispatch(
      action.addressDeliveryAction.updateCoordinate(latitude, longitude)
    );
  };

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const hanleGetCurrentLocation = async (callback) => {
    if (navigator.geolocation) {
      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(callback);
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(callback, errors, options);
      } else if (result.state === "denied") {
        alert(tileAlertLocation);
      }

      result.onchange = function () {
        console.log(result.state);
      };
    } else {
      alert("Sorry Not available!");
    }
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const { lat, lng } = await geoConvertAddressToLatLong(e.target.value);
      setLat(lat);
      setLng(lng);
      onGetFeeShip();
      dispatch(action.addressDeliveryAction.updateCoordinate(lat, lng));
    }, 1000);
  };

  const handleOnOrder = () => {
    if (!token) renderSignInPage();
    if (order.status && order.status !== -1) {
      onClose();
      addToast("Bạn đã đạt giới hạn đơn hàng tại 1 thời điểm", {
        appearance: "info",
      });
      return;
    }
    if (!location) return;

    var dataOrder = {};
    dataOrder.foods = [];

    // list food
    for (var i = 0; i < listOrder.length; i++) {
      dataOrder.foods[i] = {};
      dataOrder.foods[i].id = listOrder[i].id;
      dataOrder.foods[i].quantity = listOrder[i].quantity;
      dataOrder.foods[i].price = listOrder[i].OriginalPrice;
      var options = [];
      for (var j = 0; j < listOrder[i].Options.length; j++) {
        var _option = listOrder[i].Options[j];
        var option = {};
        option.id = _option.id;
        option.items = [];
        for (var k = 0; k < _option.Items.length; k++) {
          var _item = _option.Items[k];
          var item = {};
          if (_item.IsDefault) {
            item.id = _item.id;
            item.price = _item.OriginalPrice;
            item.quantity = 1;
            option.items.push(item);
          }
        }
        if (option.items.length > 0) {
          options.push(option);
        }
      }
      if (options.length > 0) {
        dataOrder.foods[i].options = options;
      }
    }

    // total price
    dataOrder.subtotal = listOrder.reduce((total, currOrder) => {
      total += currOrder.quantity * currOrder.TotalMoney;
      return total;
    }, 0);

    // ship fee
    dataOrder.shippingfee = feeShip;
    dataOrder.address = location;
    dataOrder.longitude = lng;
    dataOrder.latitude = lat;
    dataOrder.phone = phone;
    dataOrder.method = paymentMethod;

    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.sendOrder(dataOrder);
        // const { errorCode, data } = await apiService.sendOrder(fakeOrderData);

        if (errorCode === 0) {

          dispatch(action.orderAction.create(data));
          if (data.paymentInfo !== null) {
            var dataPayment = { ...data.paymentInfo };
            dataPayment.total = data.Total;
            setDataPayment(dataPayment);
            onClose();
            openDialogPayment();
            dispatch(
              action.orderAction.updateStatus(ORDER_STATUS.WAITING_PAYMENT)
            );
          } else {
            dispatch(action.orderAction.updateStatus(ORDER_STATUS.WAITING));
            history.push("/");
          }
        }
      } catch (e) {
        console.log(`[HANDLE_SEND_ORDER]: ${e.message}`);
      }
    })();
  };

  const onGetFeeShip = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(handleGetShipFee, 700);
  };

  const handleGetShipFee = function () {
    (async () => {
      try {
        // request to server
        const object = await apiService.getShipFee(
          cart.infoRestaurant.id,
          location
        );
        
        console.log("shipppppp: " + JSON.stringify(object.data));
        if (object.errorCode === 0) {
         setFeeShip(object.data.fee);
        }
      } catch (e) {
        console.log(`[HANDLE_GET_SHIP_FEE]: ${e.message}`);
      }
    })();
  };

  for (var k = 0; k < listOrder.length; k++) {
    var strOptions = "";
    var totalPrice = listOrder[k].OriginalPrice;
    for (var i = 0; i < listOrder[k].Options.length; i++) {
      for (var j = 0; j < listOrder[k].Options[i].Items.length; j++) {
        if (listOrder[k].Options[i].Items[j].IsDefault) {
          totalPrice += listOrder[k].Options[i].Items[j].OriginalPrice;
          strOptions += listOrder[k].Options[i].Items[j].Name + ", ";
        }
      }
    }
    if (strOptions.length > 2) {
      strOptions = strOptions.substr(0, strOptions.length - 2);
    }
    listOrder[k].TotalMoney = totalPrice;
    listOrder[k].StrOption = strOptions;
  }

  return (
    <Dialog
      open={open}
      transitionDuration={{ appear: 400, enter: 500, exit: 300 }}
      TransitionComponent={Transition}
      maxWidth="md"
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <div className="dialog-checkout__container">
        <IconButton
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            borderRadius: 2,
            padding: 2,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          className="dialog-checkout__title"
          id="alert-dialog-slide-title"
        >
          {titleDialog}
        </DialogTitle>
        <DialogContent className="dialog-checkout__body">
          <div className="dialog-checkout__item dialog-checkout__address-and-order">
            <div className="dialog-checkout__address">
              <div className="dialog-checkout__address-item">
                <div className="dialog-checkout__address-item-lable">Từ: </div>
                <div className="dialog-checkout__address-item-name-restaurant">
                  {infoRestaurant.Name}
                </div>
                <div className="dialog-checkout__address-item-address-restaurant">
                  {infoRestaurant.FullAddress}
                </div>
              </div>
              <div className="dialog-checkout__address-item">
                <div className="dialog-checkout__address-item-lable">Đến: </div>
                <div className="dialog-checkout__address-item-name-restaurant">
                  {location === null ? (
                    <span style={{ color: "red" }}>
                      {Localization.text("txt_require_address")}
                    </span>
                  ) : (
                    location
                  )}
                </div>
                <div className="dialog-checkout__address-item-address-restaurant"></div>
              </div>

              <div className="dialog-checkout__address-change">
                <button>Thay đổi thông tin giao hàng</button>
              </div>
            </div>

            <div className="dialog-checkout__address">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  margin: "10px 0px 0px 10px",
                }}
              >
                Phương thức thanh toán
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  marginTop: "5px",
                }}
              >
                <FormGroup row className="dialog-option__action__form-group">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paymentMethod === PaymentMethod.CASH}
                        onChange={() => setPaymentMethod(PaymentMethod.CASH)}
                        checkedIcon={
                          <span
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                      />
                    }
                    label={
                      <div>
                        <img
                          src={CashIcon}
                          width="50px"
                          height="40px"
                          style={{ marginTop: "5px" }}
                        ></img>
                      </div>
                    }
                    style={{ color: "black" }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paymentMethod === PaymentMethod.ZALO_PAY}
                        onChange={() =>
                          setPaymentMethod(PaymentMethod.ZALO_PAY)
                        }
                        checkedIcon={
                          <span
                            className={clsx(classes.icon, classes.checkedIcon)}
                          />
                        }
                        icon={<span className={classes.icon} />}
                      />
                    }
                    label={
                      <img
                        src={ZaloPayIcon}
                        width="50px"
                        height="20px"
                        style={{ marginTop: "5px" }}
                      ></img>
                    }
                    style={{ color: "black" }}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="dialog-checkout__order">
              <span>Chi tiết đơn hàng</span>
              <div className="dialog-checkout__order-container">
                {listOrder.map((order, index) => {
                  return (
                    <div className="dialog-checkout__order-item" key={index}>
                      <div className="dialog-checkout__order-item-quantity">
                        {order.quantity}
                      </div>
                      <div
                        className="dialog-checkout__order-item-name-food"
                        style={{ fontWeight: "bold" }}
                      >
                        {order.Name}&nbsp;
                        <div
                          style={{ fontSize: "0.7rem", fontWeight: "normal" }}
                        >
                          {order.StrOption === ""
                            ? ""
                            : "(" + order.StrOption + ")"}
                        </div>
                      </div>
                      <div className="dialog-checkout__order-item-price">
                        {StrUtils.formatMoneyString(
                          order.TotalMoney * order.quantity
                        )}
                        đ
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="dialog-checkout__order-note">
                <span>Ghi chú</span>
              </div>

              <div className="dialog-checkout__order-total">
                <div className="dialog-checkout__order-total-title">
                  Tổng cộng{" "}
                  <span>
                    {listOrder.reduce((total, currOrder) => {
                      total += currOrder.quantity;
                      return total;
                    }, 0)}
                  </span>{" "}
                  phần
                </div>
                <div className="dialog-checkout__order-total-price">
                  {StrUtils.formatMoneyString(
                    listOrder.reduce((total, currOrder) => {
                      total += currOrder.quantity * currOrder.TotalMoney;
                      return total;
                    }, 0)
                  )}
                  đ
                </div>
              </div>

              <div className="dialog-checkout__order-fee-ship">
                <div className="dialog-checkout__order-fee-ship-title">
                  Phí vận chuyển {distance}km
                </div>
                <div className="dialog-checkout__order-fee-ship-price">
                  {location === null
                    ? Localization.text("txt_require_address")
                    : StrUtils.formatMoneyString(feeShip) + "d"}
                </div>
              </div>
            </div>
          </div>

          <div className="dialog-checkout__item dialog-checkout__map">
            <div className="dialog-change-address__input-location">
              <SearchIcon fontSize="small" />
              <input
                style={{ width: "100%" }}
                value={location || ""}
                onChange={handleChangeLocation}
              />
              {location ? (
                <CancelIcon
                  fontSize="small"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLocation(null)}
                />
              ) : (
                <MyLocationIcon
                  fontSize="small"
                  style={{ cursor: "pointer" }}
                  onClick={() => hanleGetCurrentLocation(updateCurrentLocation)}
                />
              )}
            </div>
            <Map lat={lat} lng={lng} tagMarker="Bạn" />
          </div>

          <div className="dialog-checkout__item dialog-checkout__total">
            <div className="dialog-checkout__total_title">
              {Localization.text("txt_total")}
            </div>
            <div className="dialog-checkout__total_price">
              {StrUtils.formatMoneyString(
                listOrder.reduce((total, currOrder) => {
                  total += currOrder.quantity * currOrder.TotalMoney;
                  return total;
                }, 0) + (location === null ? 0 : feeShip)
              )}
              đ
            </div>
          </div>

          <button
            className="dialog-checkout__item dialog-checkout__btn-checkout"
            onClick={handleOnOrder}
          >
            {Localization.text("txt_order")}
          </button>
        </DialogContent>
      </div>
    </Dialog>
  );
}

const fakeOrderData = {
  foods: [
    {
      id: "60a79a9cb7245f28182cf906",
      price: 104000,
      quantity: 2,
    },
    {
      id: "60a79a9cb7245f28182cf90a",
      price: 35000,
      quantity: 1,
    },
  ],
  subtotal: 243000,
  shippingfee: 10000,
  address: "273 Nguyễn Văn Cừ, P. 4, Quận 5, TP. HCM",
  phone: "0331234567",
  longitude: 100.1234567,
  latitude: 10.1234567,
  method: 0,
};

const useStyles = makeStyles({
  icon: {
    borderRadius: "25%",
    width: "1.5rem",
    height: "1.5rem",
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.6), inset 0 -1px 0 rgba(16,22,26,.6)",
    backgroundColor: "white",
    "input:hover ~ &": {
      backgroundColor: "white",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "white",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: "1.5rem",
      height: "1.5rem",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23cf2127'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});
