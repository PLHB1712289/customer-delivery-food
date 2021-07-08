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
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StrUtils from "../../../utils/StrUtils";
import "./styles.css";
import apiService from "./apiService";
import Localization from "../../../config/Localization";
import { useHistory } from "react-router-dom";
import Rating from "../InformationRestaurant/Rating";
import CardReview from "./ReviewCard";

export default function DialogOption({ open, onClose, dataRestaurant, rating, totalReviews }) {
  var classes = useStyles();
  var history = useHistory();
  var dispatch = useDispatch();

  const [listReview, setListReview] = useState(fakeData);

    useEffect(() => {
      (async () => {
          try {
            // request to server
            const { errorCode, data } = await apiService.getListReview(dataRestaurant.id);

            if (errorCode === 0) {
              setListReview(data);
            }
          } catch (e) {
            console.log(`[HANDLE_GET_REVIEWS]: ${e.message}`);
          }
        })();
    }, []);


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
          <div className="dialog-res__review">
            <div className="dialog-res__review__thumbnail">
              <img src={dataRestaurant.Avatar} alt="" />
            </div>
            <div className="dialog-res__review-info">
              <div className="dialog-res__review-info__name">
                {dataRestaurant.Name}
              </div>
              <div className="dialog-res__review-info__address">
                {dataRestaurant.FullAddress}
              </div>
              <div style={{ display: "flex", marginLeft: "-3px" }}>
                <Rating rate={dataRestaurant.rating}></Rating>
                <span className="dialog-res__review-info__count-review">
                  {dataRestaurant.totalReviews + 4}+ lượt dánh giá
                </span>
              </div>
            </div>
          </div>
          <div className="dialog-review__divider"></div>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="scroll-dialog-description">
            <Grid container>
              {listReview.map(function (review, index) {
                return (
                  <Grid item container md={12} key={index}>
                    <Grid item md={12}>
                      <CardReview data={review}></CardReview>
                    </Grid>
                    <Grid item md={12}>
                      <div className="dialog-review__divider"></div>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="dialog-review__action">
            <button className="dialog-review__btn-close" onClick={onClose}>ĐÓNG</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const fakeData =[
    {
        "Images": [],
        "Status": 0,
        "User": {
            "_id": "60b7a2fc53834634c61332b3",
            "FullName": "He Royal",
            "Avatar": "https://lh3.googleusercontent.com/a-/AOh14GiAic6I9NmWaer-29NR2a-hBnaaXWqvck3HYdY=s96-c"
        },
        "Restaurant": "60a771e2b7245f28182cf82f",
        "Order": "60d5f578cff5b35f11657798",
        "Content": "Quan an khong duoc ngon cho lam!",
        "Point": 3,
        "CreatedAt": "2021-06-25T15:26:27.762Z",
        "UpdatedAt": "2021-06-25T15:26:27.762Z",
        "id": "60d5f5a3cff5b35f1165779a"
    },
    {
        "Images": [],
        "Status": 0,
        "User": {
            "_id": "60b7a2fc53834634c61332b3",
            "FullName": "He Royal",
            "Avatar": "https://lh3.googleusercontent.com/a-/AOh14GiAic6I9NmWaer-29NR2a-hBnaaXWqvck3HYdY=s96-c"
        },
        "Restaurant": "60a771e2b7245f28182cf82f",
        "Order": "60d5f578cff5b35f11657798",
        "Content": "Quan an tam tam thoi nha!",
        "Point": 4,
        "CreatedAt": "2021-06-25T15:26:27.762Z",
        "UpdatedAt": "2021-06-25T15:26:27.762Z",
        "id": "60d5f5a3cff5b3888965779a"
    },
    {
        "Images": [],
        "Status": 0,
        "User": {
            "_id": "60b7a2fc53834634c61332b3",
            "FullName": "He Royal",
            "Avatar": "https://lh3.googleusercontent.com/a-/AOh14GiAic6I9NmWaer-29NR2a-hBnaaXWqvck3HYdY=s96-c"
        },
        "Restaurant": "60a771e2b7245f28182cf82f",
        "Order": "60d5f578cff5b35f11657798",
        "Content": "Mon qua xa do luon :(",
        "Point": 2,
        "CreatedAt": "2021-06-25T15:26:27.762Z",
        "UpdatedAt": "2021-06-25T15:26:27.762Z",
        "id": "60d5f5a3cabc13898965779a"
    },
    {
        "Images": [],
        "Status": 0,
        "User": {
            "_id": "60b7a2fc53834634c61332b3",
            "FullName": "He Royal",
            "Avatar": "https://lh3.googleusercontent.com/a-/AOh14GiAic6I9NmWaer-29NR2a-hBnaaXWqvck3HYdY=s96-c"
        },
        "Restaurant": "60a771e2b7245f28182cf82f",
        "Order": "60d5f4734ace2e5a7d41308a",
        "Content": "Quan ngon, tuyet voi",
        "Point": 3,
        "CreatedAt": "2021-06-25T15:22:08.874Z",
        "UpdatedAt": "2021-06-25T15:22:08.874Z",
        "id": "60d5f4a04ace2e5a7d41308c"
    }
];

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: "100px",
    maxWidth: "40%",
    minWidth: "40%",
    maxHeight: "65%",
    minHeight: "65%",
  },
  dialog_title: {
    color: "red",
  },
  divider: {
    borderBottom: "1px solid #ebebeb",
    marginTop: 10,
  },
});
