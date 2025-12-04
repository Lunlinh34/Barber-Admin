import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Address.module.scss';
//Service
import * as addressServices from '~/services/addressServices';

const cx = classNames.bind(styles);

function Address() {
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await addressServices.getAddress();
            if (result) {
                setAddress(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Địa Chỉ Cụ Thể</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    S
                    <tr>
                        <th>Mã địa chỉ hiện tại </th>
                        <th>Địa chỉ hiện tại</th>
                        <th>Thi trấn | Phường | Xã</th>
                        <th>Huyện | Quận</th>
                        <th>Mã quốc gia</th>
                    </tr>
                </thead>
                <tbody>
                    {address.map((addressItem, index) => (
                        <tr key={`address-${index}`}>
                            <td>{addressItem.addressID}</td>
                            <td>{addressItem.currentAddress}</td>
                            <td>{addressItem.subDistrict}</td>
                            <td>{addressItem.district}</td>
                            <td>{addressItem.cityID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Address;
