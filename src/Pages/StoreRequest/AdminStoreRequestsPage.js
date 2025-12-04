// AdminStoreRequestsPage.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTable from '~/components/common/CustomTable/CustomTable';
import * as storeRequestServices from '~/services/storeRequestServices';
import * as storeServices from '~/services/storeServices';
import * as addressServices from '~/services/addressServices';
import * as warehouseServices from '~/services/warehouseServices';
import * as workingHourServices from '~/services/workingHourServices';
import * as customerServices from '~/services/customerService';

function AdminStoreRequestsPage() {
  const [storeRequests, setStoreRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load danh sách StoreRequest + dữ liệu liên quan
  const fetchStoreRequests = async () => {
    setLoading(true);
    try {
      const requests = await storeRequestServices.getAllStoreRequests();
      if (!requests) return;

      // 🔹 Load toàn bộ dữ liệu phụ trợ 1 lần để tránh gọi API lặp lại
      const [allAddresses, allCustomers] = await Promise.all([
        addressServices.getAddress(),
        customerServices.getCustomer(), // API trả về danh sách customer
      ]);

      const detailedRequests = await Promise.all(
        requests.map(async (r) => {
          const [store, warehouse, workingHour] = await Promise.all([
            storeServices.getStoreById(r.storeID),
            warehouseServices.getWarehouseById(r.warehouseID),
            workingHourServices.getWorkingHourById(r.workingHourID),
          ]);

          const address = allAddresses.find((a) => a.addressID === r.addressID);

          // 🔹 Lấy thông tin customer tương ứng với userID
          const customer = allCustomers.find((c) => c.userID === r.userID);

          return {
            id: r.id,
            storeName: store?.storeName || 'N/A',
            address: address?.currentAddress || 'N/A',
            warehouseName: warehouse?.warehouseName || 'N/A',
            workingHour: workingHour
              ? `${workingHour.startTime} - ${workingHour.endTime}`
              : 'N/A',
            userName: customer
              ? `${customer.firstName} ${customer.lastName}`
              : `UserID: ${r.userID}`,
            status: r.status,
          };
        })
      );

      setStoreRequests(detailedRequests);
    } catch (err) {
      console.error('❌ Lỗi load StoreRequests chi tiết:', err);
      toast.error('Không thể tải danh sách đơn đăng ký cửa hàng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreRequests();
  }, []);

  // 🔹 Duyệt đơn (update status)
  const handleApprove = async (id) => {
    try {
      await storeRequestServices.updateStoreRequestStatus(id, 'Approved');
      toast.success('✅ Đã duyệt đơn thành công!');
      fetchStoreRequests();
    } catch (err) {
      console.error('❌ Lỗi duyệt đơn:', err);
      toast.error('Không thể duyệt đơn!');
    }
  };

  // 🔹 Cấu hình header cho bảng
  const headers = [
    'ID',
    'Store',
    'Address',
    'Warehouse',
    'Working Hour',
    'User',
    'Status',
  ];

  // 🔹 Cột hành động (Duyệt)
  const renderActions = (row) =>
    row.status === 'Pending' ? (
      <button className="approveBtn" onClick={() => handleApprove(row.id)}>
        Duyệt
      </button>
    ) : (
      <span style={{ color: 'green', fontWeight: 'bold' }}>Đã duyệt</span>
    );

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 Quản lý đơn đăng ký cửa hàng</h2>
      <CustomTable
        headers={headers}
        data={storeRequests}
        renderActions={renderActions}
        loading={loading}
      />
    </div>
  );
}

export default AdminStoreRequestsPage;
