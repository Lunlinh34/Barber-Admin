import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './WorkingHour.module.scss';

//Service
import * as workingHourServices from '~/services/workingHourServices';

const cx = classNames.bind(styles);

function WorkingHour() {
    const [workingHours, setWorkingHours] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await workingHourServices.getWorkingHour();
            if (result) {
                setWorkingHours(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Giờ Mở Cửa Hàng</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã giờ </th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {workingHours.map((workingHour, index) => (
                        <tr key={`workingHour-${index}`}>
                            <td>{workingHour.workingHourID}</td>
                            <td>{workingHour.startTime}</td>
                            <td>{workingHour.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default WorkingHour;
