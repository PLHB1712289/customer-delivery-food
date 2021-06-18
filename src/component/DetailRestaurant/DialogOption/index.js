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
  IconButton,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StrUtils from "../../../utils/StrUtils";
import "./styles.css";
import action from "../../../storage/action";
import Localization from "../../../config/Localization";
import { useHistory } from "react-router-dom";

export default function DialogOption({
  open,
  onClose,
  renderSignInPage,
  data,
  addToCart
}) {
  var classes = useStyles();
  var history = useHistory();
  var dispatch = useDispatch();
  var food = data;
  if (data === null) {
    food = fakeData;
  }

  const [currPrice, setCurrPrice] = useState(food.OriginalPrice);
  const [quantity, setQuantity] = useState(1);
  const [listOption, setListOption] = useState([]);

  useEffect(() => {
    var list = [];
    for (var i = 0; i < food.Options.length; i++) {
      var option = food.Options[i];
      list[i] = { items: [], isMandatory: option.IsMandatory };
      for (var j = 0; j < option.Items.length; j++) {
        var item = option.Items[j];
        list[i].items.push(item.IsDefault);
      }
    }

    setListOption(list);
    // calc price
    setCurrPrice(calcPrice(list));
  }, [open]);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const changeQuantity = (amount) => {
    if (amount < 0) return;
    setQuantity(amount);
    // calc price
    setCurrPrice(calcPrice(null, amount));
  };

  const changeOption = (indexOption, indexItem) => {
    if (!listOption[indexOption]) return;
    if (listOption[indexOption].items[indexItem] === undefined) return;
    var list = listOption.slice();
    var checked = listOption[indexOption].items[indexItem];

    if (!list[indexOption].isMandatory) {
      list[indexOption].items[indexItem] = !checked;
    } else {
      for (var i = 0; i < listOption[indexOption].items.length; i++) {
        listOption[indexOption].items[i] = false;
      }
      list[indexOption].items[indexItem] = true;
    }

    setListOption(list);

    // calc price
    const price = calcPrice(list);
    setCurrPrice(price);
  };

  const calcPrice = (list, amount) => {
    list = list || listOption;
    amount = amount || quantity;
    var price = food.OriginalPrice;
    for (var i = 0; i < food.Options.length; i++) {
      var option = food.Options[i].Items;
      for (var j = 0; j < option.length; j++) {
        var item = option[j];
        if (
          list[i] !== undefined &&
          list[i].items[j] !== undefined &&
          list[i].items[j] === true
        ) {
          price += item.OriginalPrice;
        }
      }
    }

    return price * amount;
  };

  const onOKBtnClicked = () => {
    // if quantity <= 0: khong lam gi

    // repair data
    var foodData = { ...food };
    for (var i = 0; i < foodData.Options.length; i++) {
      for (var j = 0; j < foodData.Options[i].Items.length; j++) {
        if (
          listOption[i] !== undefined &&
          listOption[i].items[j] !== undefined 
        ) {
          foodData.Options[i].Items[j].IsDefault = listOption[i].items[j];
        }
      }
    }

    // sendData
    if (quantity > 0) addToCart(null, foodData, quantity);

    // close dialog
    onClose();
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
        <DialogTitle id="scroll-dialog-title" className={classes.dialog_title}>
          <div className="dialog-option__food">
            <div className="dialog-option_food__thumbnail">
              <img src={food.Avatar} alt="" />
            </div>
            <div className="dialog-option__food-info">
              <div className="dialog-option__food-info__name">{food.Name}</div>
              <div className="dialog-option__food-info__price">
                {"Giá: " + StrUtils.formatMoneyString(food.OriginalPrice) + "đ"}
              </div>
            </div>
          </div>
          <div className="dialog-option__divider"></div>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
          >
            <Grid container>
              {food.Options.map(function (option, indexOption) {
                return (
                  <Grid
                    item
                    container
                    md={12}
                    key={indexOption.toString() + option.id.toString()}
                  >
                    <Grid item md={12}>
                      <div className="dialog-option__action__form-group_option">
                        <div className="dialog-option__action__form-group_option-name">
                          {option.Name.toUpperCase()}
                        </div>
                        <div className="dialog-option__action__form-group_option-mandatory">
                          &nbsp;
                          {option.IsMandatory ? " (BẮT BUỘC)" : " (TÙY CHỌN)"}
                        </div>
                      </div>
                    </Grid>
                    <Grid item container md={12}>
                      <FormGroup
                        row
                        className="dialog-option__action__form-group"
                      >
                        {option.Items.map(function (item, indexItem) {
                          return (
                            <Grid item md={6} key={indexItem}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      listOption[indexOption]
                                        ? listOption[indexOption].items[
                                            indexItem
                                          ]
                                        : false
                                    }
                                    onChange={() =>
                                      changeOption(indexOption, indexItem)
                                    }
                                    name={indexItem.toString()}
                                    checkedIcon={
                                      <span
                                        className={clsx(
                                          classes.icon,
                                          classes.checkedIcon
                                        )}
                                      />
                                    }
                                    icon={<span className={classes.icon} />}
                                  />
                                }
                                label={item.Name}
                                style={{ color: "black" }}
                              />
                              <span className="dialog-option__action__form-group_item-price">
                                {item.OriginalPrice !== 0
                                  ? StrUtils.formatMoneyString(
                                      item.OriginalPrice
                                    ) + "đ"
                                  : ""}
                              </span>
                            </Grid>
                          );
                        })}
                      </FormGroup>
                    </Grid>
                    <Grid item md={12}>
                      <div className="dialog-option__divider"></div>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="dialog-option__action">
          <div className="dialog-option__action__group-quantity">
            <button
              className="dialog-option__action__btn-sub"
              onClick={() => changeQuantity(quantity - 1)}
            >
              -
            </button>
            <div className="dialog-option__action__quantity">{quantity}</div>
            <button
              className="dialog-option__action__btn-add"
              onClick={() => changeQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <button className="dialog-option__action__btn-ok" onClick={onOKBtnClicked}>
              Ok + {StrUtils.formatMoneyString(currPrice) + "đ"}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const fakeData = {
  TotalOrder: 0,
  Order: 0,
  Name: "Trà xanh việt quất",
  Avatar:
    "https://images.foody.vn/res/g11/100592/s570x570/a30f8da5-96f3-4dec-a4ba-dbaa65813410.jpeg",
  OriginalPrice: 40000,
  Options: [
    {
      IsMandatory: true,
      MaxSelect: 1,
      id: 6446,
      Name: "Chọn size",
      Items: [
        {
          IsDefault: true,
          MaxQuantity: 1,
          OriginalPrice: 5000,
          Name: "Lớn",
          id: 32228,
        },
      ],
    },
    {
      IsMandatory: true,
      MaxSelect: 1,
      id: 6458,
      Name: "Chọn mức đá",
      Items: [
        {
          IsDefault: true,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "Bình thường",
          id: 32331,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "Nhiều đá",
          id: 32327,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "Ít  đá",
          id: 32334,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "Không đá",
          id: 32324,
        },
      ],
    },
    {
      IsMandatory: true,
      MaxSelect: 1,
      id: 6459,
      Name: "Chọn mức đường",
      Items: [
        {
          IsDefault: true,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "100% đường",
          id: 32350,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "70 %  đường",
          id: 32349,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "50%  đường",
          id: 32351,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "30%  đường",
          id: 32345,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "Không đường",
          id: 32341,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 0,
          Name: "120%   đường",
          id: 367357,
        },
      ],
    },
    {
      IsMandatory: false,
      MaxSelect: 10,
      id: 6452,
      Name: "Chọn topping",
      Items: [
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Flan trứng",
          id: 32296,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Trân châu lớn",
          id: 32297,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 10000,
          Name: "Trân châu trắng (Ngọc Trai)",
          id: 32301,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Hạt trái cây",
          id: 186404,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 10000,
          Name: "Thạch Gấu",
          id: 893561,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Rong biển  dừa",
          id: 948314,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 12000,
          Name: "Flan phô mai",
          id: 1040567,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Nha đam",
          id: 1040575,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 20000,
          Name: "Sủi bọt phô mai",
          id: 1040578,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Sương sáo",
          id: 32269,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Hạt đường phèn",
          id: 32284,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Hạt nguyên vị",
          id: 32287,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Hạt trà xanh",
          id: 32291,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Hạt cà phê",
          id: 32292,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Thạch dừa",
          id: 32293,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 10000,
          Name: "Hạt ngọc trai",
          id: 32294,
        },
        {
          IsDefault: false,
          MaxQuantity: 1,
          OriginalPrice: 8000,
          Name: "Trân châu nhỏ",
          id: 32298,
        },
      ],
    },
  ],
  id: "60a797c8b7245f28182cf84d",
};

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: "100px",
    maxWidth: "50%",
    minWidth: "50%",
    maxHeight: "60%",
    minHeight: "60%",
  },
  dialog_title: {
    color: "red",
  },
  divider: {
    borderBottom: "1px solid #ebebeb",
    marginTop: 10,
  },
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
