// import classNames from 'classnames/bind';
// import { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';

// import ModalDeleteUser from '~/components/feature/ModalsUser';
// import styles from './User.module.scss';

// //Service
// import * as userServices from '~/services/userServices';

// const cx = classNames.bind(styles);
// function User() {
//     const [isShowModalDelete, setIsShowModalDelete] = useState(false);
//     const [dataUserDelete, setDataUserDelete] = useState({});
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const result = await userServices.getUser();
//             if (result) {
//                 setUsers(result);
//             }
//         };

//         fetchApi();
//     }, []);

//     const handleClose = () => {
//         setIsShowModalDelete(false);
//     };

//     const handleDelete = (user) => {
//         setIsShowModalDelete(true);
//         setDataUserDelete(user);
//     };

//     return (
//         <div>
//             <div className={cx('list-user')}>
//                 <span>Danh Sách Người Dùng</span>
//             </div>
//             <Table striped bordered hover variant="dark" responsive="sm" className={cx('table-user')}>
//                 <thead>
//                     <tr>
//                         <th>Mã Người Dùng</th>
//                         <th>Tên Đăng Nhập</th>
//                         <th>Mật Khẩu</th>
//                         <th>RoleID</th>
//                         <th>Chức Năng</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={`user-${index}`}>
//                             <td>{user.userID}</td>
//                             <td>{user.userName}</td>
//                             <td>{user.password}</td>
//                             <td>{user.roleID}</td>
//                             <td className={cx('btn-action')}>
//                                 <Button variant="outline-danger" size="lg" onClick={() => handleDelete(user)}>
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <ModalDeleteUser
//                 show={isShowModalDelete}
//                 handleClose={handleClose}
//                 dataUserDelete={dataUserDelete}
//                 setUsers={setUsers}
//             />
//         </div>
//     );
// }

// export default User;
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CustomTable from '~/components/common/CustomTable/CustomTable';
import ModalDeleteUser from '~/components/feature/ModalsUser';
import ModalEditUser from '~/components/feature/ModalEditUser/ModalEditUser';
import ModalAddAddress from '~/components/feature/ModalAddAddress/ModalAddAddress'; // import modal mới
import * as userServices from '~/services/userServices';
import * as addressServices from '~/services/addressServices';
import styles from './User.module.scss';

function User() {
  const [users, setUsers] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModalAddAddress, setIsShowModalAddAddress] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUser();
      if (result) setUsers(result);
    };
    fetchApi();
  }, []);

  const handleDelete = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleEdit = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleAddAddress = (userID) => {
    setCurrentUserID(userID);
    setIsShowModalAddAddress(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await userServices.updateUser(
        updatedUser.userID,
        updatedUser.userName,
        updatedUser.password,
        updatedUser.roleID
      );
      setUsers(prev =>
        prev.map(u => (u.userID === updatedUser.userID ? updatedUser : u))
      );
      setIsShowModalEdit(false);
    } catch (error) {
      console.error('Lỗi cập nhật người dùng:', error);
    }
  };

  const handleAddAddressSuccess = (newAddress) => {
    console.log('Địa chỉ mới:', newAddress);
    setIsShowModalAddAddress(false);
  };

  const headers = ['Mã Người Dùng', 'Tên Đăng Nhập', 'Mật Khẩu'];
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>Danh Sách Người Dùng</h3>
      <CustomTable
        headers={headers}
        data={users.map(user => ({
          ...user,
          password: user.password ? '*******' : '',
        }))}
        renderActions={(user) => (
          <>
            <Button variant="info" size="sm" style={{ marginRight: 5 }} onClick={() => handleEdit(user)}>Sửa</Button>
            <Button variant="info" size="sm" style={{ marginRight: 5 }} onClick={() => handleAddAddress(user.userID)}>Thêm Address</Button>
            <Button variant="info" size="sm" style={{ marginRight: 5 }} onClick={() => handleDelete(user)}>Xóa</Button>
          </>
        )}
      />

      <ModalDeleteUser
        show={isShowModalDelete}
        handleClose={() => setIsShowModalDelete(false)}
        dataUserDelete={dataUserDelete}
        setUsers={setUsers}
      />

      <ModalEditUser
        show={isShowModalEdit}
        handleClose={() => setIsShowModalEdit(false)}
        dataUserEdit={dataUserEdit}
        handleUpdateUser={handleUpdateUser}
      />

      <ModalAddAddress
        show={isShowModalAddAddress}
        handleClose={() => setIsShowModalAddAddress(false)}
        userID={currentUserID}
        onAddAddress={handleAddAddressSuccess}
      />
    </div>
  );
}

export default User;
