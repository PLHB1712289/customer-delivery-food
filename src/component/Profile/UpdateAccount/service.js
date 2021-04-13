const service = {};

let profile = {
    fullName: "Trần Tử Văn",
    address: "39/31A Bùi văn Ba, Tân Thuận Đông",
    city: 0,
    district: 6,
    avatarUrl: "https://i.pravatar.cc/100",
    gender: 0,
    email: "vangol2013@gmail.com",
    password: "***************",
    phoneNumber: "0835484878"
};


service.getProfile = async () => {
  const fullName = profile.fullName;
  const address = profile.address;
  const city = profile.city;
  const district = profile.district;
  const avatarUrl = profile.avatarUrl;
  const gender = profile.gender;
  const email = profile.email;
  const password = profile.password;
  const phoneNumber = profile.phoneNumber;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 0,
        message: "success",
        data: { fullName, address, city, district, avatarUrl, gender, email, password, phoneNumber },
      });
    }, 1500);
  });
};

service.updateProfile = async (props) => {
    const { fullName, address, city, district, avatarUrl, gender, email, password, phoneNumber } = props;

    profile.fullName = fullName;
    profile.address = address;
    profile.city = city;
    profile.district = district;
    profile.avatarUrl = avatarUrl;
    profile.email = email;
    profile.gender = gender;
    profile.phoneNumber = phoneNumber;
    profile.password = password;
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 0,
          message: "success",
          data: { },
        });
      }, 1500);
    });
  };
  



export default service;
