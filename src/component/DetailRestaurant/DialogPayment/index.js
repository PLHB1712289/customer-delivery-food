import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import PaymentIcon from "@material-ui/icons/Payment";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Countdown from "react-countdown";
import ReactLoading from "react-loading";
// config
import Localization from "../../../config/Localization";
import StrUtils from "../../../utils/StrUtils";
import ImageUtils from "../../../utils/ImageUtils";
import { ORDER_STATUS } from "../../../socket/TAG_EVENT";
// style
import clsx from "clsx";
import "./styles.css";

export default function DialogPayment({ open, onClose, data }) {
  var classes = useStyles();
  var history = useHistory();
  var dispatch = useDispatch();

  let order = useSelector((state) => state.order);
  const orderInfo = data || fakeData;

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    if (order.status > ORDER_STATUS.WAITING_PAYMENT) {
      onClose();
    }
  }, [open, order]);

  const rendererTime = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div style={{ fontSize: "1.8rem", marginTop: "15px"}}>Đã hết hạn</div>;
    } else {
      // Render a countdown
      var _m = parseInt(minutes);
      var _s = parseInt(seconds);
      if (_m < 10) {
        _m = '0' + _m.toString();
      }
      if (_s < 10) {
        _s = '0' + _s.toString();
      }
      return (
        <div style={{ fontSize: "1.8rem", marginTop: "15px"}}>
          {_m}:{_s}
        </div>
      );
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="form-dialog-title"
        scroll="paper"
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogContent className="dialog-payment__content">
          <Grid container className="dialog-payment__container">
            <Grid container item md={4} className="dialog-payment__info">
              <Grid item md={12} className="dialog_payment__expire">
                <div style={{ fontSize: "1rem" }}>Đơn hàng hết hạn sau</div>
                <Countdown date={Date.now() + 900000} renderer={rendererTime} />
                {/* <div style={{ fontSize: "1.8rem", lineHeight: 1.7 }}>10:00</div> */}
              </Grid>
              <Grid item md={12}>
                <div className="dialog-payment__divider"></div>
              </Grid>

              <Grid item md={12} className="dialog_payment__company">
                <div style={{ fontSize: "0.9rem" }}>Nhà cung cấp</div>
                <div style={{ fontSize: "1.1rem", marginLeft: "15px" }}>
                  CÔNG TY CỔ PHẦN FLASH FOOD VIỆT NAM
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="dialog-payment__divider"></div>
              </Grid>

              <Grid container item md={12} className="dialog_payment__sub-info">
                <Grid item md={2}>
                  <LocalAtmIcon className="dialog_payment__sub-icon"></LocalAtmIcon>
                </Grid>
                <Grid item md={10}>
                  <div>Số tiền</div>
                  <div>{StrUtils.formatMoneyString(orderInfo.total)}đ</div>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <div className="dialog-payment__divider"></div>
              </Grid>

              <Grid container item md={12} className="dialog_payment__sub-info">
                <Grid item md={2}>
                  <PaymentIcon className="dialog_payment__sub-icon"></PaymentIcon>
                </Grid>
                <Grid item md={10}>
                  <div>Thông tin</div>
                  <div>Thanh toán đơn hàng</div>
                  <div>{orderInfo.zp_trans_token}</div>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <div className="dialog-payment__divider"></div>
              </Grid>

              <Grid container item md={12} className="dialog_payment__sub-info">
                <Grid item md={2}>
                  <ViewWeekIcon className="dialog_payment__sub-icon"></ViewWeekIcon>
                </Grid>
                <Grid item md={10}>
                  <div>Đơn hàng</div>
                  <div
                    style={{
                      wordWrap: "break-word",
                      width: "100%",
                      overflowWrap: "break-word",
                    }}
                  >
                    {orderInfo.app_trans_id}
                  </div>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <div className="dialog-payment__divider"></div>
              </Grid>

              <Grid
                container
                item
                md={12}
                className="dialog_payment__sub-info"
                onClick={onClose}
              >
                <Grid item md={2}></Grid>
                <Grid item md={2}>
                  <KeyboardBackspaceIcon className="dialog_payment__sub-icon"></KeyboardBackspaceIcon>
                </Grid>
                <Grid item md={7}>
                  <b>Quay lại</b>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item md={8} className="dialog-payment__QR">
              <Grid
                item
                md={12}
                className="dialog-payment__logo"
                style={{ height: "10vh" }}
              >
                <img
                  src={ImageUtils.getLogo()}
                  width="55rem"
                  height="55rem"
                  style={{ marginRight: "20px" }}
                ></img>
                <img
                  src={ImageUtils.getZaloPayLogo()}
                  width="55rem"
                  height="55rem"
                ></img>
                <div
                  className="dialog-payment__divider"
                  style={{ marginTop: "10px" }}
                ></div>
              </Grid>

              <Grid item md={12}>
                <div
                  style={{
                    color: "#cf2127",
                    textAlign: "center",
                    fontSize: "1.4rem",
                    marginBottom: "30px",
                  }}
                >
                  {" "}
                  Quét mã để thanh toán
                </div>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  {" "}
                  <QRCode size={200} value={orderInfo.order_url}></QRCode>
                </div>

                <div style={{ textAlign: "center", fontSize: "0.9rem" }}>
                  Sử dụng App <b>ZaloPay</b> hoặc<br></br> ứng dụng camera hỗ
                  trợ QR code để quét mã
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "0.9rem",
                    marginTop: "20px",
                  }}
                >
                  <div className={classes.loading}>
                    <ReactLoading
                      type="spinningBubbles"
                      color="#cf2127"
                      height={"5%"}
                      width={"5%"}
                    />
                  </div>
                  Đang chờ bạn quét...
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: "100px",
    maxWidth: "40%",
    minWidth: "40%",
    maxHeight: "70%",
    minHeight: "70%",
  },
  loading: {
    display: "-webkit-flex",
    display: "flex",
    WebkitFlex: "0 1 auto",
    flex: "0 1 auto",
    WebkitFlexDirection: "column",
    flexDirection: "column",
    WebkitFlexGrow: 1,
    flexGrow: 1,
    WebkitFlexShrink: 0,
    flexShrink: 0,
    WebkitFlexBasis: "25%",
    flexBasis: "25%",
    WebkitAlignItems: "center",
    WebkitJustifyContent: "center",
    justifyContent: "center",
  },
});

const fakeData = {
  total: 300000,
  zp_trans_token: "21001215554x34sdf2",
  app_trans_id: "210605_2254_465654",
  order_url:
    "https://ssdsad.dasdas.ads/openinapp?order=erwe44d3v41xc324v47eqw64ewqdsdzsx4cd54s54sd4fsdf4sdfsd4",
};
