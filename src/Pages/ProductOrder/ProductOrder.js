import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './ProductOrder.module.scss';

import CustomTable from '~/components/common/CustomTable/CustomTable';

// Services
import * as productOrderServices from '~/services/productOrderServices';
import * as orderServices from '~/services/orderServices';

const cx = classNames.bind(styles);

function ProductOrder() {
    const [productOrders, setProductOrders] = useState([]);
    const [ordersMap, setOrdersMap] = useState({}); // lưu order theo orderID

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const allProductOrders = await productOrderServices.getProductOrder();
                if (!allProductOrders) return;

                const orderIDs = [...new Set(allProductOrders.map(po => po.orderID))];
                const orders = await Promise.all(orderIDs.map(id => orderServices.getOrderById(id)));
                const confirmedOrders = orders.filter(order => order.orderStatus === '2');

                const confirmedProductOrders = allProductOrders
                    .map(po => {
                        const order = confirmedOrders.find(o => o.orderID === po.orderID);
                        if (order) {
                            return {
                                ...po,
                                customerID: order.customerID,
                                totalInvoice: order.totalInvoice
                            };
                        }
                        return null;
                    })
                    .filter(po => po !== null);

                setProductOrders(confirmedProductOrders);

                const map = {};
                confirmedOrders.forEach(o => {
                    map[o.orderID] = o;
                });
                setOrdersMap(map);

            } catch (error) {
                console.error('❌ Lỗi khi lấy productOrders hoặc orders:', error);
            }
        };

        fetchApi();
    }, []);

    // Chuẩn bị headers và dữ liệu cho CustomTable
    const headers = ['Mã xác nhận đặt', 'Số lượng', 'Mã đặt hàng', 'Mã khách hàng', 'Mã sản phẩm', 'Tổng tiền đơn hàng'];
    const tableData = productOrders.map(po => ({
        proOrderID: po.proOrderID,
        proOrderQuantity: po.proOrderQuantity,
        orderID: po.orderID,
        customerID: po.customerID,
        proID: po.proID,
        totalInvoice: (po.totalInvoice || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }));

    return (
        <div>
            <div className={cx('list-user')}>
                <span>Danh Sách Sản Phẩm Thuộc Đơn Hàng Đã Xác Nhận</span>
            </div>

            <CustomTable headers={headers} data={tableData} />
        </div>
    );
}

export default ProductOrder;
