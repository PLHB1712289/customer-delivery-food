import TAG from "../TAG";

const action = {
    signIn: (userID, fullName, avatarUrl, phone) => ({
        type: TAG.PROFILE.SIGN_IN,
        payload: { userID, fullName, avatarUrl, phone }
    }),

    signOut: () => ({
        type: TAG.PROFILE.SIGN_OUT
    })
};

export default action;
