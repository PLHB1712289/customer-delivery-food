import TAG from "../TAG";

const action = {
  signIn: (token, user) => ({
    type: TAG.TOKEN.SIGN_IN,
    payload: { token, user },
  }),

  signOut: () => ({ type: TAG.TOKEN.SIGN_OUT }),
};

export default action;
