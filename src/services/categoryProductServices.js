import * as httpRequest from '~/utils/httpRequest';

// Lấy danh sách category
export const getCategory = async () => {
    try {
        const res = await httpRequest.get('Category');
        return res.data; // trả về dữ liệu trực tiếp
    } catch (error) {
        console.log('error: ', error.message);
    }
};

// Tạo category mới
export const createCategoryType = async (cateName) => {
    try {
        const res = await httpRequest.post('Category', {
            cateName, // dùng cateName thay cho tenLoai
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

// Cập nhật category
export const updateCategoryType = async (cateID, cateName) => {
    try {
        const res = await httpRequest.put(`Category/${cateID}`, {
            cateName, // dùng cateName thay cho tenLoai
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

// Xóa category
export const deleteCategoryType = async (cateID) => {
    try {
        const res = await httpRequest.deleteRequest(`Category/${cateID}`);
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
