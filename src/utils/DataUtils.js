import Localization from "../config/Localization";
import LangConfig from "../config/LangConfig";
import ImageUtils from "./ImageUtils";
import ArrayUtils from "./ArrayUtils";
import CatConfig from "../config/CategoryConfig";
import { CheckCircle } from "@material-ui/icons";

 

var DataUtils = DataUtils || {};

DataUtils.getListOptionLanguage = function () {
    var listLang = ArrayUtils.jsonToArray(LangConfig.listLang);
    var listData = listLang.map((lang) => {
        var langName = Localization.text("txt_language_" + lang.country);
        var flagFile = ImageUtils.getFileFlag(lang.langType);
        return {
            text: langName, 
            image: flagFile,
            tag: lang.langType
        };
    });

    return listData;
};

DataUtils.getDataUserSetting = function () {
    var listData = [
        {
            text: "Order1",
            icon: CheckCircle
        },
        {
            text: "Order2",
            icon: CheckCircle
        },
        {
            text: "Order3",
            icon: CheckCircle
        },
        {
            text: "Order4",
            icon: CheckCircle
        },
    ]

    return listData;
};

DataUtils.getListTypeOfFoodHomePage = function (className) {
    var listTypeCatName = [];
    for (var index = CatConfig.INDEX_ID_FROM; index <= CatConfig.INDEX_ID_TO; index++) {
        listTypeCatName.push(Localization.text("txt_type_food_homepage_" + index));
    }

    var listHTMLObject = listTypeCatName.map((text) => {
        return <div className={className}>{text}</div>
    })

    return listHTMLObject;
};

export default DataUtils;