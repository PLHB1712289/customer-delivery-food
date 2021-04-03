import Localization from "../config/Localization";
import LangConfig from "../config/LangConfig";
// Image Flag
import VietnamFlag from "../assets/img/Vietnam_Flag.png";
import EnglandFlag from "../assets/img/England_Flag.png";
// Logo
import Logo from "../assets/img/app-logo.png";
import LogoElip from "../assets/img/Logo-Elip.png";
import Seals from "../assets/img/gov_seals.jpg";
// app download logo
import GooglePlay from "../assets/img/google-play.png";
import AppStore from "../assets/img/app-store.png";
// except
import ResultNotFound from "../assets/img/no-results-found.png";

var ImageUtils = ImageUtils || {};

ImageUtils.getFileFlag = function (country) {
    switch (country) {
        case LangConfig.langType.VN:
            return VietnamFlag;
        case LangConfig.langType.EN:
            return EnglandFlag;
    }
    return "";
};


ImageUtils.getLogo = function () {
    return Logo;
};

ImageUtils.getLogoElip = function () {
    return LogoElip;
};

ImageUtils.getSeal = function () {
    return Seals;
};

ImageUtils.getGooglePlay = function () {
    return GooglePlay;
};

ImageUtils.getAppStore = function () {
    return AppStore;
};

ImageUtils.getResultNotFound = function () {
    return ResultNotFound;
};

export default ImageUtils;