import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Country.module.scss';
//Service
import * as countryServices from '~/services/countryServices';

const cx = classNames.bind(styles);

function Country() {
    const [country, setCountry] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await countryServices.getCountry();
            if (result) {
                setCountry(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Quốc Gia</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã quốc gia</th>
                        <th>Tên quốc gia</th>
                    </tr>
                </thead>
                <tbody>
                    {country.map((countryItem, index) => (
                        <tr key={`country-${index}`}>
                            <td>{countryItem.countryID}</td>
                            <td>{countryItem.countryName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Country;
