import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Booking.module.scss';
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as bookServices from '~/services/bookServices';

const cx = classNames.bind(styles);

function Booking() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await bookServices.getBook();
            if (result) setBookings(result);
        };
        fetchApi();
    }, []);

    const headers = [
        'Mã đặt',
        'Ngày đặt',
        'Thời gian đặt',
        'Ghi chú',
        'Mã khách hàng',
        'Mã cửa hàng',
        'Mã dịch vụ',
        'Mã nhân viên',
    ];

    const tableData = bookings.map((b) => ({
        bookingID: b.bookingID,
        startDate: b.startDate,
        startTime: b.startTime,
        note: b.note,
        customerID: b.customerID,
        storeID: b.storeID,
        serID: b.serID,
        employeID: b.employeID,
    }));

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Lịch Đặt</span>
            </div>

            <CustomTable headers={headers} data={tableData} variant="light" />
        </div>
    );
}

export default Booking;
    