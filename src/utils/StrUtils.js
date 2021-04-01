var StrUtils = StrUtils || {};

StrUtils.formatUsernameUI = function (name) {
    if (name.length > 9) {
        name = name.substr(0, 7) + "...";
    }

    return name;
};

StrUtils.formatAdressRestaurantCart = function (name) {
    if (name.length > 20) {
        name = name.substr(0, 22) + "...";
    }

    return name;
};

export default StrUtils;