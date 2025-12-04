import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import styles from './Order.module.scss';
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as orderServices from '~/services/orderServices';
import * as addressServices from '~/services/addressServices';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function Order() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, addressRes, userRes] = await Promise.all([
          orderServices.getOrder(),
          addressServices.getAddress(),
          userServices.getUser(),
        ]);

        setOrders(orderRes || []);
        setAddresses(addressRes || []);
        setUsers(userRes || []);
      } catch (err) {
        console.error('❌ Lỗi lấy dữ liệu:', err);
      }
    };
    fetchData();
  }, []);

  const formatDateTime = (datetimeStr) => {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const vnDate = new Date(utc + 7 * 3600 * 1000);
    return vnDate.toLocaleString('vi-VN', { hour12: false });
  };

  const getUserNameByAddress = (addressID) => {
    const addr = addresses.find((a) => Number(a.addressID) === Number(addressID));
    if (!addr) return 'Không có';
    const user = users.find((u) => Number(u.userID) === Number(addr.userID));
    return user ? user.fullName || user.userName || `User #${user.userID}` : 'Không xác định';
  };

  const getAddressString = (addressID) => {
    const addr = addresses.find((a) => Number(a.addressID) === Number(addressID));
    if (!addr) return 'Chưa có';
    return `${addr.currentAddress || ''}, ${addr.subDistrict || ''}, ${addr.district || ''}, ${addr.cityName || ''}`;
  };

  const handleConfirmOrder = async (orderID) => {
    try {
      const orderToUpdate = orders.find((o) => o.orderID === orderID);
      if (!orderToUpdate) {
        toast.error('Không tìm thấy đơn hàng!');
        return;
      }
      await orderServices.updateOrderStatus(orderID, '2');
      setOrders((prev) => prev.filter((o) => o.orderID !== orderID));
      toast.success('✅ Đơn hàng đã được xác nhận!');
    } catch (err) {
      console.error('❌ Lỗi khi xác nhận đơn hàng:', err);
      toast.error('Không thể xác nhận đơn hàng!');
    }
  };

  const headers = [
    'Mã đặt',
    'Ngày đặt',
    'Trạng thái',
    'Mã khách hàng',
    'Tên người dùng',
    'Mã thanh toán',
    'Địa chỉ giao hàng',
    'Thao tác',
  ];

  const tableData = orders
    .filter((order) => order.orderStatus !== '2')
    .map((order) => ({
      orderID: order.orderID,
      orderDate: formatDateTime(order.orderDate),
      orderStatus: order.orderStatus === 'Chưa xác nhận' ? 'Chưa xác nhận' : order.orderStatus,
      customerID: order.customerID,
      userName: getUserNameByAddress(order.addressID),
      payID: order.payID,
      address: getAddressString(order.addressID),
      action: (
        <Button variant="success" size="sm" onClick={() => handleConfirmOrder(order.orderID)}>
          Xác nhận
        </Button>
      ),
    }));

  return (
    <div>
      <div className={cx('list-user')}>
        <span>Danh Sách Đặt Hàng Chưa Xác Nhận</span>
      </div>
      <CustomTable headers={headers} data={tableData} />
    </div>
  );
}

export default Order;
