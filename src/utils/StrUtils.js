var StrUtils = StrUtils || {};

StrUtils.formatUsernameUI = function (name) {
    if (name.length > 9) {
        name = name.substr(0, 7) + "...";
    }

    return name;
};

export default StrUtils;