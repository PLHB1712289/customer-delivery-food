import TAG from "../TAG";

const action = {
    update: (keyword) => ({
        type: TAG.SEARCH.ON_SEARCH,
        payload: { keyword }
    }),
};

export default action;
