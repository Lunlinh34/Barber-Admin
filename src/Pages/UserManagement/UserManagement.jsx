import { useState } from 'react';
import User from '../User/User';
import Employee from '../Employee/Employee';
import Customer from '../Customer/Customer';
import Form from 'react-bootstrap/Form';

function UserManagement() {
  const [selectedPage, setSelectedPage] = useState('user');

  const renderContent = () => {
    switch (selectedPage) {
      case 'user':
        return <User />;
      case 'employee':
        return <Employee />;
      case 'customer':
        return <Customer />;
      default:
        return <User />;
    }
  };

  return (
    <div>
      {/* ✅ Dropdown chọn trang */}
      <div style={{ width: 250, marginBottom: 20 }}>
        <Form.Select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        >
          <option value="user">Người dùng</option>
          <option value="employee">Nhân viên</option>
          <option value="customer">Khách hàng</option>
        </Form.Select>
      </div>

      {/* ✅ Nội dung */}
      {renderContent()}
    </div>
  );
}

export default UserManagement;
