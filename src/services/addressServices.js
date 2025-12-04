import * as httpRequest from '~/utils/httpRequest';

// Lấy tất cả địa chỉ
export const getAddress = async () => {
  try {
    const res = await httpRequest.get('Address');
    return res.data;
  } catch (error) {
    console.error('Error getAddress:', error);
  }
};

// Tạo địa chỉ mới
export const createAddress = async ({ currentAddress, subDistrict, district, cityID, userID }) => {
  try {
    const res = await httpRequest.post('Address', {
      currentAddress,
      subDistrict,
      district,
      cityID,
      userID,
    });
    return res.data;
  } catch (error) {
    console.error('Error createAddress:', error);
  }
};

// Cập nhật địa chỉ
export const updateAddress = async (addressID, { currentAddress, subDistrict, district, cityID, userID }) => {
  try {
    const res = await httpRequest.put(`Address/${addressID}`, {
      currentAddress,
      subDistrict,
      district,
      cityID,
      userID,
    });
    return res.data;
  } catch (error) {
    console.error('Error updateAddress:', error);
  }
};

// Xóa địa chỉ
export const deleteAddress = async (addressID) => {
  try {
    const res = await httpRequest.deleteRequest(`Address/${addressID}`);
    return res.data;
  } catch (error) {
    console.error('Error deleteAddress:', error);
  }
};
