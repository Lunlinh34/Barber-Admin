import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalEditUser({ show, handleClose, dataUserEdit, handleUpdateUser }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [roleID, setRoleID] = useState(2);

  useEffect(() => {
    if (dataUserEdit) {
      setUserName(dataUserEdit.userName || '');
      setPassword(''); // không hiển thị mật khẩu cũ
      setRoleID(dataUserEdit.roleID || 2);
    }
  }, [dataUserEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // gọi callback từ component cha
    handleUpdateUser({
      ...dataUserEdit,
      userName,
      password,
      roleID,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa Thông Tin Người Dùng</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên Đăng Nhập</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật Khẩu Mới</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Để trống nếu không đổi"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>RoleID</Form.Label>
            <Form.Control
              type="number"
              value={roleID}
              onChange={(e) => setRoleID(Number(e.target.value))}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="submit" variant="primary">
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalEditUser;
