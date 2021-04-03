const StrUtils = {};

StrUtils.formatUsernameUI = function (name) {
  if (name.length > 9) {
    name = name.substr(0, 7) + "...";
  }

  return name;
};

StrUtils.formatNameRestaurantCart = function (name) {
  if (name.length > 19) {
      name = name.substr(0, 19) + "...";
  }

return name;
};

StrUtils.formatAdressRestaurantCart = function (name) {
    if (name.length > 30) {
        name = name.substr(0, 31) + "...";
    }

  return name;
};

StrUtils.formatAddressRestaurantCard = function (name) {
  if (name.length > 20) {
    name = name.substr(0, 22) + "...";
  }

  return name;
};

StrUtils.formatNameVoucherCard = function (name) {
  if (name.length > 20) {
    name = name.substr(0, 22) + "...";
  }

  return name;
};

export default StrUtils;
