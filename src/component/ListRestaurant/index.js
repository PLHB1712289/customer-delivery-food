import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import action from "../../storage/action";
import apiService from "./apiService";
import Localization from "../../config/Localization";

// utils
import DataUtils from "../../utils/DataUtils";

// config
import RestaurantConfig from "../../config/RestaurantConfig";

// children component
import Pagination from "../Common/Pagination";
import FilterDropdown from "./FilerDropdown";
import FilterArea from "./FilterArea";
import FilterType from "./FilterType";

import "./styles.css";

const ListRestaurant = () => {
  // React router hook
  const history = useHistory();
  // use dispatch
  const dispatch = useDispatch();
  // use state
  const [countItem, setCountItem] = useState(67);
  const [pageIndex, setPageIndex] = useState(1);
  const [filterArea, setFilterArea] = useState(DataUtils.mapStateFitlerArea());
  const [filterType, setFilterType] = useState(DataUtils.mapStateFitlerType());

  const data = [
    {
      Location: { type: "Point", coordinates: [106.799117, 10.875547] },
      Type: 0,
      Status: 0,
      ParkingFree: 0,
      _id: "6040cbdac0c37e0cc405a85e",
      Name: "Lẩu bò Việt Nam",
      ContractID: "20210101T2",
      OpenAt: "1899-12-31T00:47:56.000Z",
      CloseAt: "1899-12-31T14:37:56.000Z",
      Description: "Quán lẩu bò lớn nhất Đông Nam Á",
      Avatar: "https://source.unsplash.com/random/800x600",
      Anouncement: "Miễn phí tất cả các suất ăn vào ngày 31/2/2021",
      Address: "Làng đại học quốc gia TPHCM",
      CreatedAt: "2021-03-04T12:00:26.179Z",
      UpdatedAt: "2021-03-04T12:00:26.179Z",
      __v: 0,
    },
    {
      Location: {
        type: "Point",
        coordinates: [106.78785864259649, 10.867934698321426],
      },
      Type: 0,
      Status: 0,
      ParkingFree: 0,
      _id: "6040cc5673b0831cc8014a49",
      Name: "Hải sản Việt Nam",
      ContractID: "20210101T5",
      OpenAt: "1899-12-31T08:47:56.000Z",
      CloseAt: "1899-12-31T15:17:56.000Z",
      Description: "Quán hải sản lớn nhất Thế giới",
      Avatar: "https://source.unsplash.com/random/800x600",
      Anouncement: "Miễn phí tất cả các suất ăn vào ngày 31/2/2021",
      Address: "Chợ đêm ĐH Nông Lâm TPHCM",
      CreatedAt: "2021-03-04T12:02:30.227Z",
      UpdatedAt: "2021-03-04T12:02:30.227Z",
      __v: 0,
    },
  ];

  const listRestaurant = DataUtils.mapDataListRestaurant(data);

  // handle change page
  const onChangePage = (index) => {
    if (pageIndex !== index) {
      setPageIndex(index);
    }
  };

  // handle previous page
  const onPreviousPage = () => {
    const index = pageIndex - 1;
    if (index > 0) {
      setPageIndex(index);
    }
  };

  // handle next page
  const onNextPage = () => {
    const index = pageIndex + 1;
    if (index <= Math.ceil(countItem / RestaurantConfig.COUNT_PER_PAGE)) {
      setPageIndex(index);
    }
  };

  // handle filter area
  const handleSelectArea = (event) => {
    setFilterArea({ ...filterArea, [event.target.name]: event.target.checked });
  };

  // handle filter type
  const handleSelectType = (event) => {
    setFilterType({ ...filterType, [event.target.name]: event.target.checked });
  };

  const handleFilter = () => {
    const chooseArea = [];
    const chooseType = [];

    for (var key in filterArea) {
      if (filterArea[key] === true) {
        chooseArea.push(key);
      }
    }

    for (var key in filterType) {
      if (filterType[key] === true) {
        chooseType.push(key);
      }
    }
  };

  useEffect(() => {
    dispatch(action.loadingAction.turnOn());

    (async () => {
      try {
        const { success, message, data } = await apiService.getListRestaurant();

        if (success) {
          console.log("data: " + JSON.stringify(data));
        }
      } catch (e) {
         alert("Cannot connect to server");
         console.log("[ERROR]:", e);
      }

      dispatch(action.loadingAction.turnOff());
    })();
  }, []);

  return (
    <>
      <Grid container className="global">
        <Grid container item md={12}>
          <div className="panel">
            <Grid item md={12}>
              <h1 className="title">
                {Localization.text("label_restaurants")}
              </h1>
            </Grid>

            <Grid container item md={12}>
              <Grid item md={1}>
                {" "}
              </Grid>

              <Grid item md={1}>
                <div className="filter-area">
                  <FilterArea
                    buttonText={Localization.text("txt_area")}
                    state={filterArea}
                    handleSelect={handleSelectArea}
                    handleFilter={handleFilter}
                  />
                </div>
              </Grid>

              <Grid item md={1}>
                <div className="filter-area">
                  <FilterType
                    buttonText={Localization.text("txt_categories")}
                    state={filterType}
                    handleSelect={handleSelectType}
                    handleFilter={handleFilter}
                  />
                </div>
              </Grid>

              <Grid item md={8}>
                <div className="filter-dropdown">
                  <FilterDropdown />
                </div>
              </Grid>

              <Grid item md={1}>
                {" "}
              </Grid>
            </Grid>

            <Grid container item md={12}>
              <Grid item md={12}>
                <hr className="break-line"></hr>
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={10}>
                <Grid container item md={12} className="list-card">
                  {listRestaurant}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <div className="pagination">
                <Pagination
                  activePage={pageIndex}
                  itemPerPage={RestaurantConfig.COUNT_PER_PAGE}
                  pageRangeDisplay={RestaurantConfig.DISPLAY_RANGE_PAGE}
                  totalItemsCount={countItem}
                  onChangePage={onChangePage}
                  onPreviousPage={onPreviousPage}
                  onNextPage={onNextPage}
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

export default ListRestaurant;
