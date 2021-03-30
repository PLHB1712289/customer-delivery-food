const _url = {
    SIGN_IN: {
        FACEBOOK: "/auth/sign-in/facebook",
        GOOGLE: "/customer/auth/google",
        PHONE: "/auth/sign-in/phone",
        NORMAL: "/auth/sign-in"
    },

    VERIFY: {
        PHONE: "/auth/vertify-phone"
    },

    RESTAURANT: {
        GET_LIST: "/restaurants"
    }
};

const url = { ..._url };

export default url;