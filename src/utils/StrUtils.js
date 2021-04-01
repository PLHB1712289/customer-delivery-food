var StrUtils = StrUtils || {};

StrUtils.formatUsernameUI = function (name) {
    if (name.length > 9) {
        name = name.substr(0, 7) + "...";
    }

    return name;
};

StrUtils.formatAdressRestaurantCart = function (name) {
    if (name.length > 30) {
        name = name.substr(0, 31) + "...";
    }

    return name;
};

export default StrUtils;