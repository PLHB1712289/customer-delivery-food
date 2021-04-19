import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import "./styles.css";
import Map from "../../HomePage/DialogChangeAddress/Map";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const titleDialog = "Xác nhận đặt hàng";
const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

export default function DialogCheckout({ open, onClose, listOrder }) {
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
                  Nâu Sài Gòn - Bánh hỏi, Bún thịt nướng {"&"} Bánh ướt
                </div>
                <div className="dialog-checkout__address-item-address-restaurant">
                  25/4 Bà Lê Chân, P. Tân Định, Quận 1, TP. HCM
                </div>
              </div>
              <div className="dialog-checkout__address-item">
                <div className="dialog-checkout__address-item-lable">Đến: </div>
                <div className="dialog-checkout__address-item-name-restaurant">
                  Nâu Sài Gòn - Bánh hỏi, Bún thịt nướng {"&"} Bánh ướt
                </div>
                <div className="dialog-checkout__address-item-address-restaurant">
                  25/4 Bà Lê Chân, P. Tân Định, Quận 1, TP. HCM
                </div>
              </div>

              <div className="dialog-checkout__address-change">
                <button>Thay đổi thông tin giao hàng</button>
              </div>
            </div>

            <div className="dialog-checkout__order">
              <span>Chi tiết đơn hàng</span>
              <div className="dialog-checkout__order-container">
                <div className="dialog-checkout__order-item">
                  <div className="dialog-checkout__order-item-quantity">1</div>
                  <div className="dialog-checkout__order-item-name-food">
                    Bún đậu mắm tốm đặc biệt
                  </div>
                  <div className="dialog-checkout__order-item-price">
                    65,000đ
                  </div>
                </div>

                <div className="dialog-checkout__order-item">
                  <div className="dialog-checkout__order-item-quantity">1</div>
                  <div className="dialog-checkout__order-item-name-food">
                    Bún đậu mắm tốm đặc biệt
                  </div>
                  <div className="dialog-checkout__order-item-price">
                    65,000đ
                  </div>
                </div>
              </div>
              <div className="dialog-checkout__order-note">
                <span>Ghi chú</span>
              </div>

              <div className="dialog-checkout__order-total">
                <div className="dialog-checkout__order-total-title">
                  Tổng cộng <span>3</span> phần
                </div>
                <div className="dialog-checkout__order-total-price">
                  207,000đ
                </div>
              </div>

              <div className="dialog-checkout__order-fee-ship">
                <div className="dialog-checkout__order-fee-ship-title">
                  Phí vận chuyển 4km
                </div>
                <div className="dialog-checkout__order-fee-ship-price">
                  207,000đ
                </div>
              </div>
            </div>
          </div>

          <div className="dialog-checkout__item dialog-checkout__map">
            <Map />
          </div>

          <div className="dialog-checkout__item dialog-checkout__total">
            <div className="dialog-checkout__total_title">Tổng cộng</div>
            <div className="dialog-checkout__total_price">209,000đ</div>
          </div>

          <button className="dialog-checkout__item dialog-checkout__btn-checkout">
            Đặt hàng
          </button>
        </DialogContent>
      </div>
    </Dialog>
  );
}
