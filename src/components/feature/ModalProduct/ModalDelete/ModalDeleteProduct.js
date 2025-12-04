import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import styles from './ModalDeleteProduct.module.scss';

//Service
import * as ProductServices from '~/services/productServices';

const cx = classNames.bind(styles);

function ModalDeleteProduct(props) {
    const { show, handleClose, dataProductDelete, setProducts } = props;

    const fetchApis = async () => {
        let products = await ProductServices.getProduct();
        setProducts(products);
    };

    const confirmDelete = async () => {
        const result = await ProductServices.deleteProduct(dataProductDelete?.proID);

        if (result) {
            toast.success('XÓA THÀNH CÔNG');
            handleClose();
            fetchApis();
        } else {
            toast.error('XÓA KHÔNG THÀNH CÔNG');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Xóa Sản phẩm</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Bạn có chắc muốn xóa sản phẩm này không?</h3>
                    <p>Sản phẩm: {dataProductDelete?.proName}?</p>
                </Modal.Body>
                <Modal.Footer className={cx('btn-action')}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;
