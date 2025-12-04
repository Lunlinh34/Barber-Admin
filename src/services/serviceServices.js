import * as httpRequest from '~/utils/httpRequest';

// 🔹 Lấy tất cả dịch vụ
export const getService = async () => {
  try {
    const res = await httpRequest.get('Service');
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};

// 🔹 Lấy dịch vụ theo ID
export const getServiceById = async (id) => {
  try {
    const res = await httpRequest.get(`Service/${id}`);
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};

// 🔹 Tạo mới dịch vụ
export const createService = async (name, description, price, categoryId, imageUrl) => {
  try {
    const res = await httpRequest.post('Service', {
      serName: name,
      serDescription: description,
      serPrice: price,
      serCateID: categoryId,
      imageUrl: imageUrl,
    });
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};

// 🔹 Cập nhật dịch vụ
export const updateService = async (id, name, description, price, categoryId, imageUrl) => {
  try {
    const res = await httpRequest.put(`Service/${id}`, {
      serID: id,
      serName: name,
      serDescription: description,
      serPrice: price,
      serCateID: categoryId,
      imageUrl: imageUrl,
    });
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};

// 🔹 Xoá dịch vụ
export const deleteService = async (id) => {
  try {
    const res = await httpRequest.deleteRequest(`Service/${id}`);
    return res.data;
  } catch (error) {
    console.log('error: ', error.message);
  }
};
