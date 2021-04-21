const service = {};

const tableFeeShip = (distance) => {
  const table = [
    { min: 0, max: 3, fee: 15000 },
    { min: 3, max: 6, fee: 30000 },
    { min: 6, max: 9, fee: 45000 },
    { min: 9, max: -1, fee: 60000 },
  ];

  return table.reduce((fee, currFee) => {
    if (currFee.min <= distance && distance < currFee.max) fee = currFee.fee;
    return fee;
  }, 0);
};

service.getFeeShip = (coorRestaurant, coorCustomer) => {
  const distance = Math.floor(Math.random() * 100) % 10;
  return new Promise((res) =>
    setTimeout(
      res({ success: true, data: { distance, fee: tableFeeShip(distance) } }),
      1500
    )
  );
};

export default service;
