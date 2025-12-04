import * as httpRequest from '~/utils/httpRequest';

export const getPayment = async () => {
    try {
        const res = await httpRequest.get('Payment');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createPaymentType = async (typeName) => {
    try {
        const res = await httpRequest.post('Payment', {
            tenLoai: typeName,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updatePaymentType = async (typeId, typeName) => {
    try {
        const res = await httpRequest.put(`Payment/${typeId}`, {
            tenLoai: typeName,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deletePaymentType = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Payment/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
