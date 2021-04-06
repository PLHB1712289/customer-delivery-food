import TAG from "../../TAG";

const INITIAL_STATE = {
    fullName: "",
    id: -1,
    avatarUrl: ""
};

const tokenReducer = (profile = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.UPDATE:
            return {
                ...profile,
                id: action.payload.id,
                fullName: action.payload.fullName,
                avatarUrl: action.payload.avatarUrl
            };
        default:
            return profile;
    }
};

export default tokenReducer;
