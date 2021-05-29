const service = {};
const seed = [
  {
    id: "a",
    urlImg:
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
    nameRestaurant: "Quán Ăn Tisu - Nui & Mì Xào Bò - Shop Online",
    addressRestaurant: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    voucher: 1,
    minPrice: 20,
    avgPrice: 40,
    type: "near-me",
  },
  {
    id: "b",
    urlImg:
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
    nameRestaurant: "Món Quảng Xuyên Việt",
    addressRestaurant: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
    voucher: "Giảm hết 30%",
    type: 2,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "c",
    urlImg:
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
    nameRestaurant: "Sunny House - Sinh Tố & Nước Ép",
    addressRestaurant: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
    voucher: "Mã giảm 50%",
    type: 4,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "d",
    urlImg:
      "https://images.foody.vn/res/g103/1020115/prof/s280x175/foody-upload-api-foody-mobile-hmzz-200421103141.jpg",
    nameRestaurant: "Bún Bò Đất Thánh - Shop Online",
    addressRestaurant: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
    voucher: "Giảm món",
    type: 3,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "e",
    urlImg:
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    nameRestaurant: "Quán Bún Dì Vân",
    addressRestaurant: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
    voucher: "Giảm hết 10%",
    type: 2,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "f",
    urlImg:
      "https://images.foody.vn/res/g69/682061/prof/s280x175/foody-upload-api-foody-mobile-11a-jpg-180816143840.jpg",
    nameRestaurant: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    addressRestaurant: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    voucher: "Mã giảm 15%",
    type: 4,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "g",
    urlImg:
      "https://images.foody.vn/res/g69/682061/prof/s280x175/foody-upload-api-foody-mobile-11a-jpg-180816143840.jpg",
    nameRestaurant: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    addressRestaurant: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    voucher: "Mã giảm 15%",
    type: 3,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "h",
    urlImg:
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    nameRestaurant: "Quán Bún Dì Vân",
    addressRestaurant: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
    voucher: "Giảm hết 10%",
    type: 2,
    minPrice: 20,
    avgPrice: 40,
  },
  {
    id: "i",
    urlImg:
      "https://images.foody.vn/res/g103/1020115/prof/s280x175/foody-upload-api-foody-mobile-hmzz-200421103141.jpg",
    nameRestaurant: "Bún Bò Đất Thánh - Shop Online",
    addressRestaurant: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
    voucher: "Giảm món",
    type: 1,
    minPrice: 20,
    avgPrice: 40,
  },
];

const MAX = 9;

service.getListRestaurant = (type, address, skip) => {
  const listRestaurants = [];
  const listRestaurantPass = seed.filter((restaurant) =>
    restaurant.type === type ? restaurant : null
  );

  for (let i = 0; i < MAX; i++) {
    const randomNumber =
      Math.floor(Math.random() * 100) % listRestaurantPass.length;
    listRestaurants.push(listRestaurantPass[randomNumber]);
  }

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: true,
          message: "success",
          data: { listRestaurants },
        }),
      1500
    );
  });
};

export default service;
