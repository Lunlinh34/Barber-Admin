// // // src/services/serviceCategoryServices.js
// import * as httpRequest from '~/utils/httpRequest';

// // 🟢 Lấy tất cả loại dịch vụ
// export const getServiceCategory = async () => {
//     try {
//         const res = await httpRequest.get('ServiceCategory');
//         return res.data;
//     } catch (error) {
//         console.error('Lỗi khi lấy danh sách loại dịch vụ:', error.message);
//         throw error;
//     }
// };

// // 🟢 Lấy loại dịcaa vụ theo ID
// export const getServiceCategoryById = async (id) => {
//     try {
//         const res = await httpRequest.get(`ServiceCategory/${id}`);
//         return res.data;
//     } catch (error) {
//         console.error('Lỗi khi lấy loại dịch vụ theo ID:', error.message);
//         throw error;
//     }
// };

// // 🟢 Thêm loại dịch vụ mới
// export const createServiceCategory = async (data) => {
//     try {
//         const res = await httpRequest.post('ServiceCategory', {
//             serCateName: data.serCateName,
//             description: data.description,
//             imageUrl: data.imageUrl,
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Lỗi khi thêm loại dịch vụ:', error.message);
//         throw error;
//     }
// };

// // 🟢 Cập nhật loại dịch vụ theo ID
// export const updateServiceCategory = async (id, data) => {
//     try {
//         const res = await httpRequest.put(`ServiceCategory/${id}`, {
//             serCateName: data.serCateName,
//             description: data.description,
//             imageUrl: data.imageUrl,
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Lỗi khi cập nhật loại dịch vụ:', error.message);
//         throw error;
//     }
// };

// // 🟢 Xóa loại dịch vụ theo ID
// export const deleteServiceCategory = async (id) => {
//     try {
//         const res = await httpRequest.deleteRequest(`ServiceCategory/${id}`);
//         return res.data;
//     } catch (error) {
//         console.error('Lỗi khi xóa loại dịch vụ:', error.message);
//         throw error;
//     }
// };
// src/services/serviceCategoryServices.js
import * as httpRequest from '~/utils/httpRequest';

// 🟢 Lấy tất cả loại dịch vụ
export const getServiceCategory = async () => {
    try {
        const res = await httpRequest.get('ServiceCategory');
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách loại dịch vụ:', error.message);
        throw error;
    }
};

// 🟢 Lấy loại dịch vụ theo ID
export const getServiceCategoryById = async (id) => {
    try {
        const res = await httpRequest.get(`ServiceCategory/${id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy loại dịch vụ theo ID:', error.message);
        throw error;
    }
};

// 🟢 Thêm loại dịch vụ mới

export const createServiceCategory = async (data) => {
    try {
        const formData = new FormData();
        formData.append('serCateName', data.serCateName);
        formData.append('description', data.description);
        if (data.imageFile) formData.append('imageFile', data.imageFile);
        if (data.imageUrl) formData.append('imageUrl', data.imageUrl);

        const res = await httpRequest.post('ServiceCategory', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};


// 🟢 Cập nhật loại dịch vụ theo ID

export const updateServiceCategory = async (id, data) => {
    try {
        const formData = new FormData();
        formData.append('serCateName', data.serCateName);
        formData.append('description', data.description);
        if (data.imageFile) formData.append('imageFile', data.imageFile);
        if (data.imageUrl) formData.append('imageUrl', data.imageUrl);

        const res = await httpRequest.put(`ServiceCategory/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

// 🟢 Xóa loại dịch vụ theo ID
export const deleteServiceCategory = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`ServiceCategory/${id}`);
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
