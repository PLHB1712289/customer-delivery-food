import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Paper, Grow, Divider, Icon, Popper } from "@material-ui/core";
import "./styles.css";

// core components
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import { act } from "react-dom/test-utils";

export default function Pagination(props) {
  const { totalItemsCount, pageRangeDisplay, itemPerPage, onChange } = props;

  const countPage = Math.ceil(totalItemsCount / itemPerPage);
  const [activePage, setActivePage] = useState(1);

  const onChangePage = (key) => {
    // e.preventDefault();
    if (key !== activePage) {
      setActivePage(key);
    }
  };

  const onPreviousPage = () => {
    const key = activePage - 1;
    if (key > 0) {
      setActivePage(key);
    }
  };

  const onNextPage = () => {
    const key = activePage + 1;
    if (key <= countPage) {
      setActivePage(key);
    }
  };

  let startPage = activePage - Math.ceil(itemPerPage / 2);
  startPage = startPage > 0 ? startPage : 1;

  let endPage = startPage + itemPerPage - 1;
  endPage = endPage > countPage ? countPage : endPage;

  // case 1
  if (countPage <= pageRangeDisplay) {
    startPage = 1;
    endPage = countPage;
  } else {
    // case 2
    if (activePage - pageRangeDisplay > 0) {
      startPage = activePage - pageRangeDisplay + 1;
      endPage = activePage;
    }
    else {
        startPage = 1;
        endPage = pageRangeDisplay;
    }
  }

  let array = [];

  for (var index = startPage; index <= endPage; index++) {
    array.push(index);
  }

  const html = array.map(function (key, index) {
    var className = "index-card";
    if (key === activePage) className += " active";
    return (
      <div className={className} key={key} onClick={() => onChangePage(key)}>
        {key}
      </div>
    );
  });

  return (
    <div>
      <div className="icon">
        <NavigateBefore className="icon-content" onClick={onPreviousPage} />
      </div>
      {html}
      <div className="icon">
        <NavigateNext className="icon-content" onClick={onNextPage} />
      </div>
    </div>
  );
}
