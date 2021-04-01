import React, { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./storage";
import "./libs/fontawesome";

import Header from "./component/Header";
import Footer from "./component/Footer";
import SignIn from "./page/SignIn";
import VertifyPhonge from "./component/VertifyPhone";
import HomePage from "./page/HomePage";
import ListRestaurant from "./page/ListRestaurant";

import Error404 from "./component/Error/404";

import LangConfig from "./config/LangConfig.js";
import Localization from "./config/Localization.js";
import Loading from "./component/Loading";
import { LiveTv } from "@material-ui/icons";

function App() {
  let current_language = localStorage.getItem("langType");
  current_language = current_language !== undefined && current_language !== null 
  ? parseInt(current_language) : LangConfig.DEFAULT_LANGUAGE;

  Localization.getInstance().changeLanguage(current_language);

  // state
  const [language, setLanguage] = useState(current_language);

  const onChangeLanguage = (langType) => {
    localStorage.setItem("langType", langType);
    Localization.getInstance().changeLanguage(langType);
    setLanguage(langType);
  };

  return (
    <Provider store={store}>
      <Loading />

      <Router>
        <Header onChangeLanguage={onChangeLanguage} />

        <Switch>
          <Route path={"/sign-in"}>
            <SignIn />
          </Route>

          <Route path={"/vertify-phone"}>
            <VertifyPhonge />
          </Route>

          <Route path={"/"}>
            <ListRestaurant />
            {/* <HomePage /> */}
          </Route>
        </Switch>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
