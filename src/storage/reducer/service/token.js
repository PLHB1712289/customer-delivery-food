import TAG from "../../TAG";

const INITIAL_STATE = {
  token: null
};

const tokenReducer = (token = INITIAL_STATE, action) => {
  switch (action.type) {
    case TAG.TOKEN.SIGN_IN:
      return {
        ...token,
        token: action.payload.token,
      };

    case TAG.TOKEN.SIGN_OUT:
      return {
        ...token,
        token: null,
      };

    default:
      return token;
  }
};

export default tokenReducer;
