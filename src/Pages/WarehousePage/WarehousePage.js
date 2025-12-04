import React, { useEffect, useState } from 'react';
import {
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '~/services/warehouseServices';
import { getStore } from '~/services/storeServices';
import './WarehousePage.scss';

function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({
    warehouseName: '',
    totalAsset: '',
    capacity: '',
    addressID: '',
    storeID: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Gọi API khi trang load
  useEffect(() => {
    fetchWarehouses();
    fetchStores();
  }, []);

  const fetchWarehouses = async () => {
    const res = await getWarehouse();
    if (res) setWarehouses(res);
  };

  const fetchStores = async () => {
    const res = await getStore();
    if (res) setStores(res);
  };

  // Khi người dùng chọn cửa hàng
  const handleStoreChange = (e) => {
    const storeID = e.target.value;
    const selectedStore = stores.find((s) => s.storeID === Number(storeID));
    setForm({
      ...form,
      storeID,
      addressID: selectedStore ? selectedStore.addressID : '',
    });
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Gửi form thêm/sửa
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.storeID || !form.addressID) {
      alert('Vui lòng chọn cửa hàng hợp lệ!');
      return;
    }

    try {
      if (editingId) {
        await updateWarehouse(
          editingId,
          form.warehouseName,
          Number(form.totalAsset),
          Number(form.capacity),
          Number(form.addressID),
          Number(form.storeID)
        );
        alert('Cập nhật kho thành công!');
      } else {
        await createWarehouse(
          form.warehouseName,
          Number(form.totalAsset),
          Number(form.capacity),
          Number(form.addressID),
          Number(form.storeID)
        );
        alert('Thêm kho mới thành công!');
      }

      setForm({
        warehouseName: '',
        totalAsset: '',
        capacity: '',
        addressID: '',
        storeID: '',
      });
      setEditingId(null);
      fetchWarehouses();
    } catch (error) {
      console.error('Error submitting warehouse:', error);
      alert('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };

  // Chọn kho để sửa
  const handleEdit = (wh) => {
    setEditingId(wh.warehouseID);
    setForm({
      warehouseName: wh.warehouseName,
      totalAsset: wh.totalAsset,
      capacity: wh.capacity,
      addressID: wh.addressID,
      storeID: wh.storeID,
    });
  };

  // Xóa kho
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa kho này không?')) {
      await deleteWarehouse(id);
      fetchWarehouses();
      alert('Đã xóa kho thành công!');
    }
  };

  return (
    <div style={{ padding: '20px' }} className="warehouse-container">
      <h2>📦 Quản lý Kho</h2>

      {/* Form thêm / sửa */}
      <form className="warehouse-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Tên kho:</label>
          <input
            type="text"
            name="warehouseName"
            value={form.warehouseName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Tổng tài sản:</label>
          <input
            type="number"
            name="totalAsset"
            value={form.totalAsset}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Dung tích:</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Cửa hàng:</label>
          <select name="storeID" value={form.storeID} onChange={handleStoreChange} required>
            <option value="">-- Chọn cửa hàng --</option>
            {stores.map((store) => (
              <option key={store.storeID} value={store.storeID}>
                {store.storeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Address ID (tự động):</label>
          <input type="text" value={form.addressID} disabled />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          {editingId ? 'Cập nhật kho' : 'Thêm mới'}
        </button>
      </form>

      {/* Bảng danh sách kho */}
      <table border="1" className="warehouse-table" cellPadding="8" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên kho</th>
            <th>Tổng tài sản</th>
            <th>Dung tích</th>
            <th>Address ID</th>
            <th>Store ID</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.length > 0 ? (
            warehouses.map((wh) => (
              <tr key={wh.warehouseID}>
                <td>{wh.warehouseID}</td>
                <td>{wh.warehouseName}</td>
                <td>{wh.totalAsset}</td>
                <td>{wh.capacity}</td>
                <td>{wh.addressID}</td>
                <td>{wh.storeID}</td>
                <td>
                  <button onClick={() => handleEdit(wh)}>Sửa</button>
                  <button
                    onClick={() => handleDelete(wh.warehouseID)}
                    style={{ marginLeft: '5px', color: 'red' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có dữ liệu kho</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WarehousePage;
