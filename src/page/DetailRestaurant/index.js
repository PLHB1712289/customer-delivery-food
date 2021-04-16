import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InformationRestaurant from "../../component/DetailRestaurant/InformationRestaurant";
import ListFood from "../../component/DetailRestaurant/ListFood";
import service from "./service";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadingAction from "../../storage/action/loadingAction";

const DetailRestaurant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dataRestaurant, setDataRestaurant] = useState(null);

  useEffect(() => {
    // turn on loading
    dispatch(loadingAction.turnOn());

    (async () => {
      try {
        const { success, data } = await service.getRestaurant(id);

        if (success) {
          setDataRestaurant(data);
        }
      } catch (e) {}

      dispatch(loadingAction.turnOff());
    })();

    // turn on loading
  }, [id]);

  return (
    <Grid
      className="detail-restaurant__container"
      container
      justify="center"
      alignItems="center"
    >
      <Grid item container xs={12} md={10}>
        {dataRestaurant !== null ? (
          <>
            <InformationRestaurant
              thumbnail={dataRestaurant.thumbnail}
              location={dataRestaurant.location}
              name={dataRestaurant.name}
              address={dataRestaurant.address}
              totalRating={dataRestaurant.totalRating}
              rating={dataRestaurant.rating}
              timeOpenRestaurant={dataRestaurant.timeOpenRestaurant}
              priceAvg={dataRestaurant.priceAvg}
            />
            <ListFood data={dataRestaurant.listFood} />
          </>
        ) : (
          <div style={{ height: "90vh" }}></div>
        )}
      </Grid>
    </Grid>
  );
};

export default DetailRestaurant;
