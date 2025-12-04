import * as httpRequest from '~/utils/httpRequest';
export const getBook = async () => {
    try {
        const res = await httpRequest.get('Booking');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getBookById = async (id) => {
    try {
        const res = await httpRequest.get(`Booking/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createBook = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
    try {
        const res = await httpRequest.post('Booking', {
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
         throw error;
    }
};

export const updateBook = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Booking/${id}`, {
            tenBH: name,
            noiDungBH: content,
            content: video,
            video: video,
            maKH: courseCode,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
         throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Booking/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
