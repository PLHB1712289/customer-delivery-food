import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
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
import action from "../../../storage/action";
import {
  geoConvertAddressToLatLong,
  geoConvertLatLongToAddress,
} from "../../../utils/Geocode";
import Localization from "../../../config/Localization";
import apiService from "./apiService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const titleDialog = "Xác nhận đặt hàng";
const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

export default function DialogCheckout({ open, onClose, renderSignInPage }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { infoRestaurant, listOrder, note } = cart;
  const [feeShip, setFeeShip] = useState(15000);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const typingTimeoutRef = useRef(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // Token
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
    (async () => {
      try {
        const { success, data } = await service.getFeeShip(0, 0);

        if (success) {
          const { distance, fee } = data;
          setFeeShip(fee);
          setDistance(distance);
        }
      } catch (e) {
        console.log(`[GET_FEE_SHIP_FAILED]: ${e.message}`);
      }
    })();
  }, [cart]);

  const updateCurrentLocation = async (pos) => {
    const { latitude, longitude } = pos.coords;
    const address = await geoConvertLatLongToAddress(latitude, longitude);
    setLocation(address);
    setLat(latitude);
    setLng(longitude);
    handleGetShipFee();
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
    handleGetShipFee();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const { lat, lng } = await geoConvertAddressToLatLong(e.target.value);
      setLat(lat);
      setLng(lng);
      dispatch(action.addressDeliveryAction.updateCoordinate(lat, lng));
    }, 1000);
  };

  const handleOnOrder = () => {
    if (!token) renderSignInPage();
    if (!location) return;

    var dataOrder = {};
    dataOrder.foods = [];

    console.log("----------" + listOrder[0].id);
    // list food
    for (var i = 0; i < listOrder.length; i++) {
      dataOrder.foods[i] = {};
      dataOrder.foods[i].id = listOrder[i].id;
      dataOrder.foods[i].quantity = listOrder[i].quantity;
      dataOrder.foods[i].price = listOrder[i].OriginalPrice;
      dataOrder.foods[i].options = [];
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
        dataOrder.foods[i].options.push(option);
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
    dataOrder.method = 0;

    console.log("orderrrr: " + JSON.stringify(dataOrder));

    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.sendOrder(dataOrder);

        console.log("order data: " + JSON.stringify(data));
        console.log("errorCode: " + errorCode);
        if (errorCode === 0) {
        }
      } catch (e) {
        console.log(`[HANDLE_SEND_ORDER]: ${e.message}`);
      }
    })();
  };

  const handleGetShipFee = function () {
    (async () => {
      try {
        // request to server
        const { errorCode, data } = await apiService.getShipFee(
          cart.infoRestaurant.id,
          lng,
          lat
        );

        if (errorCode === 0) {
          setFeeShip(data);
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
          strOptions += listOrder[k].Options[i].Items[j].Name;
          if (
            i !== listOrder[k].Options.length - 1 ||
            j !== listOrder[k].Options[i].Items.length - 1
          )
            strOptions += ", ";
        }
      }
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

            <div className="dialog-checkout__order">
              <span>Chi tiết đơn hàng</span>
              <div className="dialog-checkout__order-container">
                {listOrder.map((order) => {
                  return (
                    <div className="dialog-checkout__order-item">
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
                      total += currOrder.quantity * currOrder.OriginalPrice;
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
                  total += currOrder.quantity * currOrder.OriginalPrice;
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
