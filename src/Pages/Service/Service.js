import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Service.module.scss';
import CustomTable from '~/components/common/CustomTable/CustomTable';
import * as serviceServices from '~/services/serviceServices';
import * as serviceCategoryServices from '~/services/serviceCategoryServices'; // 🔹 thêm file này

const cx = classNames.bind(styles);

function Service() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    serName: '',
    serDescription: '',
    serPrice: '',
    serCateID: '',
    imageUrl: '',
  });

  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    const result = await serviceServices.getService();
    if (result) setServices(result);
  };

  const fetchCategories = async () => {
    const result = await serviceCategoryServices.getServiceCategory();
    if (result) setCategories(result);
  };

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Thêm mới
  const handleAddService = async () => {
    if (!formData.serName || !formData.serDescription || !formData.serPrice || !formData.serCateID) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const res = await serviceServices.createService(
      formData.serName,
      formData.serDescription,
      parseFloat(formData.serPrice),
      parseInt(formData.serCateID),
      formData.imageUrl
    );
    if (res) {
      alert('Thêm dịch vụ thành công!');
      fetchServices();
      setFormData({ serName: '', serDescription: '', serPrice: '', serCateID: '', imageUrl: '' });
    }
  };

  // 🔹 Xoá
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá dịch vụ này?')) {
      const res = await serviceServices.deleteService(id);
      if (res) {
        alert('Xoá thành công!');
        fetchServices();
      }
    }
  };

  // 🔹 Sửa
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      serName: service.serName,
      serDescription: service.serDescription,
      serPrice: service.serPrice,
      serCateID: service.serCateID,
      imageUrl: service.imageUrl,
    });
  };

  // 🔹 Lưu sau khi sửa
  const handleUpdate = async () => {
    const res = await serviceServices.updateService(
      editingService.serID,
      formData.serName,
      formData.serDescription,
      parseFloat(formData.serPrice),
      parseInt(formData.serCateID),
      formData.imageUrl
    );
    if (res) {
      alert('Cập nhật thành công!');
      fetchServices();
      setEditingService(null);
      setFormData({ serName: '', serDescription: '', serPrice: '', serCateID: '', imageUrl: '' });
    }
  };

  // Format tiền VND
  const formatVND = (value) => {
    if (!value && value !== 0) return '';
    return Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // 🔹 Dữ liệu bảng
  const headers = [
  'Mã dịch vụ',
  'Tên dịch vụ',
  'Mô tả',
  'Giá (VND)',
  'Loại dịch vụ',
  'Hình ảnh',
  'Thao tác',
];

const tableData = services.map((service) => ({
  serID: service.serID,
  serName: service.serName,
  serDescription: service.serDescription,
  serPrice: formatVND(service.serPrice),
  serCateName:
    categories.find((c) => c.serCateID === service.serCateID)?.serCateName ||
    'Không xác định',

  image: (
    <img
      src={service.imageUrl}
      alt={service.serName}
      className={cx('service-image')}
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/60';
      }}
    />
  ),
}));

  return (
    <div className={cx('service-container')}>
  {/* ===== Header ===== */}
  <div className={cx('page-header')}>
    <h2>🛠 Quản lý dịch vụ</h2>
    <p>Thêm, chỉnh sửa và quản lý các dịch vụ trong hệ thống</p>
  </div>

  {/* ===== Form Card ===== */}
  <div className={cx('form-card')}>
    <h3>{editingService ? '✏️ Cập nhật dịch vụ' : '➕ Thêm dịch vụ'}</h3>

    <div className={cx('service-form')}>
      <div className={cx('form-group')}>
        <label>Tên dịch vụ</label>
        <input name="serName" value={formData.serName} onChange={handleChange} />
      </div>

      <div className={cx('form-group')}>
        <label>Mô tả</label>
        <input name="serDescription" value={formData.serDescription} onChange={handleChange} />
      </div>

      <div className={cx('form-group')}>
        <label>Giá (VND)</label>
        <input type="number" name="serPrice" value={formData.serPrice} onChange={handleChange} />
      </div>

      <div className={cx('form-group')}>
        <label>Loại dịch vụ</label>
        <select name="serCateID" value={formData.serCateID} onChange={handleChange}>
          <option value="">-- Chọn loại --</option>
          {categories.map((cate) => (
            <option key={cate.serCateID} value={cate.serCateID}>
              {cate.serCateName}
            </option>
          ))}
        </select>
      </div>

      <div className={cx('form-group')}>
        <label>Hình ảnh (URL)</label>
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      </div>
    </div>

    <div className={cx('form-actions')}>
      {editingService ? (
        <>
          <button className={cx('btn', 'btn-update')} onClick={handleUpdate}>
            💾 Lưu
          </button>
          <button className={cx('btn', 'btn-cancel')} onClick={() => setEditingService(null)}>
            ❌ Hủy
          </button>
        </>
      ) : (
        <button className={cx('btn', 'btn-add')} onClick={handleAddService}>
          ➕ Thêm dịch vụ
        </button>
      )}
    </div>
  </div>

  {/* ===== Table ===== */}
  <CustomTable
    headers={headers}
    variant="light"
    data={tableData.map((item, index) => ({
      ...item,
      action: (
        <div className={cx('action-buttons')}>
          <button className={cx('btn-icon', 'edit')} onClick={() => handleEdit(services[index])}>✏️</button>
          <button
            className={cx('btn-icon', 'delete')}
            onClick={() => handleDelete(services[index].serID)}
          >
            🗑
          </button>
        </div>
      ),
    }))}
  />
</div>

  );
}

export default Service;
