import { Grid } from "@material-ui/core";
import React from "react";
import { Bones } from "react-bones/lib";
import "./styles.css";

const LoadingItem = () => {
  const listLoading = [];
  for (let i = 0; i < 9; i++) {
    listLoading.push(
      <Grid item xs={4} key={i}>
        <div style={{ padding: 10 }}>
          <Bones />
          <div style={{ padding: 10 }} />
          <Bones width={"100%"} height={20} />
          <div style={{ padding: 10 }} />
          <Bones width={"100%"} height={20} />
          <div style={{ padding: 10 }} />
          <Bones width={"100%"} height={20} />
          <div style={{ padding: 10 }} />
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
