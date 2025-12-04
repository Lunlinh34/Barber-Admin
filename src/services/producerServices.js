import * as httpRequest from '~/utils/httpRequest';

// Lấy danh sách tất cả nhà cung cấp
export const getProducer = async () => {
  try {
    const res = await httpRequest.get('Producer');
    return res.data;
  } catch (error) {
    console.error('Error getProducer:', error);
  }
};

// Lấy nhà cung cấp theo ID
export const getProducerById = async (id) => {
  try {
    const res = await httpRequest.get(`Producer/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error getProducerById:', error);
  }
};

// Tạo nhà cung cấp mới
export const createProducer = async (producerName, numberphone, addressID) => {
  try {
    const res = await httpRequest.post('Producer', {
      producerName,
      numberphone,
      addressID,
    });
    return res.data;
  } catch (error) {
    console.error('Error createProducer:', error);
  }
};

// Cập nhật nhà cung cấp
export const updateProducer = async (producerID, producerName, numberphone, addressID) => {
  try {
    const res = await httpRequest.put(`Producer/${producerID}`, {
      producerName,
      numberphone,
      addressID,
    });
    return res.data;
  } catch (error) {
    console.error('Error updateProducer:', error);
  }
};

// Xóa nhà cung cấp
export const deleteProducer = async (producerID) => {
  try {
    const res = await httpRequest.deleteRequest(`Producer/${producerID}`);
    return res.data;
  } catch (error) {
    console.error('Error deleteProducer:', error);
  }
};
