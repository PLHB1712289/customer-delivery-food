import Localization from "../config/Localization";
import LangConfig from "../config/LangConfig";
// Image Flag
import VietnamFlag from "../assets/img/Vietnam_Flag.png";
import EnglandFlag from "../assets/img/England_Flag.png";
// Logo
import Logo from "../assets/img/app-logo.png";
import LogoElip from "../assets/img/Logo-Elip.png";
import Seals from "../assets/img/gov_seals.jpg";

 

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

export default ImageUtils;