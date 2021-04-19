import TAG from "../TAG";

const action = {
  turnOn: () => ({
    type: TAG.LOADING.TURN_ON,
    payload: {},
  }),

  turnOff: () => ({
    type: TAG.LOADING.TURN_OFF,
    payload: {},
  }),
};

export default action;
