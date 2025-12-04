import * as httpRequest from '~/utils/httpRequest';

export const getRole = async () => {
    try {
        const res = await httpRequest.get('Role');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getRoleById = async (id) => {
    try {
        const res = await httpRequest.get(`Role/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createRole = async (roleName) => {
    try {
        const res = await httpRequest.post('Role', {
            roleName,
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateRole = async (id, roleName) => {
    try {
        const res = await httpRequest.put(`Role/${id}`, {
            roleName,
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteRole = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Role/${id}`);

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
