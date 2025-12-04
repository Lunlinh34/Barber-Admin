import * as httpRequest from '~/utils/httpRequest';

// Lấy toàn bộ danh sách giờ làm việc
export const getWorkingHour = async () => {
    try {
        const res = await httpRequest.get('WorkingHour');
        return res.data;
    } catch (error) {
        console.error('Error fetching working hours:', error.message);
    }
};

// Lấy thông tin giờ làm việc theo ID
export const getWorkingHourById = async (id) => {
    try {
        const res = await httpRequest.get(`WorkingHour/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching working hour by ID:', error.message);
    }
};

// Tạo mới giờ làm việc
export const createWorkingHour = async (startTime, endTime) => {
    try {
        const res = await httpRequest.post('WorkingHour', {
            startTime,
            endTime,
        });
        return res.data;
    } catch (error) {
        console.error('Error creating working hour:', error.message);
    }
};

// Cập nhật giờ làm việc
export const updateWorkingHour = async (id, startTime, endTime) => {
    try {
        const res = await httpRequest.put(`WorkingHour/${id}`, {
            startTime,
            endTime,
        });
        return res.data;
    } catch (error) {
        console.error('Error updating working hour:', error.message);
    }
};

// Xóa giờ làm việc
export const deleteWorkingHour = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`WorkingHour/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting working hour:', error.message);
    }
};
