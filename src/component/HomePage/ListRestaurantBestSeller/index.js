import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListItems from "../ListItems";
import CardRestaurant from "./CardRestaurant";
import service from "./service";
import apiService from "./apiService";
import Localization from "../../../config/Localization";
import { useSelector } from "react-redux";
import RestaurantConfig from "../../../config/RestaurantConfig";

const ListRestaurantBestSeller = () => {
  const history = useHistory();

  const [listRestaurant, setListRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const city = useSelector((state) => state.city);

  // fake
  // const handleLoadMoreRestaurant = () => {
  //   setIsLoading(true);

  //   (async () => {
  //     try {
  //       const { success, message, data } = await service.getMoreRestaurant(
  //         listRestaurant.length
  //       );

  //       setIsLoading(false);
  //       if (success) {
  //         setListRestaurant((prev) => prev.concat(data.listRestaurant));
  //       } else {
  //         alert(message);
  //       }
  //     } catch (e) {
  //       alert("[handleLoadMoreRestaurant] Không thể kết nối với server.");
  //       console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
  //     }
  //   })();
  // };

  // real
  const handleLoadMoreRestaurant = () => {
    if (page + 1 > maxPage)
      return; 

    setIsLoading(true);
    (async () => {
      try {
        const { errorCode, data, pagingInfo } = await service.getMoreRestaurant(page + 1, RestaurantConfig.CITY[city].idea);

        setIsLoading(false);
        if (errorCode === 0) {
          setListRestaurant((prev) => prev.concat(data));
          setPage(page + 1);
        }
      } catch (e) {
        alert("[handleLoadMoreRestaurant] Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
      }
    })();
  };

  // fake
  // useEffect(() => {
  //   setIsLoading(true);

  //   (async () => {
  //     try {
  //       const { success, message, data } =
  //         await service.getListRestaurantBestSeller();

  //       setIsLoading(false);
  //       if (success) {
  //         setListRestaurant(data.listRestaurant);
  //       } else {
  //         alert(message);
  //       }
  //     } catch (e) {
  //       alert("Không thể kết nối với server.");
  //       console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
  //     }
  //   })();
  // }, []);

  // real
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const { errorCode, data } = await apiService.getListRestaurant(page, RestaurantConfig.CITY[city].idea,);

        setIsLoading(false);
        if (errorCode === 0) {
          setListRestaurant(data);
          setMaxPage(data.totalPage)
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
      }
    })();
  }, [city]);

  return (
    <ListItems
      shoudDisplayLoading={isLoading}
      lable={Localization.text("txt_top_sales")}
      onClickShowAll={() => {
        history.push("/restaurants");
      }}
      onClickShowMore={handleLoadMoreRestaurant}
    >
      {listRestaurant.map((restaurant) => {
        return (
          <Grid item md={4} key={restaurant.id}>
            <CardRestaurant
              id={restaurant.id}
              isOpen={restaurant.IsOpening}
              urlImg={restaurant.Avatar}
              nameRestaurant={restaurant.Name}
              addressRestaurant={restaurant.FullAddress}
              voucher={"Giảm giá"}
            />
          </Grid>
        );
      })}
    </ListItems>
  );
};

export default ListRestaurantBestSeller;
