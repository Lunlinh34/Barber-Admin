import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ModalEditRole.module.scss';

//service
import * as RoleServices from '~/services/roleServices';

const cx = classNames.bind(styles);

function ModalEditRole() {
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const location = useLocation();
    const findId = location.state.products;

    const navigate = useNavigate();

    useEffect(() => {
        if (findId !== undefined) {
            // setRoleId(findId.roleID);
            // setRoleName(findId.roleName);
            console.log('findId', findId);
        } else {
            toast.error('Vui lòng chọn role khác!');
            // navigate('/account/role');
        }
    }, [findId, navigate]);

    const handleEditRole = async () => {
        // const result = await RoleServices.updateRole(roleId, roleName);
        // if (result) {
        //     setRoleId('');
        //     setRoleName('');
        //     toast.success('Chỉnh sửa role thành công!');
        //     navigate('/account/role');
        // } else {
        //     toast.error('Chỉnh sửa role thất bại!');
        // }
    };

    return (
        <>
            <div className={cx('modal-add-role')}>
                <Form>
                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Nhập mã role</Form.Label>
                        <Form.Control
                            value={roleId}
                            className={cx('input-role')}
                            type="number"
                            placeholder={roleId}
                            disabled
                            onChange={(e) => {
                                setRoleId(parseInt(e.target.value));
                            }}
                        />
                    </Form.Group>

                    <Form.Group className={cx('mb-1')}>
                        <Form.Label>Nhập tên </Form.Label>
                        <Form.Control
                            value={roleName}
                            className={cx('input-role')}
                            type="text"
                            placeholder={roleName}
                            onChange={(e) => {
                                setRoleName(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>

            <div className={cx('btn-action')}>
                <Button variant="secondary" onClick={() => navigate('/account/role')}>
                    Quay lại
                </Button>
                <Button variant="primary" onClick={() => handleEditRole()}>
                    Lưu
                </Button>
            </div>
        </>
    );
}

export default ModalEditRole;
