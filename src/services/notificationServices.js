import * as httpRequest from '~/utils/httpRequest';

export const getNotification = async () => {
    try {
        const res = await httpRequest.get('Notification');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getNotificationById = async (id) => {
    try {
        const res = await httpRequest.get(`Notification/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createNotification = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
    try {
        const res = await httpRequest.post('Notification', {
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

export const updateNotification = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Notification/${id}`, {
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

export const deleteNotification = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Notification/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
