import { Grid } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import ReplayIcon from "@material-ui/icons/Replay";
import Loading from "./LoadingItem";
import React from "react";
import "./styles.css";

const ListItems = ({
  shoudDisplayLoading,
  lable,
  onClickShowMore,
  onClickShowAll,
  children,
}) => {
  return (
    <div className="ListItems">
      <div className="ListItems__lable">
        <div className="ListItems__lable-title">{lable}</div>
        <div className="ListItems__lable-see-all" onClick={onClickShowAll}>
          <AppsIcon fontSize="small" />
          Xem tất cả
        </div>
      </div>
      <Grid item container xs={12}>
        {children}
        {shoudDisplayLoading && <Loading />}
      </Grid>
      <div className="ListItems__show-more" onClick={onClickShowMore}>
        Xem thêm
        <ReplayIcon fontSize="small" />
      </div>
    </div>
  );
};

export default ListItems;
