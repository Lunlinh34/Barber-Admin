import * as httpRequest from "~/utils/httpRequest";

// Tạo thống kê doanh thu tháng
export const generateMonthlyRevenue = async (month, year) => {
  try {
    const res = await httpRequest.post(`RevenueService/generate?month=${month}&year=${year}`);
    // res.data = { message, data } với data là RevenueStatisticDTO
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API Revenue:", error.message);
    throw error;
  }
};

// Alias cũ
export const calculateRevenue = generateMonthlyRevenue;

// Lấy tất cả thống kê doanh thu
export const getAllStatistics = async () => {
  try {
    const res = await httpRequest.get("RevenueService/getall");
    // res.data là danh sách RevenueStatisticDTO
    return res.data.map(stat => {
      // Nếu muốn parse Records từ JSON (trường RecordsJson)
      if (stat.RecordsJson) {
        stat.Records = JSON.parse(stat.RecordsJson);
      }
      return stat;
    });
  } catch (error) {
    console.error("Lỗi khi lấy tất cả thống kê:", error.message);
    throw error;
  }
};

// Xoá thống kê theo ID
export const deleteStatistic = async (id) => {
  try {
    const res = await httpRequest.deleteRequest(`RevenueService/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xoá thống kê:", error.message);
    throw error;
  }
};
