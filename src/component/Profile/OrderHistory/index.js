import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";

// custom component
import Pagination from "./Pagination";

// serivce
import "./styles.css";
import action from "../../../storage/action";
import service from "./service";
// config
import OrderConfig from "../../../config/OrderConfig";
import Localization from "../../../config/Localization";
// utils
import DataUtils from "../../../utils/DataUtils";
import StrUtils from "../../../utils/StrUtils";

const SideBar = () => {
  // React router hook
  const history = useHistory();
  const location = useLocation();
  // use dispatch
  const dispatch = useDispatch();

  // use state
  const [statusOrder, setStatusOrder] = useState(0);
  const [fDay, setFDay] = useState(null);
  const [tDay, setTDay] = useState(null);
  const [page, setPage] = useState(1);
  const [listOrder, setListOrder] = useState([]);
  const [countItem, setCountItem] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(action.loadingAction.turnOn());

    (async () => {
      try {
        const { status, message, data } = await service.getListorder(
          page,
          statusOrder,
          fDay,
          tDay
        );

        dispatch(action.loadingAction.turnOff());
        if (status === 0) {
          setListOrder(data.listOrder);
          setCountItem(data.countItem);
        } else {
          alert(message);
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_ORDER_HISTORY]: ${e.message}`);
      }
    })();
  }, [page, reload]);

  // handle change filter
  const onChangeStatus = (e) => {
    const value = e.target.value;
    if (value !== statusOrder) {
      setStatusOrder(value);
    }
  };

  const onChangeFDay = (e) => {
    const value = e.target.value;
    setFDay(value);
    console.log(value);
  };

  const onChangeTDay = (e) => {
    const value = e.target.value;
    setTDay(value);
  };

  // handle change page
  const onChangePage = (index) => {
    if (index !== page) {
      setPage(index);
    }
  };

  // handle previous page
  const onPreviousPage = () => {
    const index = page - 1;
    if (index > 0) {
      onChangePage(index);
    }
  };

  // handle next page
  const onNextPage = () => {
    const index = page + 1;
    if (index <= Math.ceil(countItem / OrderConfig.ITEM_PER_PAGE)) {
      onChangePage(index);
    }
  };

  // handle search
  const onSearchOrder = (e) => {
    e.preventDefault();
    setReload(!reload);
  };

  const data = listOrder.map((value, key) => {
    return (
      <tr key={key}>
        <td style={{ width: "5%" }}>{9 * (page - 1) + key + 1}</td>
        <td style={{ width: "15%" }}>{value.id}</td>
        <td style={{ width: "15%" }}>{value.time}</td>
        <td style={{ width: "25%", textAlign: "left" }}>{value.address}</td>
        <td style={{ width: "15%" }}>
          {StrUtils.formatMoneyString(value.money) + " đ"}
        </td>
        <td style={{ width: "10%" }}>
          {Localization.text("txt_order_status_" + value.status)}
        </td>
        <td style={{ width: "15%" }}>
          {value.status === 1 ? (
            <button className="profile_orderHistory_buttonRed">
              {Localization.text("txt_reorder")}
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="profile_orderHistory_global">
      <Grid container>
        <Grid item md={12}>
          <div className="profile_orderHistory_title">
            {Localization.text("txt_order_history")}
          </div>
          <div className="profile_orderHistory_totalOrder">
            {Localization.text("txt_total") +
              ": " +
              countItem +
              " " +
              Localization.text("txt_order")}
          </div>
        </Grid>
        <Grid item md={12}>
          <hr className="profile_orderHistory_breakLine"></hr>
        </Grid>
        <Grid item md={12}>
          <form className="profile_orderHistory_form">
            <label for="status">{Localization.text("txt_status")}:</label>
            <select
              className="profile_orderHistory_input"
              id="status"
              onChange={onChangeStatus}
            >
              {DataUtils.mapOrderStatus()}
            </select>
            <label for="fday">{Localization.text("txt_from_day")}:</label>
            <input
              type="date"
              id="fday"
              className="profile_orderHistory_input"
              onChange={onChangeFDay}
            ></input>
            <label for="tday">{Localization.text("txt_to_day")}:</label>
            <input
              type="date"
              id="tday"
              className="profile_orderHistory_input"
              onChange={onChangeTDay}
            ></input>
            <button
              className="profile_orderHistory_button"
              onClick={onSearchOrder}
            >
              {Localization.text("text_search")}
            </button>
          </form>
        </Grid>
        <Grid item md={12}>
          <hr
            className="profile_orderHistory_breakLine"
            style={{ width: "90%", opacity: "0.7" }}
          ></hr>
        </Grid>
        <Grid item md={12}>
          <table className="profile_orderHistory_table">
            <tr>
              <th>{Localization.text("txt_stt")}</th>
              <th>{Localization.text("txt_order_code")}</th>
              <th>{Localization.text("txt_time")}</th>
              <th>{Localization.text("txt_area")}</th>
              <th>{Localization.text("txt_total_money")}</th>
              <th>{Localization.text("txt_status")}</th>
              <th></th>
            </tr>
            {data}
          </table>
        </Grid>
        <Grid item md={12}>
          <div className="profile_orderHistory_pagination">
            <Pagination
              totalItemsCount={countItem}
              pageRangeDisplay={OrderConfig.DISPLAY_RANGE_PAGE}
              itemPerPage={OrderConfig.ITEM_PER_PAGE}
              onChangePage={onChangePage}
              activePage={page}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
            ></Pagination>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideBar;
