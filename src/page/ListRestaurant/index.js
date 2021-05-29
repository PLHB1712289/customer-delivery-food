import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";

import action from "../../storage/action";
import apiService from "./apiService";
import service from "./service";
import Localization from "../../config/Localization";

// utils
import DataUtils from "../../utils/DataUtils";
import ImageUtils from "../../utils/ImageUtils";

// config
import RestaurantConfig from "../../config/RestaurantConfig";

// children component
import Pagination from "../../component/Common/Pagination";
import FilterDropdown from "../../component/ListRestaurant/FilerDropdown";
import FilterArea from "../../component/ListRestaurant/FilterArea";
import FilterType from "../../component/ListRestaurant/FilterType";

import "./styles.css";
import ArrayUtils from "../../utils/ArrayUtils";
import CatConfig from "../../config/CategoryConfig";

const ListRestaurant = () => {
  // React router hook
  const history = useHistory();
  const location = useLocation();
  // use dispatch
  const dispatch = useDispatch();
  // use Selector
  const keyword = useSelector((state) => state.search);
  const city = useSelector((state) => state.city);
  // location
  let keyType = -1;
  if (location.state) {
    const passValue = location.state.keyType ? location.state.keyType : 0;
    keyType = passValue - 1;
  }
  // use state
  const [listRes, setListRes] = useState([]);
  const [countItem, setCountItem] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [sortType, setSortType] = useState(0);
  const [cacheFilter, setCacheFilter] = useState([]);
  const [filterArea, setFilterArea] = useState(
    DataUtils.mapStateFitlerArea(city)
  );
  const [filterType, setFilterType] = useState(
    DataUtils.mapStateFitlerType(parseInt(keyType))
  );
  const [reload, setReload] = useState(false);

  if (location.state) {
    // if (location.state.keyword) {
    //   dispatch(action.searchAction.update(location.state.keyword));
    // }
    // if (location.search) {
    //   dispatch(action.searchAction.update(location.search));
    // }
  }

  useEffect(() => {
    // reset
    // handleResetType();
    // handleResetArea();

    dispatch(action.loadingAction.turnOn());
    const list_area = DataUtils.getFilterAreaRestaurant(filterArea, city);
    const list_type = DataUtils.getFilterTypeRestaurant(filterType);

    (async () => {
      try {
        const { errorCode, data, pagingInfo } =
          await apiService.getRestaurant(
            pageIndex,
            RestaurantConfig.CITY[city].id,
            list_area,
            list_type,
            sortType,
            keyword
          );

        dispatch(action.loadingAction.turnOff());
        if (errorCode === 0) {
          console.log("totalll: " + pagingInfo.total);
          setListRes(data);
          setCountItem(pagingInfo.total);
        } else {
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_VOUCHER]: ${e.message}`);
      }
    })();
  }, [sortType, city, reload, keyword]);

  const listRestaurant = DataUtils.mapDataListRestaurant(listRes);

  // handle change page
  const onChangePage = (index) => {
    if (pageIndex === index) {
      return;
    }

    const list_area = DataUtils.getFilterAreaRestaurant(filterArea, city);
    const list_type = DataUtils.getFilterTypeRestaurant(filterType);

    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        const { errorCode, data, pagingInfo } =
          await apiService.getRestaurant(
            index,
            RestaurantConfig.CITY[city].id,
            list_area,
            list_type,
            sortType
          );

        dispatch(action.loadingAction.turnOff());
        if (errorCode === 0) {
          setListRes(data);
          setCountItem(pagingInfo.total);
          setPageIndex(index);
          window.scrollTo(0, 0);
        } 
      } catch (e) {
        alert("KKKKhông thể kết nối với server.");
        console.error(`[LIST_RESTAURANT]: ${e.message}`);
      }
    })();
  };

  // handle previous page
  const onPreviousPage = () => {
    const index = pageIndex - 1;
    if (index > 0) {
      onChangePage(index);
    }
  };

  // handle next page
  const onNextPage = () => {
    const index = pageIndex + 1;
    if (index <= Math.ceil(countItem / RestaurantConfig.COUNT_PER_PAGE)) {
      onChangePage(index);
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

  // handle filter common
  const handleFilter = () => {
    if (cacheFilter.length !== 0) {
      const cacheArea = cacheFilter[0];
      const cacheType = cacheFilter[1];

      if (
        ArrayUtils.compareTwoJSON(filterArea, cacheArea) &&
        ArrayUtils.compareTwoJSON(filterType, cacheType)
      ) {
        return;
      }
    }

    const list_area = DataUtils.getFilterAreaRestaurant(filterArea, city);
    const list_type = DataUtils.getFilterTypeRestaurant(filterType);
    console.log("----area: " + list_area);
    dispatch(action.loadingAction.turnOn());
    (async () => {
      try {
        const { errorCode, data, pagingInfo } =
          await apiService.getRestaurant(
            1,
            RestaurantConfig.CITY[city].id,
            list_area,
            list_type,
            sortType
          );

        dispatch(action.loadingAction.turnOff());
        if (errorCode === 0) {
          setListRes(data);
          setCountItem(pagingInfo.total);
          setPageIndex(1);
          setCacheFilter([filterArea, filterType]);
          window.scrollTo(0, 0);
        }
      } catch (e) {
        alert("KKKKhông thể kết nối với server.");
        console.error(`[LIST_RESTAURANT]: ${e.message}`);
      }
    })();
  };

  // handle reset area
  const handleResetArea = (isReload) => {
    for (var key in filterArea) {
      filterArea[key] = false;
    }

    if (isReload) setReload(!reload);
  };

  // handle reset type
  const handleResetType = (isReload) => {
    for (var key in filterType) {
      filterType[key] = false;
    }

    if (isReload) setReload(!reload);
  };

  // handle reset keyword
  const handleResetKeyword = (isReload) => {
    dispatch(action.searchAction.update(""));

    if (isReload) setReload(!reload);
  };

  // handle select sort
  const handleSelectSort = (type) => {
    setSortType(type);
  };

  let globalClass = "listRes_global ";
  if (listRes.length !== 0) {
    globalClass += "listRes_haveResult";
  }

  const count_area = DataUtils.getFilterAreaRestaurant(filterArea, city).length;
  const count_type = DataUtils.getFilterTypeRestaurant(filterType).length;

  return (
    <>
      <Grid container className={globalClass}>
        <Grid container item md={12}>
          <div className="listRes_panel">
            <Grid item md={12}>
              <h1 className="listRes_title">
                {Localization.text("label_restaurants")}
              </h1>
            </Grid>

            <Grid container item md={12}>
              <Grid item md={1}></Grid>

              <Grid item md={1}>
                <div className="listRes_filter-area">
                  <FilterArea
                    buttonText={Localization.text("txt_area")}
                    state={filterArea}
                    handleSelect={handleSelectArea}
                    handleFilter={handleFilter}
                  />
                </div>
              </Grid>

              <Grid item md={1}>
                <div className="listRes_filter-area">
                  <FilterType
                    buttonText={Localization.text("txt_categories")}
                    state={filterType}
                    handleSelect={handleSelectType}
                    handleFilter={handleFilter}
                  />
                </div>
              </Grid>

              <Grid item md={8}>
                <div className="listRes_filter-dropdown">
                  <FilterDropdown handleSelect={handleSelectSort} />
                </div>
              </Grid>

              <Grid item md={1}>
                {" "}
              </Grid>
            </Grid>

            <Grid container item md={12}>
              <Grid item md={12}>
                <hr className="listRes_break-line"></hr>
              </Grid>

              <Grid item md={12} className="listRes_list-show-filter">
                {count_area > 0 ? (
                  <button className="listRes_list-btnShowFilter">
                    Khu vực:{" "}
                    <span style={{ fontWeight: "bold" }}>({count_area})</span>
                    <div
                      className="listRes_reddotClose"
                      onClick={() => handleResetArea(true)}
                    >
                      x
                    </div>
                  </button>
                ) : (
                  <></>
                )}

                {count_type > 0 ? (
                  <button className="listRes_list-btnShowFilter">
                    Phân loại:{" "}
                    <span style={{ fontWeight: "bold" }}>({count_type})</span>
                    <div
                      className="listRes_reddotClose"
                      onClick={() => handleResetType(true)}
                    >
                      x
                    </div>
                  </button>
                ) : (
                  <></>
                )}

                {keyword !== "" ? (
                  <button className="listRes_list-btnShowFilter">
                    Từ Khóa:{" "}
                    <span style={{ fontWeight: "bold" }}>({keyword})</span>
                    <div
                      className="listRes_reddotClose"
                      onClick={() => handleResetKeyword(true)}
                    >
                      x
                    </div>
                  </button>
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item md={1}></Grid>
              <Grid item md={10}>
                {listRes.length === 0 ? (
                  <div>
                    <img
                      src={ImageUtils.getResultNotFound()}
                      className="listRes_imgNotFound"
                    ></img>
                    <div className="listRes_txtNotFound">
                      {Localization.text("txt_no_result_found")}
                    </div>
                  </div>
                ) : (
                  <Grid container item md={12} className="listRes_list-card">
                    {listRestaurant}
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item md={12}>
              <div className="listRes_pagination">
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
        </Grid>
      </Grid>
    </>
  );
};

export default ListRestaurant;
