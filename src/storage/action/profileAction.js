import TAG from "../TAG";

const action = {
    update: (fullName, id, avatarUrl) => ({
        type: TAG.UPDATE,
        payload: { fullName, id, avatarUrl }
    })
};

export default action;
