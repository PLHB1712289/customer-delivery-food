import React, { useEffect, useState } from "react";
import "./styles.css";
import DropdownButton from "../../Common/CustomDropdown";
import RestaurantItem from "./RestaurantItem";
import ReplayIcon from "@material-ui/icons/Replay";
import LoadingItem from "./Loading";
import service from "./service";

const listFilter = [
  {
    title: "Gần tôi",
    value: "near-me",
  },
  {
    title: "Bán chạy",
    value: "hot",
  },
  {
    title: "Đánh giá",
    value: "review",
  },
  {
    title: "Giao nhanh",
    value: "quick-ship",
  },
];

const FilterRestaurant = () => {
  const [currentFilter, setCurrentFilter] = useState(listFilter[0].value);
  const [address, setAddress] = useState("");
  const [listRestaurants, setListRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreRestaurant = () => {
    setIsLoading(true);
    (async () => {
      try {
        const { success, message, data } = await service.getListRestaurant(
          currentFilter,
          address,
          listRestaurants.length
        );
        setIsLoading(false);

        if (success) {
          setListRestaurants((prev) => prev.concat(data.listRestaurants));
        } else {
          alert(message);
        }
      } catch (e) {
        setIsLoading(false);
        alert("Không thể kết nối với server.");
        console.log(`[FILTER_RESTAURANT]: ${e.message}`);
      }
    })();
  };

  useEffect(() => {
    setIsLoading(true);
    setListRestaurants([]);

    (async () => {
      try {
        const { success, message, data } = await service.getListRestaurant(
          currentFilter,
          address,
          0
        );
        setIsLoading(false);

        if (success) {
          setListRestaurants(data.listRestaurants);
        } else {
          alert(message);
        }
      } catch (e) {
        setIsLoading(false);
        alert("Không thể kết nối với server.");
        console.log(`[FILTER_RESTAURANT]: ${e.message}`);
      }
    })();
  }, [currentFilter, address]);

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
              urlImg={restaurant.urlImg}
              addressRestaurant={restaurant.addressRestaurant}
              nameRestaurant={restaurant.nameRestaurant}
              minPrice={restaurant.minPrice}
              avgPrice={restaurant.avgPrice}
              voucher={restaurant.voucher}
            />
          );
        })}
        {isLoading && <LoadingItem />}
      </div>

      <div
        className="filter-restaurant__show-more"
        onClick={handleLoadMoreRestaurant}
      >
        Xem thêm
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
