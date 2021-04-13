import TAG from "../TAG";

const action = {
  signIn: (token) => ({
    type: TAG.TOKEN.SIGN_IN,
    payload: { token },
  }),

  signOut: () => ({ type: TAG.TOKEN.SIGN_OUT }),
};

export default action;
