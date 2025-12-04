import * as httpRequest from '~/utils/httpRequest';

export const getLocationStore = async () => {
    try {
        const res = await httpRequest.get('LocationStore');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getLocationStoreById = async (id) => {
    try {
        const res = await httpRequest.get(`LocationStore/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createLocationStore = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
    try {
        const res = await httpRequest.post('LocationStore', {
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

export const updateLocationStore = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`LocationStore/${id}`, {
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

export const deleteLocationStore = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`LocationStore/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
