    import classNames from 'classnames/bind';
    import { useState, useEffect } from 'react';
    import styles from './ServiceCategory.module.scss';
    import CustomTable from '~/components/common/CustomTable/CustomTable';
    import * as serviceCategoryServices from '~/services/serviceCategoryServices';

    const cx = classNames.bind(styles);

    function ServiceCategory() {
        const [categories, setCategories] = useState([]);
        const [formData, setFormData] = useState({
            serCateName: '',
            description: '',
            imageUrl: '',
        });
        const [editingId, setEditingId] = useState(null); // null = thêm mới

        // 🟢 Lấy danh sách ban đầu
        const fetchData = async () => {
            const result = await serviceCategoryServices.getServiceCategory();
            if (result) setCategories(result);
        };

        useEffect(() => {
            fetchData();
        }, []);

        // 🟡 Xử lý nhập form
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        // 🟢 Thêm hoặc cập nhật loại dịch vụ
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                if (editingId) {
                    await serviceCategoryServices.updateServiceCategory(editingId, formData);
                    alert('Cập nhật loại dịch vụ thành công!');
                } else {
                    await serviceCategoryServices.createServiceCategory(formData);
                    alert('Thêm loại dịch vụ thành công!');
                }
                setFormData({ serCateName: '', description: '', imageUrl: '' });
                setEditingId(null);
                fetchData();
            } catch (error) {
                alert('Lỗi khi lưu dữ liệu!');
            }
        };

        // 🟠 Bắt đầu sửa
        const handleEdit = (category) => {
            setFormData({
                serCateName: category.serCateName,
                description: category.description,
                imageUrl: category.imageUrl || '',
            });
            setEditingId(category.serCateID);
        };

        // 🔴 Xóa loại dịch vụ
        const handleDelete = async (id) => {
            if (window.confirm('Bạn có chắc muốn xoá loại dịch vụ này không?')) {
                try {
                    await serviceCategoryServices.deleteServiceCategory(id);
                    alert('Xoá thành công!');
                    fetchData();
                } catch (error) {
                    alert('Lỗi khi xoá!');
                }
            }
        };

        const headers = ['Mã loại dịch vụ', 'Tên loại dịch vụ', 'Mô tả', 'Hình ảnh', 'Hành động'];

        const tableData = categories.map((category) => ({
            serCateID: category.serCateID,
            serCateName: category.serCateName,
            description: category.description,
            imageUrl: (
                <img
                    src={category.imageUrl}
                    alt={category.serCateName}
                    style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                />
            ),
            actions: (
                <div className={cx('action-buttons')}>
                    <button className={cx('edit-btn')} onClick={() => handleEdit(category)}>
                        ✏️ Sửa
                    </button>
                    <button className={cx('delete-btn')} onClick={() => handleDelete(category.serCateID)}>
                        🗑️ Xoá
                    </button>
                </div>
            ),
        }));

        return (
            <div className={cx('wrapper')}>
                <div className={cx('list-user')}>
                    <span>Quản Lý Loại Dịch Vụ</span>
                </div>

                {/* 🟢 Form thêm/sửa */}
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Tên loại dịch vụ:</label>
                        <input
                            type="text"
                            name="serCateName"
                            value={formData.serCateName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mô tả:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label>URL hình ảnh:</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={cx('submit-btn')}>
                        {editingId ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            className={cx('cancel-btn')}
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ serCateName: '', description: '', imageUrl: '' });
                            }}
                        >
                            Hủy
                        </button>
                    )}
                </form>

                {/* 🟡 Bảng danh sách */}
                <CustomTable headers={headers} data={tableData} variant="light" />
            </div>
        );
    }

    export default ServiceCategory;
