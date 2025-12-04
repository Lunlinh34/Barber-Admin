import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Category.module.scss';
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as categoryProductServices from '~/services/categoryProductServices';

const cx = classNames.bind(styles);

function Category() {
    const [categories, setCategories] = useState([]);
    const [cateName, setCateName] = useState('');
    const [editCateID, setEditCateID] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const result = await categoryProductServices.getCategory();
        if (result) setCategories(result);
    };

    // Thêm category
    const handleAdd = async () => {
        if (!cateName.trim()) return alert('Tên category không được để trống');
        await categoryProductServices.createCategoryType(cateName);
        setCateName('');
        fetchCategories();
    };

    // Cập nhật category
    const handleUpdate = async () => {
        if (!cateName.trim() || editCateID === null) return;
        await categoryProductServices.updateCategoryType(editCateID, cateName);
        setCateName('');
        setEditCateID(null);
        fetchCategories();
    };

    // Xóa category
    const handleDelete = async (cateID) => {
        if (window.confirm('Bạn có chắc muốn xóa category này?')) {
            await categoryProductServices.deleteCategoryType(cateID);
            fetchCategories();
        }
    };

    // Chuẩn bị sửa
    const handleEdit = (category) => {
        setCateName(category.cateName);
        setEditCateID(category.cateID);
    };

    const headers = ['Mã loại sản phẩm', 'Tên loại sản phẩm', 'Hành động'];

    const tableData = categories.map((c) => ({
        cateID: c.cateID,
        cateName: c.cateName,
        actions: (
            <div className={cx('table-user')}>
                <button className={cx('edit')} onClick={() => handleEdit(c)}>Sửa</button>
                <button className={cx('delete')} onClick={() => handleDelete(c.cateID)}>Xóa</button>
            </div>
        ),
    }));

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Loại Sản Phẩm</span>
            </div>

            <div className={cx('form-category')}>
                <input
                    type="text"
                    placeholder="Tên loại sản phẩm"
                    value={cateName}
                    onChange={(e) => setCateName(e.target.value)}
                />
                {editCateID === null ? (
                    <button className={cx('add')} onClick={handleAdd}>Thêm</button>
                ) : (
                    <button className={cx('update')} onClick={handleUpdate}>Cập nhật</button>
                )}
            </div>

            <CustomTable headers={headers} data={tableData} />
        </div>
    );
}

export default Category;
