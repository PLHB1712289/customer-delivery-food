import TAG from "../TAG";

const action = {
    update: (id, fullName, avatarUrl) => ({
        type: TAG.UPDATE,
        payload: { id, fullName, avatarUrl }
    })
};

export default action;
