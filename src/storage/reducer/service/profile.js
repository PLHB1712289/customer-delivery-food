import TAG from "../../TAG";

const INITIAL_STATE = {
    fullName: "",
    id: null,
    avatarUrl: ""
};

const tokenReducer = (profile = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.UPDATE:
            return {
                ...profile,
                fullName: action.payload.fullName,
                id: action.payload.id,
                avatarUrl: action.payload.avatarUrl
            };
        default:
            return profile;
    }
};

export default tokenReducer;
