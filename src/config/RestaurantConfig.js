const RestaurantConfig = {};

RestaurantConfig.COUNT_PER_PAGE = 20;
RestaurantConfig.DISPLAY_RANGE_PAGE = 10;

RestaurantConfig.FILTER = {
  0: "All",
  1: "Near me",
  2: "Best seller",
  3: "Top rated",
  4: "Most discount"
};

RestaurantConfig.CITY = [
  { id: 79, name: "TP. HCM" },
  { id: 1, name: "Hà Nội" },
];

RestaurantConfig.AREA = [
  [
    { id: 760, name: "Quận 1" },
    { id: 769, name: "Quận 2" },
    { id: 770, name: "Quận 3" },
    { id: 773, name: "Quận 4" },
    { id: 774, name: "Quận 5" },
    { id: 775, name: "Quận 6" },
    { id: 778, name: "Quận 7" },
    { id: 776, name: "Quận 8" },
    { id: 763, name: "Quận 9" },
    { id: 771, name: "Quận 10" },
    { id: 772, name: "Quận 11" },
    { id: 761, name: "Quận 12" },
    { id: 768, name: "Phú Nhuận" },
    { id: 765, name: "Bình Thạnh" },
    { id: 766, name: "Tân Bình" },
    { id: 777, name: "Bình Tân" },
    { id: 767, name: "Tân Phú" },
    { id: 762, name: "Thủ Đức" },
    { id: 783, name: "Củ Chi" },
    { id: 784, name: "Hóc Môn" },
    { id: 785, name: "Bình Chánh" },
    { id: 787, name: "Cần Giờ" },
    { id: 786, name: "Nhà Bè" },
    { id: 764, name: "Gò Vấp" },
  ],
  [
    { id: 1, name: "Ba Đình" },
    { id: 5, name: "Cầu Giấy" },
    { id: 6, name: "Đống Đa" },
    { id: 268, name: "Hà Đông" },
    { id: 7, name: "Hai Bà Trưng" },
    { id: 2, name: "Hoàn Kiếm" },
    { id: 8, name: "Hoàng Mai" },
    { id: 4, name: "Long Biên" },
    { id: 3, name: "Tây Hồ" },
    { id: 9, name: "Thanh Xuân" },
    { id: 18, name: "Gia Lâm" },
    { id: 274, name: "Hoài Đức" },
    { id: 20, name: "Thanh Trì" },
    { id: 279, name: "Thường Tín" },
    { id: 21, name: "Bắc Tử Liêm" },
    { id: 19, name: "Nam Tử Liêm" },
  ],
];

RestaurantConfig.FILTER_TYPE = {
  0: "Quán ăn",
  1: "Quán uống",
  2: "Ăn vặt",
  3: "Món chay",
  4: "Món lẩu",
  5: "Pizza/ Burger",
  6: "Món gà",
};

export default RestaurantConfig;
