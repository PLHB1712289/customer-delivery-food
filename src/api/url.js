const _url = {
  SIGN_IN: {
    FACEBOOK: "/auth/sign-in/facebook",
    GOOGLE: "/auth/google",
    PHONE: "/auth/sign-in/phone",
    NORMAL: "/auth/sign-in",
  },

    OTP: {
        CALL: "/auth/google/otp/call",
        VERIFY: "/auth/google/otp/verify",

        PHONE_CALL: "/auth/phone/otp/call",
        PHONE_VERIFY: "/auth/phone/otp/verify"
    },

    USER_INFO: {
        GET: "/users/"
    },

    RESTAURANT: {
        GET_LIST_ALL: "/restaurants",
        GET_LIST_NEW: "/restaurants/new",
        GET_LIST_DISCOUNT: "/restaurants/best-discount",
        GET_LIST_NEAREST: "/restaurants/nearest",
        GET_BY_ID: "/restaurants/",
        GET_CATEGORIES: "/restaurants/resId/foodcategories",
        GET_FOODS: "restaurants/resId/foodcategories/catId/foods"
    },

    ORDER: {
      GET_SHIP_FEE: "/orders/shippingfee",
      SEND_ORDER: "/orders"
    }
};

const url = { ..._url };

export default url;
