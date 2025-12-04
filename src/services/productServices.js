import * as httpRequest from '~/utils/httpRequest';

export const getProduct = async () => {
    try {
        const res = await httpRequest.get('Product');
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const getProductById = async (id) => {
    try {
        const res = await httpRequest.get(`Product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const createProduct = async (
    proName,
    proImage,
    price,
    quantity,
    proDescription,
    producerID,
    warehouseID,
    cateID,
) => {
    try {
        const res = await httpRequest.post('Product', {
            proName,
            proImage,
            price,
            quantity,
            proDescription,
            producerID,
            warehouseID,
            cateID,
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
};

export const updateProduct = async (
    proID,
    proName,
    proImage,
    price,
    quantity,
    proDescription,
    producerID,
    warehouseID,
    cateID,
) => {
    try {
        const res = await httpRequest.put(`Product/${proID}`, {
            proName,
            proImage,
            price,
            quantity,
            proDescription,
            producerID,
            warehouseID,
            cateID,
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Product/${id}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
};
