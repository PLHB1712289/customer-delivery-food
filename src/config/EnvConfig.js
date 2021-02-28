import { computeHeadingLevel } from "@testing-library/react";

const DEV_ENV = {
  ENV: "DEVELOPMENT",
  SERVER_URL: "http://localhost:3000",
};

const PRO_ENV = {
  ENV: process.env.REACT_APP_ENVIRONMENT,
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
};

const CONFIG =
  process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"
    ? { ...DEV_ENV }
    : { ...PRO_ENV };

if (process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT") {
  console.log("Run on development environment");
}

export default CONFIG;
