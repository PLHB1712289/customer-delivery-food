const StrUtils = {};

StrUtils.formatUsernameUI = function (name) {
  var indexSplit = StrUtils.getNearLastSpaceIndex(name);
  if (indexSplit > 0) {
    return name.substr(0, indexSplit);
  }
  console.log(indexSplit);

  indexSplit = name.toString().lastIndexOf(" ");
  if (indexSplit > 0) {
    return name.substr(indexSplit + 1);
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
  const characterSplit = ",";

  const regex = "\\d(?=(\\d{" + 3 + "})+" + "$" + ")";
  return money
    .toFixed(Math.max(0, 0))
    .replace(new RegExp(regex, "g"), `$&${characterSplit}`);
};

StrUtils.getValueQRFromUrl = function (url) {
  const start_index = url.indexOf("order=");
  const temp = url.substr(start_index + 6);
  const result = temp.substr(0, temp.length - 20);
  console.log("qr: " + result);
  return result;
};

StrUtils.getNearLastSpaceIndex = function (str) {
  var count = 0;

  for (var i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      count++;
    }
    if (count === 2) {
      return i;
    }
  }

  return -1;
};

export default StrUtils;
