import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Warehouse.module.scss';

//Service
import * as warehouseServices from '~/services/warehouseServices';

const cx = classNames.bind(styles);

function Warehouse() {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await warehouseServices.getWarehouse();
            if (result) {
                setWarehouses(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Nhà Kho</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã nhà kho</th>
                        <th>Tên nhà kho</th>
                        <th>Tông giá trị kho</th>
                        <th>Số lượng sản phẩm</th>
                        <th>Mã địa chỉ</th>
                        <th>Mã cửa hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((warehouse, index) => (
                        <tr key={`warehouse-${index}`}>
                            <td>{warehouse.warehouseID}</td>
                            <td>{warehouse.warehouseName}</td>
                            <td>{warehouse.totalAsset}</td>
                            <td>{warehouse.capacity}</td>
                            <td>{warehouse.addressID}</td>
                            <td>{warehouse.storeID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Warehouse;
