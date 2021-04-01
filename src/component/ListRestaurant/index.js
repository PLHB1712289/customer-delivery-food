import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import action from "../../storage/action";
import apiService from "./apiService";
import Localization from "../../config/Localization";
import AppConfig from "../../config/AppConfig";

import ArrayUtils from "../../utils/ArrayUtils";
import DataUtils from "../../utils/DataUtils";

import CardRestaurant from "./CardRestaurant";
import Pagination from "../Common/Pagination";

import "./styles.css";

const Footer = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();

  const data = [{"Location":{"type":"Point","coordinates":[106.799117,10.875547]},"Type":0,"Status":0,"ParkingFree":0,"_id":"6040cbdac0c37e0cc405a85e","Name":"Lẩu bò Việt Nam","ContractID":"20210101T2","OpenAt":"1899-12-31T00:47:56.000Z","CloseAt":"1899-12-31T14:37:56.000Z","Description":"Quán lẩu bò lớn nhất Đông Nam Á","Avatar":"https://source.unsplash.com/random/800x600","Anouncement":"Miễn phí tất cả các suất ăn vào ngày 31/2/2021","Address":"Làng đại học quốc gia TPHCM","CreatedAt":"2021-03-04T12:00:26.179Z","UpdatedAt":"2021-03-04T12:00:26.179Z","__v":0},{"Location":{"type":"Point","coordinates":[106.78785864259649,10.867934698321426]},"Type":0,"Status":0,"ParkingFree":0,"_id":"6040cc5673b0831cc8014a49","Name":"Hải sản Việt Nam","ContractID":"20210101T5","OpenAt":"1899-12-31T08:47:56.000Z","CloseAt":"1899-12-31T15:17:56.000Z","Description":"Quán hải sản lớn nhất Thế giới","Avatar":"https://source.unsplash.com/random/800x600","Anouncement":"Miễn phí tất cả các suất ăn vào ngày 31/2/2021","Address":"Chợ đêm ĐH Nông Lâm TPHCM","CreatedAt":"2021-03-04T12:02:30.227Z","UpdatedAt":"2021-03-04T12:02:30.227Z","__v":0}];
  
  const listRestaurant = DataUtils.mapDataListRestaurant(data);
  // useEffect(() => {
  //   //turnOnLoading();

  //   (async () => {
  //     try {
  //       const {
  //         success,
  //         message,
  //         data,
  //       } = await apiService.getListRestaurant();

  //       console.log("dataaa: " + success)
  //       if (success) {
  //           console.log("data: " + JSON.stringify(data))
  //       }
  //     } catch (e) {
  //       // alert("Cannot connect to server");
  //       // console.log("[ERROR]:", e);
  //     }

  //     // turnOffLoading();
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Grid container className="global">
        <Grid container item md={12}>
            <div className="panel">
              <h1 className="title">Danh sách quán ăn</h1>
              <hr className="break-line"></hr>
              <Grid container item md={12}>
                <Grid item md={1}></Grid>
                <Grid item md={10}>
                  <Grid
                    container
                    item
                    md={12}
                    className="list-card"
                    spacing={1}
                  >
                    {listRestaurant}
                  </Grid>
                </Grid>
         
              </Grid>
              <Grid item md={12}>
                <div className="pagination">
                  <Pagination
                    itemPerPage={10}
                    pageRangeDisplay={10}
                    totalItemsCount={67}
                  />
                </div>
              </Grid>
            </div>
        

          <Grid item md={1}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
