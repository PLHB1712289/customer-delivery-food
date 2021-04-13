import TAG from "../TAG";

const action = {
    update: (index) => ({
        type: TAG.INDEX_PROFILE.UPDATE,
        payload: { index }
    }),
};

export default action;
