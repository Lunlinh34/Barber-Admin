import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Store.module.scss';

// Components
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as storeServices from '~/services/storeServices';

const cx = classNames.bind(styles);

function Store() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await storeServices.getStore();
      if (result) setStores(result);
    };
    fetchApi();
  }, []);

  // Cấu hình tiêu đề cột
  const headers = ['Mã cửa hàng', 'Tên cửa hàng', 'Số điện thoại', 'Mã giờ mở cửa'];

  // Chuẩn hóa dữ liệu để khớp CustomTable
  const tableData = stores.map((s) => ({
    storeID: s.storeID,
    storeName: s.storeName,
    numberphone: s.numberphone,
    workingHourID: s.workingHourID,
  }));

  return (
    <div className={cx('store-page')}>
      <div className={cx('header')}>
        <h3>Danh Sách Cửa Hàng</h3>
      </div>

      <CustomTable
        headers={headers}
        data={tableData}
        variant="light"
      />
    </div>
  );
}

export default Store;
