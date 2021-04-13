import TAG from "../../TAG";

const INITIAL_STATE = 0;

const cityReducer = (city = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG.CITY.UPDATE:
            return action.payload.city;
        default:
            return city;
    }
};

export default cityReducer;
