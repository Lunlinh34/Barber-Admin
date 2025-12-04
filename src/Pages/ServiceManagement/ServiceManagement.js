import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './ServiceManagement.module.scss';

//Service
import * as serviceManagementServices from '~/services/serviceManagementServices';

const cx = classNames.bind(styles);

function ServiceManagement() {
    const [serviceManagements, setServiceManagements] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await serviceManagementServices.getServiceManagement();
            if (result) {
                setServiceManagements(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Quản lý dịch vụ của cửa hàng</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã quản lí dịch vụ</th>
                        <th>Mã cửa hàng</th>
                        <th>Mã dịch vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceManagements.map((serviceManagement, index) => (
                        <tr key={`serviceManagement-${index}`}>
                            <td>{serviceManagement.serManagerID}</td>
                            <td>{serviceManagement.storeID}</td>
                            <td>{serviceManagement.serID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ServiceManagement;
