import * as httpRequest from '~/utils/httpRequest';

export const getCity = async () => {
    try {
        const res = await httpRequest.get('City');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createCityType = async (typeName) => {
    try {
        const res = await httpRequest.post('City', {
            tenLoai: typeName,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateCityType = async (typeId, typeName) => {
    try {
        const res = await httpRequest.put(`City/${typeId}`, {
            tenLoai: typeName,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteCityType = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`City/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
