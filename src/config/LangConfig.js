// Client Control
var LangConfig = LangConfig || {};

LangConfig.langType = {
  VN: 0, // Vietnamese
  EN: 1, // English
};

LangConfig.listLang = {
  0: { country: "vn", langType: 0, langFile: "lang_VI.json" },
  1: { country: "en", langType: 1, langFile: "lang_EN.json" },
};

LangConfig.DEFAULT_LANGUAGE = LangConfig.langType.VN;

LangConfig.changeLang = function (langType) {
  LangConfig.DEFAULT_LANGUAGE = langType;
};

export default LangConfig;
