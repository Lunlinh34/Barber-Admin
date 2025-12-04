import * as httpRequest from '~/utils/httpRequest';

export const getEvaluate = async () => {
    try {
        const res = await httpRequest.get('Evaluate');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getEvaluateById = async (id) => {
    try {
        const res = await httpRequest.get(`Evaluate/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createEvaluate = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
    try {
        const res = await httpRequest.post('Evaluate', {
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

export const updateEvaluate = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Evaluate/${id}`, {
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

export const deleteEvaluate = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Evaluate/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
