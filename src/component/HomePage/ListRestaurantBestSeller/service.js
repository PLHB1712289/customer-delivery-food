const service = {};

const seed = [
  {
    id: "a",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
    nameRestaurant: "Quán Ăn Tisu - Nui & Mì Xào Bò - Shop Online",
    addressRestaurant: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    voucher: "Mã giảm 10%",
  },
  {
    id: "b",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
    nameRestaurant: "Món Quảng Xuyên Việt",
    addressRestaurant: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
    voucher: "Giảm hết 30%",
  },
  {
    id: "c",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
    nameRestaurant: "Sunny House - Sinh Tố & Nước Ép",
    addressRestaurant: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
    voucher: "Mã giảm 50%",
  },
  {
    id: "d",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g103/1020115/prof/s280x175/foody-upload-api-foody-mobile-hmzz-200421103141.jpg",
    nameRestaurant: "Bún Bò Đất Thánh - Shop Online",
    addressRestaurant: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
    voucher: "Giảm món",
  },
  {
    id: "e",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    nameRestaurant: "Quán Bún Dì Vân",
    addressRestaurant: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
    voucher: "Giảm hết 10%",
  },
  {
    id: "f",
    isOpen: Math.floor(Math.random() * 10) % 2 === 0 ? true : false,
    urlImg:
      "https://images.foody.vn/res/g69/682061/prof/s280x175/foody-upload-api-foody-mobile-11a-jpg-180816143840.jpg",
    nameRestaurant: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    addressRestaurant: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    voucher: "Mã giảm 15%",
  },
];

const MAX = 9;

service.getListRestaurantBestSeller = async () => {
  const listRestaurant = [];
  for (let i = 0; i < MAX; i++) {
    const randomNumber = Math.floor(Math.random() * 100) % seed.length;
    listRestaurant.push(seed[randomNumber]);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "success", data: { listRestaurant } });
    }, 1500);
  });
};

service.getMoreRestaurant = async (skip) => {
  const listRestaurant = [];
  for (let i = 0; i < MAX; i++) {
    const randomNumber = Math.floor(Math.random() * 100) % seed.length;
    listRestaurant.push(seed[randomNumber]);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "success", data: { listRestaurant } });
    }, 1500);
  });
};

export default service;
