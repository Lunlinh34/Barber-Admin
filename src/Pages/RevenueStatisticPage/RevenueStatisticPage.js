// // src/Pages/RevenueStatisticPage.js
// import React, { useEffect, useState } from "react";
// import { getAllStatistics, generateMonthlyRevenue, deleteStatistic } from "~/services/revenueServiceNode";
// import { getOrder } from "~/services/orderServices";

// const RevenueStatisticPage = () => {
//   const [statistics, setStatistics] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedStatistic, setSelectedStatistic] = useState(null);

//   const fetchStatistics = async () => {
//     try {
//       setLoading(true);
//       const stats = await getAllStatistics();
//       setStatistics(stats);

//       // Lấy tất cả đơn hàng 1 lần
//       const allOrders = await getOrder();
//       setOrders(allOrders);
//     } catch (error) {
//       setMessage("❌ Lỗi khi lấy danh sách thống kê hoặc đơn hàng.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);
//       const res = await generateMonthlyRevenue();
//       setMessage(res.message || "✅ Tạo thống kê thành công.");
//       fetchStatistics();
//     } catch (error) {
//       setMessage("❌ Lỗi khi tạo thống kê.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xoá bản thống kê này?")) return;
//     try {
//       setLoading(true);
//       await deleteStatistic(id);
//       setMessage("🗑️ Đã xoá thành công.");
//       fetchStatistics();
//     } catch (error) {
//       setMessage("❌ Lỗi khi xoá thống kê.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Lọc đơn hàng thuộc tháng/năm thống kê
//   const filteredOrders = selectedStatistic
//     ? orders.filter(order => {
//         const orderDate = new Date(order.orderDate);
//         return (
//           orderDate.getMonth() + 1 === selectedStatistic.month &&
//           orderDate.getFullYear() === selectedStatistic.year
//         );
//       })
//     : [];

//   const serviceOrders = filteredOrders.filter(o => o.orderType === "service");
//   const productOrders = filteredOrders.filter(o => o.orderType === "product");

//   useEffect(() => {
//     fetchStatistics();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📊 Thống kê doanh thu</h1>
//       <button
//         onClick={handleGenerate}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Tạo thống kê mới
//       </button>
//       {message && <p className="mb-2">{message}</p>}

//       <table className="border border-gray-300 w-full">
//         <thead>
//           <tr>
//             <th>Tháng/Năm</th>
//             <th>Tổng đơn</th>
//             <th>Doanh thu</th>
//             <th>Đơn sản phẩm</th>
//             <th>Đơn dịch vụ</th>
//             <th>Thời gian tạo</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {statistics.map(stat => (
//             <tr key={stat.revenueID}>
//               <td>{stat.month}/{stat.year}</td>
//               <td>{stat.orderCount}</td>
//               <td>{stat.totalRevenue.toLocaleString()} ₫</td>
//               <td>{stat.productOrderCount}</td>
//               <td>{stat.serviceOrderCount}</td>
//               <td>{new Date(stat.createdAt).toLocaleString()}</td>
//               <td>
//                 <button
//                   onClick={() => setSelectedStatistic(stat)}
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Xem đơn
//                 </button>
//                 <button
//                   onClick={() => handleDelete(stat.revenueID)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Xoá
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Hiển thị chi tiết đơn hàng */}
//       {selectedStatistic && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-2">
//             📋 Đơn hàng Tháng {selectedStatistic.month}/{selectedStatistic.year}
//           </h2>

//           {serviceOrders.length > 0 && (
//             <>
//               <h3 className="font-semibold">Dịch vụ</h3>
//               <table className="border border-gray-300 w-full mb-4">
//                 <thead>
//                   <tr>
//                     <th>Mã đơn</th>
//                     <th>Khách hàng</th>
//                     <th>Tổng tiền</th>
//                     <th>Trạng thái</th>
//                     <th>Ngày đặt</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {serviceOrders.map(o => (
//                     <tr key={o.orderID}>
//                       <td>{o.orderID}</td>
//                       <td>{o.customerName}</td>
//                       <td>{o.totalInvoice.toLocaleString()} ₫</td>
//                       <td>{o.orderStatus}</td>
//                       <td>{new Date(o.orderDate).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}

//           {productOrders.length > 0 && (
//             <>
//               <h3 className="font-semibold">Sản phẩm</h3>
//               <table className="border border-gray-300 w-full">
//                 <thead>
//                   <tr>
//                     <th>Mã đơn</th>
//                     <th>Khách hàng</th>
//                     <th>Tổng tiền</th>
//                     <th>Trạng thái</th>
//                     <th>Ngày đặt</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {productOrders.map(o => (
//                     <tr key={o.orderID}>
//                       <td>{o.orderID}</td>
//                       <td>{o.customerName}</td>
//                       <td>{o.totalInvoice.toLocaleString()} ₫</td>
//                       <td>{o.orderStatus}</td>
//                       <td>{new Date(o.orderDate).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
//           )}

//           {filteredOrders.length === 0 && <p>Không có đơn hàng trong tháng này.</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RevenueStatisticPage;
