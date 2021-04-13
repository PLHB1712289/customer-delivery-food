import TAG from "../TAG";

const action = {
    signIn: (userID, fullName, avatarUrl) => ({
        type: TAG.PROFILE.SIGN_IN,
        payload: { userID, fullName, avatarUrl }
    }),

    signOut: () => ({
        type: TAG.PROFILE.SIGN_OUT
    })
};

export default action;
