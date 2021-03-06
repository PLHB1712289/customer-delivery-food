import TAG from "../../TAG";

const INITIAL_STATE = {
  userID: -1,
  fullName: "",
  avatarUrl: "",
  phone: ""
};

const profileReducer = (profile = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.PROFILE.SIGN_IN:
      return {
        ...profile,
        userID: action.payload.userID,
        fullName: action.payload.fullName,
        avatarUrl: action.payload.avatarUrl,
        phone: action.payload.phone
      };
    case TAG.PROFILE.SIGN_OUT:
      return {
        ...profile,
        userID: -1,
        fullName: "",
        avatarUrl: "",
        phone: ""
      };
    default:
      return profile;
  }
};

export default profileReducer;
