import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import ArrayUtils from "../../utils/ArrayUtils";

const service = {};

const data = {
    userID: 1,
    fullName: "Martin Garrix",
    avatar: "https://i.pravatar.cc/100",
    token: "abcdef"
}

service.sendLoginOTP = async (otp) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "success",
        data: data
      });
    }, 1500);
  });
};


export default service;
