import TAG from "../TAG";

const action = {
    create: (data) => ({
        type: TAG.ORDER.CREATE,
        payload: { data: data }
    }),

    updateStatus: (status) => ({
        type: TAG.ORDER.UPDATE_STATUS,
        payload: { status: status}
    }),

    updateShipperInfo: (shipper) => ({
        type: TAG.ORDER.SHIPPER,
        payload: { shipperInfo: shipper }
    }),

    reset: () => ({
        type: TAG.ORDER.RESET
    })
};

export default action;
