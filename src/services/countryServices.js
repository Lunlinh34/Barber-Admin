import * as httpRequest from '~/utils/httpRequest';

export const getCountry = async () => {
    try {
        const res = await httpRequest.get('Country');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createCountryType = async (typeName) => {
    try {
        const res = await httpRequest.post('Country', {
            tenLoai: typeName,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateCountryType = async (typeId, typeName) => {
    try {
        const res = await httpRequest.put(`Country/${typeId}`, {
            tenLoai: typeName,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteCountryType = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Country/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
