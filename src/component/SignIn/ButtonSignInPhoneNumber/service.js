const service = {};

service.vertifyPhoneNumber = async (phone, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: status,
        message: "success",
        data: {  }
      });
    }, 1500);
  });
};

const login_Success = {
    status: 0,
    token: "abcdef",
    userID: 11,
    fullName: "Tử Vănn",
    avatarUrl: "https://i.pravatar.cc/100",
  };
  
  service.inputOTP = async (otp, status) => {
    const token = login_Success.token;
    const userID = login_Success.userID;
    const fullName = login_Success.fullName;
    const avatarUrl = login_Success.avatarUrl;
  
    if (status === 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 0,
            message: "success",
            data: {token, userID, fullName, avatarUrl },
          });
        }, 1500);
      });
    }
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: status,
          message: "success",
          data: {  },
        });
      }, 1500);
    });
  };

export default service;
