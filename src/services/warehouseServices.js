import * as httpRequest from '~/utils/httpRequest';

// Lấy toàn bộ danh sách kho
export const getWarehouse = async () => {
    try {
        const res = await httpRequest.get('Warehouse');
        return res.data;
    } catch (error) {
        console.error('Error fetching warehouses:', error.message);
    }
};

// Lấy thông tin kho theo ID
export const getWarehouseById = async (id) => {
    try {
        const res = await httpRequest.get(`Warehouse/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching warehouse by ID:', error.message);
    }
};

// Tạo mới kho
export const createWarehouse = async (warehouseName, totalAsset, capacity, addressID, storeID) => {
    try {
        const res = await httpRequest.post('Warehouse', {
            warehouseName,
            totalAsset,
            capacity,
            addressID,
            storeID,
        });
        return res.data;
    } catch (error) {
        console.error('Error creating warehouse:', error.message);
    }
};

// Cập nhật kho
export const updateWarehouse = async (id, warehouseName, totalAsset, capacity, addressID, storeID) => {
    try {
        const res = await httpRequest.put(`Warehouse/${id}`, {
            warehouseName,
            totalAsset,
            capacity,
            addressID,
            storeID,
        });
        return res.data;
    } catch (error) {
        console.error('Error updating warehouse:', error.message);
    }
};

// Xoá kho
export const deleteWarehouse = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Warehouse/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting warehouse:', error.message);
    }
};
