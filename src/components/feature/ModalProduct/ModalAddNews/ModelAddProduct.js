// import classNames from 'classnames/bind';
// import { memo, useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import styles from './ModalAddNews.module.scss';

// import * as ProductServices from '~/services/productServices';

// const cx = classNames.bind(styles);

// function ModalAddProduct() {
//     const [proName, setProName] = useState('');
//     const [proImage, setProImage] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [proDescription, setProDescription] = useState('');
//     const [producerID, setProducerID] = useState('');
//     const [warehouseID, setWarehouseID] = useState('');
//     const [cateID, setCateID] = useState('');

//     const navigate = useNavigate();

//     const handleSave = async () => {
//         let result = await ProductServices.createProduct(
//             proName,
//             proImage,
//             price,
//             quantity,
//             proDescription,
//             producerID,
//             warehouseID,
//             cateID,
//         );

//         if (result) {
//             setProName('');
//             toast.success('Thêm product thàn công!');
//             navigate('/booking/product');
//         } else {
//             toast.error('Thêm product thất bại!');
//         }
//     };

//     return (
//         <>
//             <div className={cx('modal-add-role')}>
//                 <Form>
//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>Tên sản phẩm </Form.Label>
//                         <Form.Control
//                             value={proName}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp tên..."
//                             onChange={(e) => {
//                                 setProName(e.target.value);
//                             }}
//                         />
//                     </Form.Group>
//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>Ảnh</Form.Label>
//                         <Form.Control
//                             value={proImage}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp ảnh..."
//                             onChange={(e) => {
//                                 setProImage(e.target.value);
//                             }}
//                         />
//                     </Form.Group>

//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>Giá</Form.Label>
//                         <Form.Control
//                             value={price}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp giá..."
//                             onChange={(e) => {
//                                 setPrice(e.target.value);
//                             }}
//                         />
//                     </Form.Group>

//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>Số lượng</Form.Label>
//                         <Form.Control
//                             value={quantity}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp giá..."
//                             onChange={(e) => {
//                                 setQuantity(e.target.value);
//                             }}
//                         />
//                     </Form.Group>

//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>Mô tả</Form.Label>
//                         <Form.Control
//                             value={proDescription}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp mô tả..."
//                             onChange={(e) => {
//                                 setProDescription(e.target.value);
//                             }}
//                         />
//                     </Form.Group>

//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>ID nhà sản xuất</Form.Label>
//                         <Form.Control
//                             value={producerID}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp id nhà sản xuất..."
//                             onChange={(e) => {
//                                 setProducerID(e.target.value);
//                             }}
//                         />
//                     </Form.Group>

//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>ID kho</Form.Label>
//                         <Form.Control
//                             value={warehouseID}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp id kho..."
//                             onChange={(e) => {
//                                 setWarehouseID(e.target.value);
//                             }}
//                         />
//                     </Form.Group>
//                     <Form.Group className={cx('mb-1')}>
//                         <Form.Label>ID loại</Form.Label>
//                         <Form.Control
//                             value={cateID}
//                             type="text"
//                             className={cx('input-role')}
//                             placeholder="Nhâp id loại..."
//                             onChange={(e) => {
//                                 setCateID(e.target.value);
//                             }}
//                         />
//                     </Form.Group>
//                 </Form>
//             </div>

//             <div className={cx('btn-action')}>
//                 <Button variant="secondary" onClick={() => navigate('/booking/product')}>
//                     Quay lại
//                 </Button>
//                 <Button variant="primary" onClick={() => handleSave()}>
//                     Lưu
//                 </Button>
//             </div>
//         </>
//     );
// }

// export default memo(ModalAddProduct);
import classNames from 'classnames/bind';
import { memo, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './ModalAddNews.module.scss';

import * as ProductServices from '~/services/productServices';
import * as ProducerServices from '~/services/producerServices';
import * as WarehouseServices from '~/services/warehouseServices';
import * as CategoryServices from '~/services/categoryProductServices';

const cx = classNames.bind(styles);

function ModalAddProduct() {
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

    const navigate = useNavigate();

    // Lấy dữ liệu dropdown từ API và map về {id, name}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const producerData = await ProducerServices.getProducer();
                setProducers(
                    producerData.map(p => ({ id: p.producerID, name: p.producerName }))
                );

                const warehouseData = await WarehouseServices.getWarehouse();
                setWarehouses(
                    warehouseData.map(w => ({ id: w.warehouseID, name: w.warehouseName }))
                );

                const categoryData = await CategoryServices.getCategory();
                setCategories(
                    categoryData.map(c => ({ id: c.cateID, name: c.cateName }))
                );
            } catch (error) {
                console.error(error);
                toast.error('Lấy dữ liệu thất bại!');
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        let result = await ProductServices.createProduct(
            proName,
            proImage,
            price,
            quantity,
            proDescription,
            producerID,
            warehouseID,
            cateID,
        );

        if (result) {
            setProName('');
            setProImage('');
            setPrice('');
            setQuantity('');
            setProDescription('');
            setProducerID('');
            setWarehouseID('');
            setCateID('');
            toast.success('Thêm product thành công!');
            navigate('/booking/product');
        } else {
            toast.error('Thêm product thất bại!');
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
                            className={cx('input-role')}
                            placeholder="Nhập tên..."
                            onChange={(e) => setProName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Ảnh</Form.Label>
                        <Form.Control
                            value={proImage}
                            type="text"
                            className={cx('input-role')}
                            placeholder="Nhập ảnh..."
                            onChange={(e) => setProImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                            value={price}
                            type="text"
                            className={cx('input-role')}
                            placeholder="Nhập giá..."
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control
                            value={quantity}
                            type="text"
                            className={cx('input-role')}
                            placeholder="Nhập số lượng..."
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            value={proDescription}
                            type="text"
                            className={cx('input-role')}
                            placeholder="Nhập mô tả..."
                            onChange={(e) => setProDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Nhà sản xuất</Form.Label>
                        <Form.Select
                            value={producerID}
                            onChange={(e) => setProducerID(e.target.value)}
                        >
                            <option value="">Chọn nhà sản xuất</option>
                            {producers.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Kho</Form.Label>
                        <Form.Select
                            value={warehouseID}
                            onChange={(e) => setWarehouseID(e.target.value)}
                        >
                            <option value="">Chọn kho</option>
                            {warehouses.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {w.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Loại sản phẩm</Form.Label>
                        <Form.Select
                            value={cateID}
                            onChange={(e) => setCateID(e.target.value)}
                        >
                            <option value="">Chọn loại</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
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
                <Button variant="primary" onClick={handleSave}>
                    Lưu
                </Button>
            </div>
        </>
    );
}

export default memo(ModalAddProduct);
