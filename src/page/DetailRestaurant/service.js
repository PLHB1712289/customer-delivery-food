const service = {};

const seed = [
  {
    id: "baboabsaos",
    thumbnail:
      "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
    location: "TP.HCM >> Bún Thịt nướng chú ba",
    name: "Bún thịt nướng chú ba",
    address: "126 Lê Văn Sỹ, P.10, Quận Phú Nhuận, TP.HCM",
    totalRating: "100+",
    rating: 1,
    timeOpenRestaurant: "09:00-21:00",
    priceAvg: "30.000-200.000 VNĐ",
    listFood: [
      {
        lable: "Cơm",
        value: "rice",
        listFood: [
          {
            _id: "123",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún bò viên",
            price: 45000,
          },
          {
            _id: "124",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún bò tái",
            price: 45000,
          },
          {
            _id: "125",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Phở tái nạm",
            price: 45000,
          },
        ],
      },
      {
        lable: "Món thêm",
        value: "subfood",
        listFood: [
          {
            _id: "126",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún thêm",
            price: 10000,
          },
          {
            _id: "127",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bánh thêm",
            price: 10000,
          },
        ],
      },
    ],
  },

  {
    id: "lylyasasa",
    thumbnail:
      "https://images.foody.vn/res/g90/891560/prof/s640x400/foody-upload-api-foody-mobile-12-190313173026.jpg",
    location: "TP.HCM >> Bánh Canh Chả Cá - Đặc Sản Phan Rang",
    name: "Bánh Canh Chả Cá - Đặc Sản Phan Rang",
    address: "326 Tôn Đản, P. 4, Quận 4, TP. HCM",
    totalRating: "500+",
    rating: 4.5,
    timeOpenRestaurant: "08:00-23:00",
    priceAvg: "28,000 - 68,000 VNĐ",
    listFood: [
      {
        lable: "Cơm",
        value: "rice",
        listFood: [
          {
            _id: "123",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún bò viên",
            price: 45000,
          },
          {
            _id: "124",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún bò tái",
            price: 45000,
          },
          {
            _id: "125",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Phở tái nạm",
            price: 45000,
          },
        ],
      },
      {
        lable: "Món thêm",
        value: "subfood",
        listFood: [
          {
            _id: "126",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bún thêm",
            price: 10000,
          },
          {
            _id: "127",
            thumbnail:
              "https://images.foody.vn/res/g32/317044/prof/s640x400/foody-mobile-phomui-jpg-691-636219719791166170.jpg",
            name: "Bánh thêm",
            price: 10000,
          },
        ],
      },
    ],
  },
];

service.getRestaurant = (id) => {
  const randomNumber = Math.floor(Math.random() * 100) % seed.length;

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: true,
          message: "success",
          data: seed[randomNumber],
        }),
      1500
    );
  });
};

export default service;
