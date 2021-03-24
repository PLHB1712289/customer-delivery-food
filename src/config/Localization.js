// MARK: import
import LanguageEN from "../resources/lang/lang_EN.json";
import LanguageVN from "../resources/lang/lang_VN.json";
import LangConfig from "./LangConfig";

var Localization = class {
  constructor() {
    this.init();
  }

  init() {
    this._currLanguage = null;
    this._dataText = null;
    this.setLanguage(LangConfig.DEFAULT_LANGUAGE);
    this._initialized = true;
  }

  setLanguage(langType) {
    langType = isNaN(langType) ? LangConfig.langType.VN : langType;

    if (langType === this._currLanguage) return false;

    // read text data
    var textData = {};
    var fileData = fr.Localization.getFileLocalizeText(langType);
    try {
      textData = fileData["text"];
    } catch (error) {
      console.log("<Localization>:  READ FILE DATA ERROR");
      return;
    }

    this.setCurrentLanguage(langType, textData);
    return true;
  }

  setCurrentLanguage(langType, jsonData) {
    langType = langType || LangConfig.langType.VN;
    jsonData = jsonData || {};
    this._currLanguage = langType;
    this._dataText = jsonData;
    this._loadDone = true;
  }

  getCurrentLanguage() {
    return this._currLanguage;
  }

  getStringForKey(key) {
    key = typeof key === "string" ? key : "";
    if (this._currLanguage === undefined || this._currLanguage === null) {
      return key;
    }
    var value = this._dataText ? this._dataText[key] : "";
    return value ? value : key;
  }

  changeLanguage(langType) {
    langType = langType || LangConfig.langType.VN;

    // current language not change
    if (langType === this._currLanguage) {
      return false;
    }

    // set new text localize
    var textData = {};
    var fileData = fr.Localization.getFileLocalizeText(langType);
    try {
      textData = fileData["text"];
    } catch (error) {
      console.log("<Localization>:  READ FILE DATA ERROR");
      return;
    }

    LangConfig.changeLang(langType);
    this.setCurrentLanguage(langType, textData);
    return true;
  }
};

var fr = {};
fr.Localization = {};
fr.Localization._instance = null;

// Singleton Pattern
fr.Localization.getInstance = function () {
  if (!fr.Localization._instance) {
    fr.Localization._instance = new Localization();
  }
  return fr.Localization._instance;
};

// Get Localize text
fr.Localization.text = function (key) {
  if (typeof key !== "string") {
    return "UNDEFINED";
  }
  var text = fr.Localization.getInstance().getStringForKey(key);
  return text;
};

// Get File Localize Text By Language Type
fr.Localization.getFileLocalizeText = function (langType) {
  switch (langType) {
    case 0:
      return LanguageVN;
    case 1:
      return LanguageEN;
  }

  return undefined;
};

// Change LocalizeText when change language
fr.Localization.changeLanguage = function (langType) {
  return fr.Localization.getInstance().changeLanguage(langType);
};

export default fr.Localization;
