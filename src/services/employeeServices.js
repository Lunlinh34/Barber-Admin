import * as httpRequest from '~/utils/httpRequest';
export const getEmployee = async () => {
    try {
        const res = await httpRequest.get('Employee');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getEmployeeById = async (id) => {
    try {
        const res = await httpRequest.get(`Employee/${id}`, {
            params: {},
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createEmployee = async (employee) => {
    // Kiểm tra addressID hợp lệ trước khi gửi request
    if (!employee.addressID || employee.addressID === 0) {
        console.error('Vui lòng chọn địa chỉ hợp lệ trước khi tạo nhân viên!');
        return null;
    }

    try {
        const res = await httpRequest.post('Employee', {
            firstName: employee.firstName,
            lastName: employee.lastName,
            picture: employee.picture,
            email: employee.email,
            numberphone: employee.numberphone,
            dateOfBirth: employee.dateOfBirth,
            wordDay: employee.wordDay,
            userID: employee.userID,
            storeID: employee.storeID,
            addressID: employee.addressID
        });
        return res.data;
    } catch (error) {
        console.log('Error creating employee:', error.response?.data || error.message);
        return null;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Employee/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
