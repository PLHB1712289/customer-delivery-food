const SignInConfig = {};

SignInConfig.STATUS = {
    SUCESS: 0,
    VERTIFY: 1,
    WRONG: 2
};

SignInConfig.VERTIFY_PHONE_NUMBER_STATUS = {
    SUCESS: 0,
    INVALID: 1,
    USER_NOT_EXISTED: 2,
    PHONE_NUMBER_USED: 3,
    USER_NOT_ACTIVED: 5
};

SignInConfig.VERTIFY_OTP_STATUS = {
    SUCESS: 0,
    WRONG: 3,
    PHONE_NOT_EXISTED: 4
};

export default SignInConfig;