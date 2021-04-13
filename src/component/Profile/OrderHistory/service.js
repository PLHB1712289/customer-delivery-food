import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import ArrayUtils from "../../../utils/ArrayUtils";

const service = {};

const seed = [
  {
    id: "Acode-hh:mm",
    time: "2021-04-14",
    address: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    money: 180400,
    status: 2,
  },
  {
    id: "Bcode-hh:mm",
    time: "2021-03-14",
    address: "39/10/11 Hoàng Bật Đạt, P. 15, Tân Bình, TP. HCM",
    money: 91000,
    status: 1,
  },
  {
    id: "Ccode-hh:mm",
    time: "2021-03-21",
    address: "499/24 Quang Trung, P. 10, Gò Vấp, TP. HCM",
    money: 50000,
    status: 1,
  },
  {
    id: "Dcode-hh:mm",
    time: "2021-03-31",
    address: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    money: 73000,
    status: 1,
  },
  {
    id: "Ecode-hh:mm",
    time: "2021-04-1",
    address: "66/32 Trần Văn Quang, P. 10, Tân Bình, TP. HCM",
    money: 45000,
    status: 1,
  },
  {
    id: "Fcode-hh:mm",
    time: "2021-04-10",
    address: "25/2 Lý Tuệ, P. Tân Quý, Tân Phú, TP. HCM",
    money: 79000,
    status: 3,
  },
  {
    id: "Gcode-hh:mm",
    time: "2021-04-09",
    address: "213D Nguyễn Văn Cừ, P. 3, Quận 5, TP. HCM",
    money: 180400,
    status: 1,
  },
  {
    id: "Hcode-hh:mm",
    time: "2021-04-02",
    address: "435/47/27 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    money: 33000,
    status: 1,
  },
  {
    id: "Icode-hh:mm",
    time: "2021-04-04",
    address: "391, 16/7B Huỳnh Tấn Phát, P.Tân Thuận Đông, Quận 7, TP. HCM",
    money: 44000,
    status: 1,
  },
  {
    id: "Jcode-hh:mm",
    time: "2021-04-04",
    address: "391/16/7B Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    money: 51000,
    status: 3,
  },
  {
    id: "Kcode-hh:mm",
    time: "2021-03-30",
    address: "341 Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7, TP. HCM",
    money: 180400,
    status: 3,
  },
  {
    id: "Lcode-hh:mm",
    time: "2021-04-08",
    address: "12 Đường Số 10, KDC Nam Long, P. Tân Thuận Đông, Quận 7, TP. HCM",
    money: 180400,
    status: 1,
  },
];

const ITEM_PER_PAGE = 9;

service.getListorder = async (page, status, fDay, tDay) => {
  var result = [];
  if (parseInt(status) !== 0) {
    for (var i = 0; i < seed.length; i++) {
      if (seed[i].status === parseInt(status)) {
        result.push(seed[i]);
      }
    }
  } else {
    result = ArrayUtils.cloneArray(seed);
  }

  if (fDay !== null) {
    const fTime = new Date(fDay).getTime();
    for (var i = 0; i < result.length; i++) {
      var time = new Date(result[i].time).getTime();
      if (parseInt(time) < parseInt(fTime)) {
        console.log("aaa");
        result = ArrayUtils.customSplit(result, i, 1);
        i--;
      }
    }
  }

  if (tDay !== null) {
    const tTime = new Date(tDay).getTime();
    for (var i = 0; i < result.length; i++) {
      var time = new Date(result[i].time).getTime();
      if (parseInt(time) > parseInt(tTime)) {
        result = ArrayUtils.customSplit(result, i, 1);
        i--;
      }
    }
  }

  var startIndex = (page - 1) * ITEM_PER_PAGE;
  var endIndex =
    startIndex + ITEM_PER_PAGE < result.length
      ? startIndex + ITEM_PER_PAGE
      : result.length;

  var listOrder = [];
  for (var i = startIndex; i < endIndex; i++) {
    listOrder.push(result[i]);
  }

  const countItem = result.length;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 0,
        message: "success",
        data: { listOrder, countItem },
      });
    }, 1500);
  });
};

export default service;
