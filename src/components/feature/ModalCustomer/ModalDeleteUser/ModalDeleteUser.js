import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import styles from './ModalDeleteUser.module.scss';

//Service
import * as customerService from '~/services/customerService';

const cx = classNames.bind(styles);

function ModalDeleteUser(props) {
    const { show, handleClose, dataUserDelete, setUsers } = props;

    const fetchApis = async () => {
        let customer = await customerService.getCustomer();
        setUsers(customer);
    };

    const confirmDelete = async () => {
        const result = await customerService.deleteCustomer(dataUserDelete.customerID);

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
                        <h2>Xóa Người Dùng</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Bạn có chắc muốn xóa người dùng này không?</h3>
                    <p>Khách hàng: {dataUserDelete.customerID}?</p>
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

export default ModalDeleteUser;
