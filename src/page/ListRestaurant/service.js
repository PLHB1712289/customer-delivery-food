import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import ArrayUtils from "../../utils/ArrayUtils";

const service = {};

const seed = [
  {
    id: 1,
    urlImg:
      "https://images.foody.vn/res/g92/911715/prof/s280x175/foody-upload-api-foody-mobile-32-190508144839.jpg",
    nameRestaurant: "Quán Ăn Tisu - Nui & Mì Xào Bò - Shop Online",
    addressRestaurant: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    voucher: "Mã giảm 10%",
    isOpening: 0,
    city: 0,
    area: 16,
    type: [0],
  },
  {
    id: 2,
    urlImg:
      "https://images.foody.vn/res/g100/991138/prof/s280x175/foody-upload-api-foody-mobile-hmzz-191218121126.jpg",
    nameRestaurant: "Món Quảng Xuyên Việt",
    addressRestaurant: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
    voucher: "Giảm hết 30%",
    isOpening: 1,
    city: 0,
    area: 14,
    type: [0],
  },
  {
    id: 3,
    urlImg:
      "https://images.foody.vn/res/g103/1022397/prof/s280x175/foody-upload-api-foody-mobile-9a-200525142151.jpg",
    nameRestaurant: "Sunny House - Sinh Tố & Nước Ép",
    addressRestaurant: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
    voucher: "Mã giảm 50%",
    isOpening: 1,
    city: 0,
    area: 23,
    type: [1],
  },
  {
    id: 4,
    urlImg:
      "https://images.foody.vn/res/g103/1020115/prof/s280x175/foody-upload-api-foody-mobile-hmzz-200421103141.jpg",
    nameRestaurant: "Bún Bò Đất Thánh - Shop Online",
    addressRestaurant: "221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM",
    voucher: "Giảm món",
    isOpening: 0,
    city: 0,
    area: 14,
    type: [0],
  },
  {
    id: 5,
    urlImg:
      "https://images.foody.vn/res/g102/1018583/prof/s280x175/foody-upload-api-foody-mobile-hmb-200410113701.jpg",
    nameRestaurant: "Quán Bún Dì Vân",
    addressRestaurant: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
    voucher: "Giảm hết 10%",
    isOpening: 2,
    city: 0,
    area: 14,
    type: [0],
  },
  {
    id: 6,
    urlImg:
      "https://images.foody.vn/res/g69/682061/prof/s280x175/foody-upload-api-foody-mobile-11a-jpg-180816143840.jpg",
    nameRestaurant: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    addressRestaurant: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 2,
    city: 0,
    area: 4,
    type: [1],
  },
  {
    id: 7,
    urlImg:
      "https://images.foody.vn/res/g93/924956/prof/s640x400/image-dd6ce971-200910114154.jpeg",
    nameRestaurant: "Cơm Gà Ghiền - Shop Online",
    addressRestaurant:
      "435/47/27 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 8,
    urlImg:
      "https://images.foody.vn/res/g106/1056173/prof/s640x400/file_restaurant_photo_kf0n_16076-60ea14b8-201211072743.jpeg",
    nameRestaurant: "Hot Boy - Bánh Mì & Chân Gà Ngâm Sả Tắc",
    addressRestaurant:
      "435/53/15 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [2],
  },
  {
    id: 9,
    urlImg:
      "https://images.foody.vn/res/g103/1024998/prof/s640x400/foody-upload-api-foody-mobile-sinh-to-200522101823.jpg",
    nameRestaurant: "Cô Thúy - Sinh Tố, Nước Ép & Trái Cây Tươi",
    addressRestaurant:
      "391, 16/7B Huỳnh Tấn Phát, P.Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 10,
    urlImg:
      "https://images.foody.vn/res/g106/1059421/prof/s640x400/foody-upload-api-foody-mobile-63-201210163318.jpg",
    nameRestaurant: "Cô Thụy - Cơm, Bánh Mì Hấp & Bún Bò Xào - Shop Online",
    addressRestaurant:
      "391/16/7B Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [0],
  },
  {
    id: 11,
    urlImg:
      "https://images.foody.vn/res/g103/1020920/prof/s640x400/foody-upload-api-foody-mobile-16-200924174738.jpg",
    nameRestaurant: "Quán Bếp Trưởng - Bánh Canh Cua",
    addressRestaurant: "341 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [0],
  },
  {
    id: 12,
    urlImg:
      "https://images.foody.vn/res/g78/771375/prof/s640x400/foody-upload-api-foody-mobile-62-jpg-180827094543.jpg",
    nameRestaurant: "Juro Tea House",
    addressRestaurant:
      "12 Đường Số 10, KDC Nam Long, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 13,
    urlImg:
      "https://images.foody.vn/res/g104/1031006/prof/s640x400/foody-upload-api-foody-mobile-chi-em-dam-dang-hay-200619174347.jpg",
    nameRestaurant: "Trà Sữa Rainbow - 427 Huỳnh Tấn Phát",
    addressRestaurant: "427 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 2,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 14,
    urlImg:
      "https://images.foody.vn/res/g105/1046687/prof/s640x400/foody-upload-api-foody-mobile-ba-bau-an-ca-vien-ch-200914170248.jpg",
    nameRestaurant: "Ăn Vặt Cu Bi",
    addressRestaurant:
      "17/13B Khu Phố 1, Tân Thuận Tây, P. Bình Thuận, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 2,
    city: 0,
    area: 6,
    type: [2],
  },
  {
    id: 15,
    urlImg:
      "https://images.foody.vn/res/g104/1030382/prof/s640x400/foody-upload-api-foody-mobile-mon-com-ga-ta-tam-ky-200617150020.jpg",
    nameRestaurant: "Cát Vũ - Gà Ta Tam Kỳ",
    addressRestaurant: "444 Huỳnh Tấn Phát, P. Bình Thuận, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [6],
  },
  {
    id: 16,
    urlImg:
      "https://images.foody.vn/res/g105/1041994/prof/s640x400/foody-upload-api-foody-mobile-2-200915171555.jpg",
    nameRestaurant: "2D Café",
    addressRestaurant: "28 Trần Trọng Cung, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 17,
    urlImg:
      "https://images.foody.vn/res/g94/938461/prof/s640x400/foody-upload-api-foody-mobile-uiop-190711160948.jpg",
    nameRestaurant: "Cháo Mẹ Nấu - Huỳnh Tấn Phát",
    addressRestaurant:
      "509A Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [0],
  },
  {
    id: 18,
    urlImg:
      "https://images.foody.vn/res/g69/682061/prof/s280x175/foody-upload-api-foody-mobile-11a-jpg-180816143840.jpg",
    nameRestaurant: "Rules Of Tea - Trà Sữa Đế Vương - Nguyễn Văn Cừ",
    addressRestaurant: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 19,
    urlImg:
      "https://images.foody.vn/res/g107/1064749/prof/s640x400/file_restaurant_photo_hgta_16118-496fe0a7-210129125610.jpeg",
    nameRestaurant: "Koj Thé Coffee - Trà Sữa, Trà Đào & Xiên Que",
    addressRestaurant: "10 Trần Trọng Cung, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 20,
    urlImg:
      "https://images.foody.vn/res/g14/136747/prof/s640x400/foody-mobile-foody-milano-nam-lon-596-635676251713738146.jpg",
    nameRestaurant: "Milano Nam Long - Trần Trọng Cung",
    addressRestaurant: "23 Trần Trọng Cung, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 21,
    urlImg:
      "https://images.foody.vn/res/g90/894700/prof/s640x400/foody-upload-api-foody-mobile-hml-190315113930.jpg",
    nameRestaurant: "Gà Ta Thủy Trinh - Lý Phục Man",
    addressRestaurant: "2 Lý Phục Man, P. Bình Thuận, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [6],
  },
  {
    id: 22,
    urlImg:
      "https://images.foody.vn/res/g106/1053522/prof/s640x400/file_restaurant_photo_eqpr_16060-552084a2-201122120432.jpeg",
    nameRestaurant: "Trà Sữa Gin's",
    addressRestaurant: "486 Huỳnh Tấn Phát, P. Bình Thuận, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [1],
  },
  {
    id: 23,
    urlImg:
      "https://images.foody.vn/res/g103/1022964/prof/s640x400/file_restaurant_photo_8tui_16065-c013730f-201128134024.jpg",
    nameRestaurant: "Chú Cao - Gà Nướng Muối Ớt & Cá Lóc Nướng",
    addressRestaurant: "2 Lý Phục Man, P. Bình Thuận, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 2,
    city: 0,
    area: 6,
    type: [6],
  },
  {
    id: 24,
    urlImg:
      "https://images.foody.vn/res/g96/953772/prof/s640x400/foody-upload-api-foody-mobile-iiiiii-190906094020.jpg",
    nameRestaurant: "Cơm Chiên Dương Châu - Tân Thuận Tây",
    addressRestaurant:
      "38 Đường D7, Khu Dân Cư Tân Thuận Tây, P. Tân Thuận Tây, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 1,
    city: 0,
    area: 6,
    type: [0],
  },
  {
    id: 25,
    urlImg:
      "https://images.foody.vn/res/g106/1058390/prof/s640x400/foody-upload-api-foody-mobile-11-201204094028.jpg",
    nameRestaurant: "MaMi - Mì Ý & Xíu Mại Trứng Muối - Shop Online",
    addressRestaurant:
      "Chung Cư An Khang, Đường Số 3, P. Tân Thuận Đông, Quận 7, TP. HCM",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 0,
    area: 6,
    type: [0],
  },
  {
    id: 26,
    urlImg:
      "https://images.foody.vn/res/g102/1014457/prof/s640x400/image-e684e378-200908105300.jpeg",
    nameRestaurant: "Hoàng Huệ - Cơm Rang & Bún Bò Trộn - Triều Khúc 14",
    addressRestaurant:
      "14 Ngõ 66A Triều Khúc, P. Tân Triều, Thanh Xuân, Hà Nội",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 1,
    area: 10,
    type: [0],
  },
  {
    id: 27,
    urlImg:
      "https://images.foody.vn/res/g100/993044/prof/s640x400/image-b046e112-210118135546.jpeg",
    nameRestaurant: "Master Tea 美茶 - Yên Lãng",
    addressRestaurant: "23 Ngõ 82 Yên Lãng, Đống Đa, Hà Nội",
    voucher: "Mã giảm 15%",
    isOpening: 0,
    city: 1,
    area: 3,
    type: [0],
  },
];

const ITEM_PER_PAGE = 20;

service.getListRestaurant = async (page, city, filterArea, filterType) => {
  let listRestaurant = [];
  let countItem = seed.length;
  // get all
  if (filterArea.length === 0 && filterType.length === 0) {
    let seed_city = [];
    for (var i = 0; i < seed.length; i++) {
      if (seed[i].city === city) {
        seed_city.push(seed[i]);
      }
    }

    var startIndex = (page - 1) * ITEM_PER_PAGE;
    var endIndex =
      startIndex + ITEM_PER_PAGE < seed_city.length
        ? startIndex + ITEM_PER_PAGE
        : seed_city.length;

    countItem = seed_city.length;
    for (var i = startIndex; i < endIndex; i++) {
      listRestaurant.push(seed_city[i]);
    }
  } else {
    let seed_city = [];
    for (var i = 0; i < seed.length; i++) {
      if (seed[i].city === city) {
        seed_city.push(seed[i]);
      }
    }

    let temp = [];
    // get filter area
    if (filterArea.length === 0) {
      temp = seed_city;
    } else {
      for (var i = 0; i < seed_city.length; i++) {
        if (ArrayUtils.isInArray(seed_city[i].area, filterArea) === true) {
          temp.push(seed_city[i]);
        }
      }
    }

    // get filter type
    if (filterType.length === 0) {
      listRestaurant = temp;
    } else {
      for (var i = 0; i < temp.length; i++) {
        if (ArrayUtils.isHaveCommonElement(temp[i].type, filterType)) {
          listRestaurant.push(temp[i]);
        } else {
        }
      }
    }

    // pagination
    var result = [];
    countItem = listRestaurant.length;
    var startIndex = (page - 1) * ITEM_PER_PAGE;
    var endIndex =
      startIndex + ITEM_PER_PAGE < listRestaurant.length
        ? startIndex + ITEM_PER_PAGE
        : listRestaurant.length;
    for (var i = startIndex; i < endIndex; i++) {
      result.push(listRestaurant[i]);
    }

    listRestaurant = result;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "success",
        data: { listRestaurant, countItem },
      });
    }, 1500);
  });
};

export default service;
