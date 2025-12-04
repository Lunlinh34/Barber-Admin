import * as httpRequest from '~/utils/httpRequest';

const REVENUE_API = 'RevenueStatistic';

/**
 * Lấy tất cả thống kê
 */
export const getAllStatistics = async () => {
    try {
        const res = await httpRequest.get(`${REVENUE_API}/getall`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

/**
 * Tạo thống kê doanh thu cho tháng hiện tại
 */
export const generateMonthlyRevenue = async () => {
    try {
        const res = await httpRequest.post(`${REVENUE_API}/generate`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

/**
 * Xoá thống kê theo ID
 */
export const deleteStatistic = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`${REVENUE_API}/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};
