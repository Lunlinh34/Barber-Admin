import * as httpRequest from '~/utils/httpRequest';
export const getProductOrder = async () => {
    try {
        const res = await httpRequest.get('ProductOrder');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getProductOrderById = async (id) => {
    try {
        const res = await httpRequest.get(`ProductOrder/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createProductOrder = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
    try {
        const res = await httpRequest.post('ProductOrder', {
            startDate,
            startTime,
            note,
            customerID,
            storeID,
            serID,
            employeID,
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateProductOrder = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`ProductOrder/${id}`, {
            tenBH: name,
            noiDungBH: content,
            content: video,
            video: video,
            maKH: courseCode,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteProductOrder = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`ProductOrder/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
