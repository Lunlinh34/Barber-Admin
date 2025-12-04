import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Evaluate.module.scss';

//Service
import * as evaluateServices from '~/services/evaluateServices';

const cx = classNames.bind(styles);

function Evaluate() {
    const [evaluates, setEvaluates] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await evaluateServices.getEvaluate();
            if (result) {
                setEvaluates(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Đánh Giá</span>
            </div>
            <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
                <thead>
                    <tr>
                        <th>Mã đánh giá</th>
                        <th>Số lượng sao</th>
                        <th>Nội dung</th>
                        <th>Thời gian cập nhật thông báo</th>
                        <th>Mã khách hàng</th>
                        <th>Mã cửa hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluates.map((evaluate, index) => (
                        <tr key={`evaluate-${index}`}>
                            <td>{evaluate.evaluateID}</td>
                            <td>{evaluate.rating}</td>
                            <td>{evaluate.comment}</td>
                            <td>{evaluate.lastUpdate}</td>
                            <td>{evaluate.customerID}</td>
                            <td>{evaluate.storeID}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Evaluate;
