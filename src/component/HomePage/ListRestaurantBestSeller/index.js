import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListItems from "../ListItems";
import CardRestaurant from "./CardRestaurant";
import service from "./service";
import Localization from "../../../config/Localization";

const ListRestaurantBestSeller = () => {
  const history = useHistory();

  const [listRestaurant, setListRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreRestaurant = () => {
    setIsLoading(true);

    (async () => {
      try {
        const { success, message, data } = await service.getMoreRestaurant(
          listRestaurant.length
        );

        setIsLoading(false);
        if (success) {
          setListRestaurant((prev) => prev.concat(data.listRestaurant));
        } else {
          alert(message);
        }
      } catch (e) {
        alert("[handleLoadMoreRestaurant] Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
      }
    })();
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const {
          success,
          message,
          data,
        } = await service.getListRestaurantBestSeller();

        setIsLoading(false);
        if (success) {
          setListRestaurant(data.listRestaurant);
        } else {
          alert(message);
        }
      } catch (e) {
        alert("Không thể kết nối với server.");
        console.error(`[LIST_RESTAURANT_BEST_SELLER]: ${e.message}`);
      }
    })();
  }, []);

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
              isOpen={restaurant.isOpen}
              urlImg={restaurant.urlImg}
              nameRestaurant={restaurant.nameRestaurant}
              addressRestaurant={restaurant.addressRestaurant}
              voucher={restaurant.voucher}
            />
          </Grid>
        );
      })}
    </ListItems>
  );
};

export default ListRestaurantBestSeller;
