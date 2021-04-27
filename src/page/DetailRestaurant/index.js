import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InformationRestaurant from "../../component/DetailRestaurant/InformationRestaurant";
import ListFood from "../../component/DetailRestaurant/ListFood";
import service from "./service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartAction from "../../storage/action/cartAction";
import loadingAction from "../../storage/action/loadingAction";

const DetailRestaurant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    // turn on loading
    dispatch(loadingAction.turnOn());

    (async () => {
      try {
        const { success, data } = await service.getRestaurant(id);

        console.log(data);

        if (success) {
          dispatch(cartAction.createCart(data));
        }
      } catch (e) {}

      // turn off loading
      dispatch(loadingAction.turnOff());
    })();
  }, [id]);

  return (
    <Grid
      className="detail-restaurant__container"
      container
      justify="center"
      alignItems="center"
    >
      <Grid item container xs={12} md={10}>
        {!loading ? (
          <>
            <InformationRestaurant />
            <ListFood />
          </>
        ) : (
          <div style={{ height: "90vh" }}></div>
        )}
      </Grid>
    </Grid>
  );
};

export default DetailRestaurant;
