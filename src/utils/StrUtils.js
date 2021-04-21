const StrUtils = {};

StrUtils.formatUsernameUI = function (name) {
  const indexSplit = name.toString().lastIndexOf(" ");
  if (indexSplit > 0) {
    name = name.substr(indexSplit + 1);
  }

  return name;
};

StrUtils.formatAddressCustomer = function (address) {
  if (address.length > 85) {
    address = address.substr(0, 85) + "...";
  }

  return address;
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

StrUtils.formatMoneyString = function (money) {
  // var str = money.toString();
  // var count = 0;

  // for (var i = str.length - 1; i >= 0; i--) {
  //   count++;
  //   if (count === 3) {
  //     str = str.substr(0, i) + "." + str.substr(i);
  //     count = 0;
  //     i--;
  //   }
  // }

  // return str;
  const characterSplit = ",";

  const regex = "\\d(?=(\\d{" + 3 + "})+" + "$" + ")";
  return money
    .toFixed(Math.max(0, 0))
    .replace(new RegExp(regex, "g"), `$&${characterSplit}`);
};

export default StrUtils;
