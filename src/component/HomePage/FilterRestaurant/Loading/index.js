import { Grid } from "@material-ui/core";
import React from "react";
import { Bones } from "react-bones/lib";
import "./styles.css";

const LoadingItem = () => {
  const listLoading = [];
  for (let i = 0; i < 6; i++) {
    listLoading.push(
      <Grid item xs={12}>
        <div style={{ padding: 10, display: "flex" }}>
          <Bones width={200} height={100} />
          <div style={{ width: "70%", marginLeft: 10 }}>
            <Bones width={"100%"} height={20} />
            <div style={{ padding: 10 }}></div>
            <Bones width={"100%"} height={20} />
            <div style={{ padding: 10 }}></div>
            <Bones width={"100%"} height={20} />
            <div style={{ padding: 10 }}></div>
          </div>
        </div>
      </Grid>
    );
  }
  return (
    <Grid container className="LoadingItem">
      {listLoading}
    </Grid>
  );
};

export default LoadingItem;
