const service = {};

service.vertifyPhoneNumber = async (status) => {
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
