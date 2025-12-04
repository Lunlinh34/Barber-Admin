import classNames from 'classnames/bind';
import { memo, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ModalEditProduct.module.scss';

import * as ProductServices from '~/services/productServices';
import * as ProducerServices from '~/services/producerServices';
import * as WarehouseServices from '~/services/warehouseServices';
import * as CategoryServices from '~/services/categoryProductServices';

const cx = classNames.bind(styles);

function ModalEditProduct() {
    const [proID, setProID] = useState('');
    const [proName, setProName] = useState('');
    const [proImage, setProImage] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [proDescription, setProDescription] = useState('');
    const [producerID, setProducerID] = useState('');
    const [warehouseID, setWarehouseID] = useState('');
    const [cateID, setCateID] = useState('');

    const [producers, setProducers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const findId = location.state.product;
    const navigate = useNavigate();

    useEffect(() => {
        if (findId) {
            setProID(findId?.proID);
            setProName(findId?.proName);
            setProImage(findId?.proImage);
            setPrice(findId?.price);
            setQuantity(findId?.quantity);
            setProDescription(findId?.proDescription);
            setProducerID(findId?.producerID);
            setWarehouseID(findId?.warehouseID);
            setCateID(findId?.cateID);
        } else {
            toast.error('Vui lòng chọn product khác!');
            navigate('/booking/product');
        }
    }, [findId, navigate]);

    // Load dropdown options
    useEffect(() => {
        const fetchDropdowns = async () => {
            const producerList = await ProducerServices.getProducer();
            const warehouseList = await WarehouseServices.getWarehouse();
            const categoryList = await CategoryServices.getCategory();

            setProducers(producerList || []);
            setWarehouses(warehouseList || []);
            setCategories(categoryList || []);
        };
        fetchDropdowns();
    }, []);

    const handleEditProduct = async () => {
        const result = await ProductServices.updateProduct(
            proID,
            proName,
            proImage,
            price,
            quantity,
            proDescription,
            producerID,
            warehouseID,
            cateID
        );
        if (result) {
            toast.success('Chỉnh sửa product thành công!');
            navigate('/booking/product');
        } else {
            toast.error('Chỉnh sửa product thất bại!');
        }
    };

    return (
        <>
            <div className={cx('modal-add-role')}>
                <Form>
                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            value={proName}
                            type="text"
                            placeholder="Nhập tên..."
                            onChange={(e) => setProName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Ảnh</Form.Label>
                        <Form.Control
                            value={proImage}
                            type="text"
                            placeholder="Nhập ảnh..."
                            onChange={(e) => setProImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                            value={price}
                            type="text"
                            placeholder="Nhập giá..."
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control
                            value={quantity}
                            type="text"
                            placeholder="Nhập số lượng..."
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            value={proDescription}
                            type="text"
                            placeholder="Nhập mô tả..."
                            onChange={(e) => setProDescription(e.target.value)}
                        />
                    </Form.Group>

                    {/* Dropdown ID nhà sản xuất */}
                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Nhà sản xuất</Form.Label>
                        <Form.Select
                            value={producerID}
                            onChange={(e) => setProducerID(e.target.value)}
                        >
                            {producers.map((producer) => (
                                <option key={producer.producerID} value={producer.producerID}>
                                    {producer.producerName} (ID: {producer.producerID})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Dropdown ID kho */}
                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Kho</Form.Label>
                        <Form.Select
                            value={warehouseID}
                            onChange={(e) => setWarehouseID(e.target.value)}
                        >
                            {warehouses.map((warehouse) => (
                                <option key={warehouse.warehouseID} value={warehouse.warehouseID}>
                                    {warehouse.warehouseName} (ID: {warehouse.warehouseID})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Dropdown ID loại */}
                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select value={cateID} onChange={(e) => setCateID(e.target.value)}>
                            {categories.map((cate) => (
                                <option key={cate.cateID} value={cate.cateID}>
                                    {cate.cateName} (ID: {cate.cateID})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </div>

            <div className={cx('btn-action')}>
                <Button variant="secondary" onClick={() => navigate('/booking/product')}>
                    Quay lại
                </Button>
                <Button variant="primary" onClick={handleEditProduct}>
                    Sửa
                </Button>
            </div>
        </>
    );
}

export default memo(ModalEditProduct);
