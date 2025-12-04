import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export const post = async (path, roleName) => {
    const response = await httpRequest.post(path, roleName);

    return response;
};

export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);

    return response;
};

export const deleteRequest = async (path) => {
    const response = await httpRequest.delete(path);
    return response;
};
export const patch = async (url, data, config = {}) => {
    try {
        const res = await httpRequest.patch(url, data, config); // dùng httpRequest
        return res;
    } catch (error) {
        console.error('❌ HTTP PATCH error:', error.message);
        throw error;
    }
};
export default httpRequest;
