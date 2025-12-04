import * as httpRequest from '~/utils/httpRequest';
export const getServiceManagement = async () => {
    try {
        const res = await httpRequest.get('ServiceManagement');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getServiceManagementById = async (id) => {
    try {
        const res = await httpRequest.get(`ServiceManagement/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createServiceManagement = async (roleName) => {
    try {
        const res = await httpRequest.post('ServiceManagement', {
            roleName,
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateServiceManagement = async (id, roleName) => {
    try {
        const res = await httpRequest.put(`ServiceManagement/${id}`, {
            roleName,
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteServiceManagement = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`ServiceManagement/${id}`);

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
