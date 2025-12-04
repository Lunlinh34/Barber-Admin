import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Employee.module.scss';
import Image from '~/components/common/Image';
import CustomTable from '~/components/common/CustomTable/CustomTable';

// Service
import * as employeeServices from '~/services/employeeServices';

// Modal (cần tạo 2 modal: thêm và xóa)
import ModalDeleteEmployee from '~/components/feature/ModalDeleteEmployee/ModalDeleteEmployee';
import ModalAddEmployee from '~/components/feature/ModalAddEmployee/ModalAddEmployee';

const cx = classNames.bind(styles);

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataEmployeeDelete, setDataEmployeeDelete] = useState({});
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await employeeServices.getEmployee();
            if (result) setEmployees(result);
        };
        fetchApi();
    }, []);

    const handleDelete = (employee) => {
        setDataEmployeeDelete(employee);
        setIsShowModalDelete(true);
    };

    const handleAdd = () => {
        setIsShowModalAdd(true);
    };

    const headers = [
        'Mã Nhân Viên',
        'Họ & Tên Lót',
        'Tên',
        'Hình',
        'Email',
        'SDT',
        'Ngày Sinh',
        'Ngày Vào Làm',
        'Mã Người Dùng',
        'Làm Tại Cửa Hàng',
        'Mã Địa Chỉ',
    ];

    const tableData = employees.map((emp) => ({
    employeID: emp.employeID,
    firstName: emp.firstName,
    lastName: emp.lastName,
    picture: emp.picture,
    email: emp.email,
    numberphone: emp.numberphone,
    dateOfBirth: emp.dateOfBirth
        ? new Date(emp.dateOfBirth).toLocaleDateString('vi-VN')
        : '',
    wordDay: emp.wordDay
        ? new Date(emp.wordDay).toLocaleDateString('vi-VN')
        : '',
    userID: emp.userID,
    storeID: emp.storeID,
    addressID: emp.addressID,
}));


    return (
        <div>
            <div className={cx('list-user')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Danh Sách Nhân Viên</span>
                <Button variant="success" onClick={handleAdd}>
                    Thêm Nhân Viên
                </Button>
            </div>

            <CustomTable
                headers={headers}
                data={tableData}
                renderActions={(emp) => (
                    <Button variant="danger" size="sm" onClick={() => handleDelete(emp)}>
                        Xóa
                    </Button>
                )}
                variant="light"
            />

            {/* Modal Xóa */}
            <ModalDeleteEmployee
                show={isShowModalDelete}
                handleClose={() => setIsShowModalDelete(false)}
                dataEmployeeDelete={dataEmployeeDelete}
                setEmployees={setEmployees}
            />

            {/* Modal Thêm */}
            <ModalAddEmployee
                show={isShowModalAdd}
                handleClose={() => setIsShowModalAdd(false)}
                setEmployees={setEmployees}
            />
        </div>
    );
}

export default Employee;
