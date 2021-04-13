import React from "react";
import { Grid } from "@material-ui/core";
import InformationRestaurant from "./InformationRestaurant";
import ListFood from "./ListFood";

const DetailRestaurant = () => {
  return (
    <Grid
      className="detail-restaurant__container"
      container
      justify="center"
      alignItems="center"
    >
      <Grid item container xs={12} md={10}>
        <InformationRestaurant />
        <ListFood />
      </Grid>
    </Grid>
  );
};

export default DetailRestaurant;
