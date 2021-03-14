import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './component/GroupHeader/Header';

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
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>ggdf
    </Router>
  );
}

export default App;
