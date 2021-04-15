const _url = {
  SIGN_IN: {
    FACEBOOK: "/auth/sign-in/facebook",
    GOOGLE: "/customer/auth/google",
    PHONE: "/auth/sign-in/phone",
    NORMAL: "/auth/sign-in",
  },

  VERIFY: {
    PHONE: "/auth/vertify-phone",
  },

  RESTAURANT: {
    GET_LIST_ALL: "/restaurants",
    GET_LIST_NEW: "/restaurants/new",
    GET_LIST_DISCOUNT: "/restaurants/best-discount",
    GET_LIST_NEAREST: "/restaurants/nearest",
  },
};

const url = { ..._url };

export default url;
