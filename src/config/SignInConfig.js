const SignInConfig = {};

SignInConfig.STATUS = {
    SUCESS: 0,
    VERTIFY: 1,
    WRONG: 2
};

SignInConfig.VERTIFY_PHONE_NUMBER_STATUS = {
    SUCESS: 0,
    INVALID: 1,
    PHONE_NUMBER_USED: 2
};

SignInConfig.VERTIFY_OTP_STATUS = {
    SUCESS: 0,
    WRONG: 1
};

export default SignInConfig;