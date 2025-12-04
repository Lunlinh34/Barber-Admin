// // src/Pages/BookingOrderStatisticPage.js
// import React, { useEffect, useState } from "react";
// import { getBook } from "~/services/bookServices";
// import { getOrder } from "~/services/orderServices";
// import { getServiceById } from "~/services/serviceServices";
// import { getProductOrder } from "~/services/productOrderServices"; // lấy tất cả ProductOrder
// import { getProductById } from "~/services/productServices"; // lấy thông tin Product

// const BookingOrderStatisticPage = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const bookings = await getBook(); 
//       const orders = await getOrder(); 
//       const productOrders = await getProductOrder(); // tất cả ProductOrder

//       // Xử lý dữ liệu lịch đặt
//       const bookingData = await Promise.all(
//         bookings.map(async (booking, index) => {
//           let servicePrice = 0;
//           let serviceName = "Dịch vụ không xác định";
//           try {
//             const res = await getServiceById(booking.serID);
//             const service = res.data || res;
//             servicePrice = service?.serPrice || 0;
//             serviceName = service?.serName || "Dịch vụ không xác định";
//           } catch (error) {
//             console.error("Lỗi lấy giá dịch vụ", error);
//           }

//           return {
//             id: `b-${booking.bookingID}`,
//             stt: index + 1,
//             type: "Lịch đặt",
//             name: serviceName,
//             price: servicePrice,
//             time: new Date(`${booking.startDate}T${booking.startTime}`).toLocaleString(),
//           };
//         })
//       );

//       // Xử lý dữ liệu đơn hàng
//       const orderData = await Promise.all(
//         orders.map(async (order, index) => {
//           // Lấy ProductOrder theo orderID
//           const poList = productOrders.filter(po => po.orderID === order.orderID);

//           let productNames = [];
//           for (const po of poList) {
//             if (!po.proID) {
//               productNames.push("Sản phẩm đã hết");
//               continue;
//             }
//             try {
//               const res = await getProductById(po.proID);
//               const product = res.data || res;
//               productNames.push(product?.proName || "Sản phẩm đã hết");
//             } catch (error) {
//               console.error("Lỗi lấy sản phẩm", error);
//               productNames.push("Sản phẩm đã hết");
//             }
//           }

//           return {
//             id: `o-${order.orderID}`,
//             stt: bookingData.length + index + 1,
//             type: "Đơn hàng",
//             name: productNames.join(", ") || "Không có sản phẩm",
//             price: order.totalInvoice || 0,
//             time: new Date(order.orderDate).toLocaleString(),
//           };
//         })
//       );

//       setData([...bookingData, ...orderData]);
//     } catch (error) {
//       console.error("Lỗi lấy dữ liệu thống kê", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📊 Thống kê lịch đặt và đơn hàng</h1>
//       {loading ? (
//         <p>Đang tải dữ liệu...</p>
//       ) : (
//         <table className="border border-gray-300 w-full">
//           <thead>
//             <tr>
//               <th className="p-2 border">STT</th>
//               <th className="p-2 border">Loại thống kê</th>
//               <th className="p-2 border">Tên dịch vụ / sản phẩm</th>
//               <th className="p-2 border">Đơn giá (₫)</th>
//               <th className="p-2 border">Thời gian</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td className="p-2 border text-center">{item.stt}</td>
//                 <td className="p-2 border">{item.type}</td>
//                 <td className="p-2 border">{item.name}</td>
//                 <td className="p-2 border text-right">{item.price.toLocaleString()}</td>
//                 <td className="p-2 border">{item.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookingOrderStatisticPage;
import React, { useEffect, useState } from "react";
import * as revenueService from "~/services/revenueServices";
import styles from "./BookingOrderStatisticPage.module.scss";

const BookingOrderStatisticPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [latestRevenue, setLatestRevenue] = useState(null);

  const fetchRevenueRecords = async () => {
    setLoading(true);
    try {
      const res = await revenueService.generateMonthlyRevenue(month, year);
      const data = res.data; // data = RevenueStatisticDTO
      setLatestRevenue(data);
      setRecords(data.records || []);
    } catch (error) {
      console.error("Lỗi khi lấy thống kê doanh thu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueRecords();
  }, [month, year]);

  return (
   <div className={styles.container}>
  <h1 className={styles.header}>📊 Thống kê lịch đặt & đơn hàng</h1>

  <div className={styles.filterCard}>
    <div className={styles.controls}>
      <div className={styles.controlItem}>
        <label>Tháng</label>
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className={styles.controlItem}>
        <label>Năm</label>
        <select value={year} onChange={e => setYear(Number(e.target.value))}>
          {[...Array(5)].map((_, i) => {
            const y = new Date().getFullYear() - i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
      </div>

      <button className={styles.primaryBtn} onClick={fetchRevenueRecords}>
        📈 Tính doanh thu
      </button>
    </div>
  </div>

  {latestRevenue && (
    <div className={styles.revenueCard}>
      <div className={styles.revenueMain}>
        💰 {latestRevenue.totalRevenue.toLocaleString()} ₫
      </div>
      <div className={styles.revenueSub}>
        Tháng {latestRevenue.month}/{latestRevenue.year} ·
        Đơn hàng: <strong>{latestRevenue.orderCount}</strong> ·
        Sản phẩm: <strong>{latestRevenue.productOrderCount}</strong> ·
        Dịch vụ: <strong>{latestRevenue.serviceOrderCount}</strong>
      </div>
    </div>
  )}

  {loading ? (
    <p className={styles.loading}>Đang tải dữ liệu...</p>
  ) : (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Loại</th>
            <th>Tên</th>
            <th className="text-right">Đơn giá</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr key={item.relatedID + index}>
              <td className="text-center">{index + 1}</td>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td className="text-right">{item.price.toLocaleString()} ₫</td>
              <td>{new Date(item.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default BookingOrderStatisticPage;
