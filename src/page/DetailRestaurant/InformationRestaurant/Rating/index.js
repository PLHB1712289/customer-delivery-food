import { makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";

const useStyle = makeStyles((theme) => ({
  star: { color: "#ffc107", transition: "all 0.2s" },
  container: {
    display: "flex",
    alignItems: "center",
  },
}));

const Rating = ({ rate }) => {
  const classes = useStyle();

  const rateReal = rate < 0 ? 0 : rate > 5 ? 5 : rate;
  const listStar = [
    <StarBorderIcon className={classes.star} />,
    <StarBorderIcon className={classes.star} />,
    <StarBorderIcon className={classes.star} />,
    <StarBorderIcon className={classes.star} />,
    <StarBorderIcon className={classes.star} />,
  ];

  let i = 0;
  for (i = 0; i < Math.floor(rateReal); i++) {
    listStar[i] = <StarIcon className={classes.star} />;
  }
  if (Math.floor((rateReal * 10) % 10)) {
    listStar[i] = <StarHalfIcon className={classes.star} />;
  }

  return <div className={classes.container}>{listStar}</div>;
};

export default Rating;
