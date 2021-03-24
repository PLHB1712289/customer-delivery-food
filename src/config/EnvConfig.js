const DEV_ENV = {
  ENV: "DEVELOPMENT",
  SERVER_URL: "http://localhost:8000",
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
} else {
  console.log("Run on host");
}

export default CONFIG;
