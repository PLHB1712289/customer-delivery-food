const service = {};

const login_Success = {
  status: 0,
  token: "abcdef",
  userID: 11,
  fullName: "Văn Hồng",
  avatarUrl: "https://i.pravatar.cc/100"
};

const login_Vertify = {
  status: 1,
  userID: 22,
};

const login_Wrong = {
  status: 2
};

service.login_Success = async () => {
  const status = login_Success.status;
  const token = login_Success.token;
  const userID = login_Success.userID;
  const fullName = login_Success.fullName;
  const avatarUrl = login_Success.avatarUrl;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "success",
        data: { status, token, userID, fullName, avatarUrl },
      });
    }, 1500);
  });
};

service.loginVetify = async () => {
  const status = login_Vertify.status;
  const userID = login_Vertify.userID;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "success",
        data: { status, userID },
      });
    }, 1500);
  });
};

service.loginWrong = async () => {
  const status = login_Wrong.status;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "success",
        data: { status },
      });
    }, 1500);
  });
};


export default service;
