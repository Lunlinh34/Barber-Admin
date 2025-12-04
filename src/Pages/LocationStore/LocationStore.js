import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './LocationStore.module.scss';

//Service
import * as locationStoreServices from '~/services/locationStoreServices';

const cx = classNames.bind(styles);

function LocationStore() {
    const [locationStores, setLocationStores] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await locationStoreServices.getLocationStore();
            if (result) {
                setLocationStores(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Địa Chỉ Cửa Hàng</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã địa chỉ CH</th>
                        <th>Địa chỉ hiện tại</th>
                        <th>Thị trấn | Phường | Xã</th>
                        <th>Huyện | Quận</th>
                        <th>Tỉnh | Thành Phố</th>
                        <th>Mã cửa hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {locationStores.map((locationStore, index) => (
                        <tr key={`locationStore-${index}`}>
                            <td>{locationStore.locationID}</td>
                            <td>{locationStore.currentAddress}</td>
                            <td>{locationStore.subDistrict}</td>
                            <td>{locationStore.district}</td>
                            <td>{locationStore.cityID}</td>
                            <td>{locationStore.storeID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default LocationStore;
