import React, { useEffect, useState } from "react";
import "./styles.css";


import { NavigateNext, NavigateBefore } from "@material-ui/icons";


export default function Pagination(props) {
  const { 
    totalItemsCount, 
    pageRangeDisplay, 
    itemPerPage, 
    onChangePage, 
    activePage,
    onPreviousPage,
    onNextPage
 } = props;

  const countPage = Math.ceil(totalItemsCount / itemPerPage);

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
