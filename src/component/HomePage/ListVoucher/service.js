const service = {};

const seed = [
  {
    id: "a",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/image-26551456-210329094337.jpeg",
    nameVoucher: "4K Đặt liền bạn nhá",
    quantityApply: "200",
  },
  {
    id: "b",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/image-75403179-210329094151.jpeg",
    nameVoucher: "Thương hiệu linh đình 44K",
    quantityApply: "150",
  },
  {
    id: "c",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/image-e8a70c7e-210331230313.jpeg",
    nameVoucher: "Deal Xịn giảm 70k",
    quantityApply: "160",
  },
  {
    id: "d",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/image-ef1acb82-201020144504.jpeg",
    nameVoucher: "Freeship Xtra + Giảm 50%",
    quantityApply: "180",
  },
  {
    id: "e",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/image-0dd8c2dd-210303213459.jpeg",
    nameVoucher: "Siêu deal Thứ 5 chỉ 1Đ",
    quantityApply: "252",
  },
  {
    id: "f",
    urlImg:
      "https://images.foody.vn/delivery/collection/s320x200/beauty-upload-api-image-200713120910.jpeg",
    nameVoucher: "Món Hàn - Thái - Nhật ngon ",
    quantityApply: "103",
  },
];

const MAX = 9;

service.getListVoucher = async () => {
  const listVoucher = [];
  for (let i = 0; i < MAX; i++) {
    const randomNumber = Math.floor(Math.random() * 100) % seed.length;
    listVoucher.push(seed[randomNumber]);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "success", data: { listVoucher } });
    }, 1500);
  });
};

service.getMoreVoucher = async (skip) => {
  const listVoucher = [];
  for (let i = 0; i < MAX; i++) {
    const randomNumber = Math.floor(Math.random() * 100) % seed.length;
    listVoucher.push(seed[randomNumber]);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "success", data: { listVoucher } });
    }, 1500);
  });
};

export default service;
