import axiosClient from "../../api";
import URL from "../../api/url";

const APIService = {
  syncAccount: async (token) => {
    // Fake data
    await new Promise((res) => setTimeout(res, 1500));

    return {
      success: true,
      message: "Get account successfully.",
      data: {
        user: {
          userName: "FakeUserName",
        },
      },
    };
  },
};

export default APIService;
