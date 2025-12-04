import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './City.module.scss';
//Service
import * as cityServices from '~/services/cityServices';

const cx = classNames.bind(styles);

function City() {
    const [city, setCity] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await cityServices.getCity();
            if (result) {
                setCity(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Tỉnh | Thành Phố</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã tỉnh | thành phố </th>
                        <th>Tên tỉnh | thành phố</th>
                        <th>Mã quốc gia</th>
                    </tr>
                </thead>
                <tbody>
                    {city.map((cityItem, index) => (
                        <tr key={`city-${index}`}>
                            <td>{cityItem.cityID}</td>
                            <td>{cityItem.cityName}</td>
                            <td>{cityItem.countryID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default City;
