    import * as httpRequest from '~/utils/httpRequest';
    export const getOrder = async () => {
        try {
            const res = await httpRequest.get('Order');
            return res.data;
        } catch (error) {
            console.log('error: ', error.message);
        }
    };
   export const updateOrderStatus = async (id, status) => {
    try {
        const res = await httpRequest.patch(
            `Order/${id}/status`,
            JSON.stringify(status),
            { headers: { 'Content-Type': 'application/json' } }
        );
        return res.data;
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật trạng thái đơn hàng:', error.message);
        throw error;
    }
};
    export const getOrderById = async (id) => {
        try {
            const res = await httpRequest.get(`Order/${id}`, {
                params: {},
            });
            return res.data;
        } catch (error) {
            console.log('error: ', error.message);
        }
    };

    export const createOrder = async (startDate, startTime, note, customerID, storeID, serID, employeID) => {
        try {
            const res = await httpRequest.post('Order', {
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

    export const updateOrder = async (id, name, content, video, courseCode) => {
        try {
            const res = await httpRequest.put(`Order/${id}`, {
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

    export const deleteOrder = async (id) => {
        try {
            const res = await httpRequest.deleteRequest(`Order/${id}`);
            return res;
        } catch (error) {
            console.log('error: ', error.message);
        }
    };
