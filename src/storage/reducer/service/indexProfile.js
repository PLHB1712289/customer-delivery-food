import TAG from "../../TAG";

const INITIAL_STATE = 0;

const profileIndexReducer = (index = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.INDEX_PROFILE.UPDATE:
            return action.payload.index;
        default:
            return index;
    }
};

export default profileIndexReducer;
