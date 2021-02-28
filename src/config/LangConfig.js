// Client Control
var LangConfig = LangConfig || {};

LangConfig.langType = {
    VN: 0,  // Vietnamese
    EN: 1   // English
};

LangConfig.listLang = {
    0: {country: "vn", langFile: "lang_VI.json"},
    1: {country: "en", langFile: "lang_EN.json"}
};

LangConfig.DEFAULT_LANGUAGE = LangConfig.langType.VN;

export default LangConfig;