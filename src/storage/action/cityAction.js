import TAG from "../TAG";

const action = {
    update: (city) => ({
        type: TAG.CITY.UPDATE,
        payload: { city }
    }),
};

export default action;
