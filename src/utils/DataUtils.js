import Localization from "../config/Localization";
import LangConfig from "../config/LangConfig";

import ImageUtils from "./ImageUtils";
import ArrayUtils from "./ArrayUtils";

import CatConfig from "../config/CategoryConfig";
import ProfileConfig from "../config/ProfileConfig";
import RestaurantConfig from "../config/RestaurantConfig";
import OrderConfig from "../config/OrderConfig";

import { CheckCircle } from "@material-ui/icons";

// restaurants
import { Grid } from "@material-ui/core";
import CardRestaurant from "../component/ListRestaurant/CardRestaurant";

var DataUtils = DataUtils || {};

DataUtils.getListOptionLanguage = function () {
  var listLang = ArrayUtils.jsonToArray(LangConfig.listLang);
  var listData = listLang.map((lang) => {
    var langName = Localization.text("txt_language_" + lang.country);
    var flagFile = ImageUtils.getFileFlag(lang.langType);
    return {
      text: langName,
      image: flagFile,
      tag: lang.langType,
    };
  });

  return listData;
};

DataUtils.getFilterRestaurant = function () {
  var listFilter = ArrayUtils.jsonToArray(RestaurantConfig.FILTER);
  var listData = listFilter.map((type, index) => {
    var name = Localization.text("txt_restaurant_filter_" + index);
    return {
      name: name,
      index: index,
    };
  });

  return listData;
};

DataUtils.getDataUserSetting = function () {
  var listData = [
    {
      text: "Order1",
      icon: CheckCircle,
    },
    {
      text: "Order2",
      icon: CheckCircle,
    },
    {
      text: "Order3",
      icon: CheckCircle,
    },
    {
      text: "Order4",
      icon: CheckCircle,
    },
  ];

  return listData;
};

DataUtils.getListTypeOfFoodHomePage = function (className) {
  var listTypeCatName = [];
  for (
    var index = CatConfig.INDEX_ID_FROM;
    index <= CatConfig.INDEX_ID_TO;
    index++
  ) {
    listTypeCatName.push(Localization.text("txt_type_food_homepage_" + index));
  }

  var listHTMLObject = listTypeCatName.map((text, index) => {
    return (
      <div key={index} className={className}>
        {text}
      </div>
    );
  });

  return listHTMLObject;
};

DataUtils.mapDataListRestaurant = function (listData) {
  const html = listData.map(function (data, index) {
    return (
        <CardRestaurant data={data} key={index} className="card"/>
    );
  });

  return html;
};

DataUtils.mapStateFitlerArea = function () {
  const listArea = RestaurantConfig.AREA;
  const state = {};

  for (var key in listArea) {
    state[key] = false;
  }

  return state;
};

DataUtils.mapStateFitlerType = function () {
  const listType = RestaurantConfig.FILTER_TYPE;
  const state = {};

  for (var key in listType) {
    state[key] = false;
  }

  return state;
};

DataUtils.getFilterAreaRestaurant = function (filterArea) {
  const chooseArea = [];

  for (var key in filterArea) {
    if (filterArea[key] === true) {
      chooseArea.push(key);
    }
  }

  return chooseArea;
};

DataUtils.getFilterTypeRestaurant = function (filterType) {
  const chooseType = [];

  for (var key in filterType) {
    if (filterType[key] === true) {
      chooseType.push(key);
    }
  }

  return chooseType;
};


DataUtils.mapCityProfile = function () {
  const cities = ArrayUtils.jsonToArray(RestaurantConfig.CITY);

  const data = cities.map((city, key) => {
    return (
      <option value={key}>{city}</option>
    )
  });

  return data;
};

DataUtils.mapAreaProfile = function (city) {
  const areas = ArrayUtils.jsonToArray(RestaurantConfig.AREA[city]);

  const data = areas.map((area, key) => {
    return (
      <option value={key}>{area}</option>
    )
  });

  return data;
};

DataUtils.mapGenderProfile = function (city) {
  const genders = ArrayUtils.jsonToArray(ProfileConfig.GENDER);

  const data = genders.map((gender, key) => {
    return (
      <option value={key}>{Localization.text("txt_gender_" + key)}</option>
    )
  });

  return data;
};

DataUtils.mapOrderStatus = function () {
  const status = ArrayUtils.jsonToArray(OrderConfig.STATUS);

  const data = status.map((value, key) => {
    return (
      <option value={key}>{Localization.text("txt_order_status_" + key)}</option>
    )
  });

  return data;
};


export default DataUtils;
