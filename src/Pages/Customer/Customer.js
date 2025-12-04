import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Customer.module.scss';
import Image from '~/components/common/Image';
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as customerService from '~/services/customerService';

const cx = classNames.bind(styles);

function Customer() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await customerService.getCustomer();
            if (result) setCustomers(result);
        };
        fetchApi();
    }, []);

    const headers = [
        'Mã Khách Hàng',
        'Họ & Tên Lót',
        'Tên',
        'Hình',
        'Email',
        'SDT',
        'Ngày Sinh',
        'Mã Người Dùng',
    ];

    // Chuyển dữ liệu sang dạng object phù hợp CustomTable
    const tableData = customers.map((customer) => ({
        customerID: customer.customerID,
        firstName: customer.firstName,
        lastName: customer.lastName,
        picture: customer.picture,
        email: customer.email,
        numberphone: customer.numberphone,
        dateOfBirth: customer.dateOfBirth,
        userID: customer.userID,
    }));

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Khách Hàng</span>
            </div>

            <CustomTable
                headers={headers}
                data={tableData}
                renderActions={(item) => (
                    <Image
                        src={item.picture}
                        alt={item.lastName}
                        width="120"
                        height="100"
                    />
                )}
                variant="light"
            />
        </div>
    );
}

export default Customer;
