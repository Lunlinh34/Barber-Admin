import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Notification.module.scss';

//Service
import * as notificationServices from '~/services/notificationServices';

const cx = classNames.bind(styles);

function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await notificationServices.getNotification();
            if (result) {
                setNotifications(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Thông Báo</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã thông báo</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Thời gian cập nhật thông báo</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
                        <tr key={`notification-${index}`}>
                            <td>{notification.notiID}</td>
                            <td>{notification.notiTitle}</td>
                            <td>{notification.notiContent}</td>
                            <td>{notification.lastUpdate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Notification;
