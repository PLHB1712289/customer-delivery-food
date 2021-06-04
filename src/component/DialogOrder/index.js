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
import Map from "./Map";
import Rating from "./Rating";
import StrUtils from "../../utils/StrUtils";
import "./styles.css";
import action from "../../storage/action";
import socket from "../../socket";
import {
  geoConvertAddressToLatLong,
  geoConvertLatLongToAddress,
} from "../../utils/Geocode";
import Localization from "../../config/Localization";
import { useHistory } from "react-router-dom";
import ListItemFood from "./ListItemFood";
import TimeLineCancel from "./TimeLineCancel";
import TimeLine from "./Timeline";
import apiService from "./apiService";
import { ORDER_STATUS } from "../../socket/TAG_EVENT";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

export default function DialogOrder({ open, onClose, renderSignInPage }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [merchainInfo, setMerchainInfo] = useState(null);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState(null);
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
    // get restaurant info
    (async () => {
      try {
        const { errorCode, data } = await apiService.getMerchainInfo(
          order.dataOrder.Restaurant
        );

        if (errorCode === 0) {
          setMerchainInfo(data);
        }
      } catch (e) {}
    })();
  }, [order]);

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const dataProcess = getStep(order.status);

  const onCancelOrder = () => {
    if (socket) socket.cancelOrder(order.dataOrder.id);
    // console.log("on cancel");
    // dispatch(action.orderAction.updateStatus(ORDER_STATUS.CANCEL_BY_CUSTOMER));
  };

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
      <div className="dialog-order__container">
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
          className="dialog-order__title"
          id="alert-dialog-slide-title"
        >
          {Localization.text("txt_my_order")}
        </DialogTitle>
        <DialogContent className="dialog-order__body">
          <div className="dialog-order__item dialog-order__address-and-order">
            {/* div map */}
            <div className="dialog-order__item dialog-order__map">
              <Map
                lat={order.dataOrder ? order.dataOrder.Coor.latitude : 0}
                lng={order.dataOrder ? order.dataOrder.Coor.longitude : 0}
                tagMarker="Bạn"
                latShip={merchainInfo ? merchainInfo.Geolocation.latitude : 0}
                lngShip={merchainInfo ? merchainInfo.Geolocation.longitude : 0}
                tagShip="Tài xế"
              />
            </div>

            <div className="dialog-order__address">
              <div className="dialog-order__address-item">
                <div className="dialog-order__address-item-lable">Từ: </div>
                <div className="dialog-order__address-item-name-restaurant">
                  {merchainInfo ? merchainInfo.Name : ""}
                </div>
                <div className="dialog-order__address-item-address-restaurant">
                  {merchainInfo ? merchainInfo.FullAddress : ""}
                </div>
              </div>
              <div className="dialog-order__address-item">
                <div className="dialog-order__address-item-lable">Đến: </div>
                <div className="dialog-order__address-item-name-restaurant">
                  {location === null ? (
                    <span style={{ color: "red" }}>
                      {order.dataOrder ? order.dataOrder.Address : ""}
                    </span>
                  ) : (
                    location
                  )}
                </div>
                <div className="dialog-order__address-item-address-restaurant"></div>
              </div>
            </div>
          </div>
          
          <div className="dialog-order__item dialog-order__merchain-and-food">
            <div className="dialog-order__merchain-and-status">
              <img
                className="dialog-order__merchain-avatar"
                src={merchainInfo ? merchainInfo.Avatar : ""}
              ></img>
            </div>
            <div className="dialog-order__order-info">
              <div className="dialog-order__order-info-title">
                {merchainInfo ? merchainInfo.Name : ""}
              </div>
              <div className="dialog-order__order-info-sub">
                <div> {merchainInfo ? merchainInfo.FullAddress : ""}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Rating rate={4}></Rating>
                  <div style={{ marginLeft: "5px" }}>4.0 (+200)</div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid black",
                  marginTop: "10px",
                }}
              ></div>
              <div style={{ marginTop: "-4vh" }}>
                {dataProcess.isCancel ? (
                  <TimeLineCancel
                    message={dataProcess.message}
                  ></TimeLineCancel>
                ) : (
                  <TimeLine step={dataProcess.step}></TimeLine>
                )}
              </div>
            </div>
            <div className="dialog-order__order-price">
              <div>
                Tổng cộng:{" "}
                {order.dataOrder
                  ? StrUtils.formatMoneyString(order.dataOrder.Subtotal)
                  : 0}
                d ({order.dataOrder ? order.dataOrder.Foods.length : 0} phần) -
                tiền mặt
              </div>
              <div>
                Tiền ship:{" "}
                {order.dataOrder
                  ? StrUtils.formatMoneyString(order.dataOrder.ShippingFee)
                  : 0}
                d - {order.dataOrder ? order.dataOrder.Distance : 0}km
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  Tổng giá trị đơn hàng:{" "}
                  {order.dataOrder
                    ? StrUtils.formatMoneyString(order.dataOrder.Total)
                    : 0}
                </div>
                {dataProcess.canCancel ? (
                  <button
                    className="dialog-order_btn-cancel"
                    onClick={onCancelOrder}
                  >
                    Hủy đơn
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="dialog-order__list-item">
              <div className="dialog-order__chat-title">Danh sách món ăn</div>
              <div className="dialog-order__list-item-food">
                <ListItemFood foods={order.dataOrder.Foods}></ListItemFood>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

const getStep = function (status) {
  var step = -1;
  var isCancel = false;
  var canCancel = false;
  var message = "";

  switch (status) {
    case ORDER_STATUS.WAITING:
    case ORDER_STATUS.MERCHANT_CONFIRM:
      step = 0;
      canCancel = true;
      break;
    case ORDER_STATUS.DURING_GET:
      step = 1;
      break;
    case ORDER_STATUS.DURING_SHIP:
      step = 2;
      break;
    case ORDER_STATUS.DELIVERED:
      step = 3;
      break;
    case ORDER_STATUS.CANCEL_BY_CUSTOMER:
      isCancel = true;
      message = Localization.text("txt_order_cancel_by_customer");
      break;
    case ORDER_STATUS.CANCEL_BY_MERCHANT:
      isCancel = true;
      message = Localization.text("txt_order_cancel_by_merchain");
      break;
    case ORDER_STATUS.CANCEL_BY_SHIPPER:
      isCancel = true;
      message = Localization.text("txt_order_cancel_by_shipper");
      break;
    default:
      step = 0;
      break;
  }

  return {
    step: step,
    isCancel: isCancel,
    canCancel: canCancel,
    message: message,
  };
};
