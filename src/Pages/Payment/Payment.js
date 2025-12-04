import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Payment.module.scss';

import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as paymentServices from '~/services/paymentServices';

const cx = classNames.bind(styles);

function Payment() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await paymentServices.getPayment();
            if (result) setPayments(result);
        };
        fetchApi();
    }, []);

    // Chuẩn bị headers và dữ liệu cho CustomTable
    const headers = ['Mã loại thanh toán', 'Tên loại thanh toán', 'Trạng thái thanh toán'];
    const tableData = payments.map(p => ({
        payID: p.payID,
        payMethod: p.payMethod,
        payStatus: p.payStatus ? 'Đã thanh toán' : 'Chưa thanh toán'
    }));

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Loại Thanh Toán</span>
            </div>

            <CustomTable headers={headers} data={tableData} />
        </div>
    );
}

export default Payment;
