import React, { useState, useEffect } from "react";
import { useSelector, Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./component/Error/404";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Loading from "./component/Loading";
import LangConfig from "./config/LangConfig.js";
import Localization from "./config/Localization.js";
import DetailRestaurant from "./page/DetailRestaurant";
import HomePage from "./page/HomePage";
import ListRestaurant from "./page/ListRestaurant";
import Profile from "./page/profile";
import SignIn from "./page/SignIn";
import Order from "./page/Order";
import InputOTP from "./page/VertifyOTP";
import VertifyPhonge from "./page/VertifyPhone";
import Store from "./storage";
import "./libs/fontawesome";
import socket from "./socket";

function App() {
  // Token
  var token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      socket.connect();
      return () => socket.disconnect();
    }
  }, []);

  let current_language = localStorage.getItem("langType");
  current_language =
    current_language !== undefined && current_language !== null
      ? parseInt(current_language)
      : LangConfig.DEFAULT_LANGUAGE;

  Localization.getInstance().changeLanguage(current_language);

  // state
  const [language, setLanguage] = useState(current_language);

  const onChangeLanguage = (langType) => {
    localStorage.setItem("langType", langType);
    Localization.getInstance().changeLanguage(langType);
    setLanguage(langType);
  };

  return (
    <Provider store={Store}>
      <Loading />
      <Router>
        <Header onChangeLanguage={onChangeLanguage} />
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>

          <Route path="/vertify-phone">
            <VertifyPhonge />
          </Route>

          <Route path="/restaurant/:id">
            <ToastProvider placement="bottom-right">
              <DetailRestaurant />
            </ToastProvider>
          </Route>

          <Route path="/input-otp">
            <InputOTP />
          </Route>

          <Route path="/restaurants">
            <ListRestaurant />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/my-order">
            <Order />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
