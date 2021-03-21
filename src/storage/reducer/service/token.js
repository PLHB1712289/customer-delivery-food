import TAG from "../../TAG";

const INITIAL_STATE = {
    token: null,
    user: null
};

const tokenReducer = (token = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.TOKEN.SIGN_IN:
            return {
                ...token,
                token: action.payload.token,
                user: action.payload.user
            };
        case TAG.TOKEN.SIGN_OUT:
            return {
                ...token,
                token: null,
                user: null
            };
        default:
            return token;
    }
};

export default tokenReducer;
