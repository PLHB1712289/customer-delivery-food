import TAG from "../../TAG";

const INITIAL_STATE = "";

const searchReducer = (search = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.SEARCH.ON_SEARCH:
            return action.payload.keyword;
        default:
            return search;
    }
};

export default searchReducer;
