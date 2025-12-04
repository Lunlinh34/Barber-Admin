import { Modal, Button } from 'react-bootstrap';
import * as employeeServices from '~/services/employeeServices';

function ModalDeleteEmployee({ show, handleClose, dataEmployeeDelete, setEmployees }) {
    
    const handleConfirmDelete = async () => {
        try {
            await employeeServices.deleteEmployee(dataEmployeeDelete.employeID);

            // Cập nhật lại danh sách employees sau khi xóa
            setEmployees(prev => prev.filter(emp => emp.employeID !== dataEmployeeDelete.employeID));

            handleClose(); // đóng modal
        } catch (error) {
            console.error('Lỗi xóa nhân viên:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xóa Nhân Viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa nhân viên: <b>{dataEmployeeDelete.firstName} {dataEmployeeDelete.lastName}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteEmployee;
