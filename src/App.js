import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./libs/fontawesome";

import Header from "./component/Header";
import Footer from "./component/Footer";

import LangConfig from "./config/LangConfig.js";
import Localization from "./config/Localization.js";

function App() {
  const [language, setLanguage] = useState(LangConfig.DEFAULT_LANGUAGE);

  const onChangeLanguage = (langType) => {
    Localization.getInstance().changeLanguage(langType);
    setLanguage(langType);
};


  return (
    <Router>
      <Header onChangeLanguage={onChangeLanguage}/>
      <Footer/>
    </Router>
  );
}

export default App;
