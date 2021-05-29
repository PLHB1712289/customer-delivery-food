import React, { useEffect, useState } from "react";
import "./styles.css";
import DropdownButton from "../../Common/CustomDropdown";
import RestaurantItem from "./RestaurantItem";
import ReplayIcon from "@material-ui/icons/Replay";
import LoadingItem from "./Loading";
import service from "./service";
import apiService from "./apiService";
import Localization from "../../../config/Localization";
import { useSelector } from "react-redux";
import RestaurantConfig from "../../../config/RestaurantConfig";


const FilterRestaurant = () => {
  const city = useSelector((state) => state.city);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const listFilter = [
    {
      title: Localization.text("txt_nearby"),
      value: 1,
    },
    {
      title: Localization.text("txt_top_sales"),
      value: 2,
    },
    {
      title: Localization.text("txt_best_rated"),
      value: 3,
    },
    {
      title: Localization.text("txt_most_discount"),
      value: 4,
    },
  ];

  const [currentFilter, setCurrentFilter] = useState(listFilter[0].value);
  const [address, setAddress] = useState("");
  const [listRestaurants, setListRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fake
  // const handleLoadMoreRestaurant = () => {
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       const { success, message, data } = await service.getListRestaurant(
  //         currentFilter,
  //         address,
  //         listRestaurants.length
  //       );
  //       setIsLoading(false);

  //       if (success) {
  //         setListRestaurants((prev) => prev.concat(data.listRestaurants));
  //       } else {
  //         alert(message);
  //       }
  //     } catch (e) {
  //       setIsLoading(false);
  //       alert("Không thể kết nối với server.");
  //       console.log(`[FILTER_RESTAURANT]: ${e.message}`);
  //     }
  //   })();
  // };

  const handleLoadMoreRestaurant = () => {
    if (page + 1 > maxPage)
      return;

    setIsLoading(true);
    (async () => {
      try {
        const { errorCode, data, pagingInfo } = await apiService.getMoreRestaurant(
          page,
          currentFilter,
          RestaurantConfig.CITY[city].idea,
          address
        );
        setIsLoading(false);
        if (errorCode === 0) {
          setListRestaurants((prev) => prev.concat(data));
        }
      } catch (e) {
        setIsLoading(false);
        alert("Không thể kết nối với server.");
        console.log(`[FILTER_RESTAURANT]: ${e.message}`);
      }
    })();
  };

  // fake
  // useEffect(() => {
  //   setIsLoading(true);
  //   setListRestaurants([]);

  //   (async () => {
  //     try {
  //       const { success, message, data } = await service.getListRestaurant(
  //         currentFilter,
  //         address,
  //         0
  //       );
  //       setIsLoading(false);

  //       if (success) {
  //         setListRestaurants(data.listRestaurants);
  //       } else {
  //         alert(message);
  //       }
  //     } catch (e) {
  //       setIsLoading(false);
  //       alert("Không thể kết nối với server.");
  //       console.log(`[FILTER_RESTAURANT]: ${e.message}`);
  //     }
  //   })();
  // }, [currentFilter, address]);

  useEffect(() => {
    setIsLoading(true);
    setListRestaurants([]);

    (async () => {
      try {
        const { errorCode, data, pagingInfo } = await apiService.getListRestaurant(
          page,
          currentFilter,
          RestaurantConfig.CITY[city].idea,
          address
        );
        setIsLoading(false);

        if (errorCode === 0) {
          setListRestaurants(data);
          setMaxPage(pagingInfo.totalPage);
        }
      } catch (e) {
        setIsLoading(false);
        alert("Không thể kết nối với server.");
        console.log(`[FILTER_RESTAURANT]: ${e.message}`);
      }
    })();
  }, [currentFilter, address, city]);

  return (
    <div className="filter-restaurant__container">
      <div className="filter-restaurant__menu">
        {listFilter.map((item) => {
          return (
            <div
              className={[
                "filter-restaurant__menu-item",
                `${
                  item.value === currentFilter
                    ? "filter-restaurant__menu-item-actived"
                    : ""
                }`,
              ].join(" ")}
              onClick={() => {
                setCurrentFilter(item.value);
              }}
              key={item.value}
            >
              {item.title}
            </div>
          );
        })}
        <div
          className="filter-restaurant__menu-item"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DropdownButton
            buttonText="Quận, huyện"
            buttonProps={dropdownButtonStyle}
            hoverColor={"#000000"}
            dropdownList={["a", "b"]}
          />
        </div>
      </div>
      <div className="filter-restaurant__result">
        {listRestaurants.map((restaurant) => {
          return (
            <RestaurantItem
              key={restaurant.id}
              id={restaurant.id}
              urlImg={restaurant.Avatar}
              addressRestaurant={restaurant.FullAddress}
              nameRestaurant={restaurant.Name}
              minPrice={restaurant.OpenHours[0]}
              avgPrice={restaurant.OpenHours[1]}
              voucher={"Giảm giá"}
            />
          );
        })}
        {isLoading && <LoadingItem />}
      </div>

      <div
        className="filter-restaurant__show-more"
        onClick={handleLoadMoreRestaurant}
      >
        {Localization.text("txt_load_more")}
        <ReplayIcon fontSize="small" />
      </div>
    </div>
  );
};

const dropdownButtonStyle = {
  float: "left",
  backgroundColor: "rgba(240, 240, 240, 0.7)",
  marginTop: -10,
  color: "#252525",
  fontSize: "15px",
  transform: "translateY(20%)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

export default FilterRestaurant;
