import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Map from "../../HomePage/DialogChangeAddress/Map";
import StrUtils from "../../../utils/StrUtils";
import "./styles.css";
import service from "./service";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const titleDialog = "Xác nhận đặt hàng";
const tileAlertLocation = "Vui lòng cấp quyền truy cập vị trí cho flashfood";

export default function DialogCheckout({ open, onClose }) {
  const cart = useSelector((state) => state.cart);
  const { infoRestaurant, listOrder, note } = cart;
  const [feeShip, setFeeShip] = useState(15000);
  const [distance, setDistance] = useState(0);

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
                  {infoRestaurant.name}
                </div>
                <div className="dialog-checkout__address-item-address-restaurant">
                  {infoRestaurant.restaurant}
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
                {listOrder.map((order) => {
                  return (
                    <div className="dialog-checkout__order-item">
                      <div className="dialog-checkout__order-item-quantity">
                        {order.quantity}
                      </div>
                      <div className="dialog-checkout__order-item-name-food">
                        {order.name}
                      </div>
                      <div className="dialog-checkout__order-item-price">
                        {StrUtils.formatMoneyString(
                          order.price * order.quantity
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
                      total += currOrder.quantity * currOrder.price;
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
                  {StrUtils.formatMoneyString(feeShip)}đ
                </div>
              </div>
            </div>
          </div>

          <div className="dialog-checkout__item dialog-checkout__map">
            <Map />
          </div>

          <div className="dialog-checkout__item dialog-checkout__total">
            <div className="dialog-checkout__total_title">Tổng cộng</div>
            <div className="dialog-checkout__total_price">
              {StrUtils.formatMoneyString(
                listOrder.reduce((total, currOrder) => {
                  total += currOrder.quantity * currOrder.price;
                  return total;
                }, 0) + feeShip
              )}
              đ
            </div>
          </div>

          <button className="dialog-checkout__item dialog-checkout__btn-checkout">
            Đặt hàng
          </button>
        </DialogContent>
      </div>
    </Dialog>
  );
}
