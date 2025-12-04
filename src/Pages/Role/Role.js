import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './Role.module.scss';

// Components
import CustomTable from '~/components/common/CustomTable/CustomTable';
import { ModalDeleteRole } from '~/components/feature/ModalsRole';

// Service
import * as RoleServices from '~/services/roleServices';

const cx = classNames.bind(styles);

function Role() {
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataRoleDelete, setDataRoleDelete] = useState({});
    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await RoleServices.getRole();
            if (result) setRoles(result);
        };
        fetchApi();
    }, []);

    const handleAddRole = () => {
        navigate('/account/role/addRole');
    };

    const handleEdit = (role) => {
        navigate(`/account/role/editRole`, { state: { role } });
    };

    const handleClose = () => setIsShowModalDelete(false);

    const handleDelete = (role) => {
        setIsShowModalDelete(true);
        setDataRoleDelete(role);
    };

    // 🔹 Dữ liệu cho CustomTable
    const headers = ['Mã Role', 'Tên Role'];
    const tableData = roles.map(role => ({
        roleID: role.roleID,
        roleName: role.roleName,
    }));

    return (
        <div className={cx('role-page')}>
            <div className={cx('list-role-header')}>
                <h3>Danh Sách Role</h3>
                <Button variant="success" onClick={handleAddRole}>
                    ➕ Thêm Role
                </Button>
            </div>

            <CustomTable
                headers={headers}
                data={tableData}
                variant="light"
                renderActions={(item) => (
                    <>
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleEdit(item)}
                        >
                            Sửa
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            style={{ marginLeft: '6px' }}
                            onClick={() => handleDelete(item)}
                        >
                            Xoá
                        </Button>
                    </>
                )}
            />

            <ModalDeleteRole
                show={isShowModalDelete}
                handleClose={handleClose}
                dataRoleDelete={dataRoleDelete}
                setRole={setRoles}
            />
        </div>
    );
}

export default Role;
