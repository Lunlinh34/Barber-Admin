// storeRequestServices.js
import * as httpRequest from '~/utils/httpRequest';

// 🔹 Lấy tất cả StoreRequests
export const getAllStoreRequests = async () => {
  try {
    const res = await httpRequest.get('StoreRequest');
    return res.data;
  } catch (error) {
    console.error('Lỗi getAllStoreRequests:', error.message);
    return null;
  }
};

// 🔹 Lấy StoreRequest theo ID
export const getStoreRequestById = async (id) => {
  try {
    const res = await httpRequest.get(`StoreRequest/${id}`);
    return res.data;
  } catch (error) {
    console.error('Lỗi getStoreRequestById:', error.message);
    return null;
  }
};

// 🔹 Chỉ update status (dùng cho admin)
export const updateStoreRequestStatus = async (id, status) => {
  try {
    // Lấy thông tin hiện tại
    const current = await getStoreRequestById(id);
    if (!current) throw new Error('StoreRequest không tồn tại!');

    // Gửi tất cả trường nhưng chỉ thay đổi status
    const payload = {
      WorkingHourID: current.workingHourID,
      WarehouseID: current.warehouseID,
      AddressID: current.addressID,
      StoreID: current.storeID,
      UserID: current.userID,
      Status: status,
    };

    const res = await httpRequest.put(`StoreRequest/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('Lỗi updateStoreRequestStatus:', error.message);
    return null;
  }
};

// 🔹 Xoá StoreRequest
export const deleteStoreRequest = async (id) => {
  try {
    const res = await httpRequest.deleteRequest(`StoreRequest/${id}`);
    return res.data;
  } catch (error) {
    console.error('Lỗi deleteStoreRequest:', error.message);
    return null;
  }
};
