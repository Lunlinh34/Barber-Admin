import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import * as employeeServices from '~/services/employeeServices';
import * as userServices from '~/services/userServices';
import * as storeServices from '~/services/storeServices';
import * as customerServices from '~/services/customerService';
import * as addressServices from '~/services/addressServices';
import { publicRoutes as routes } from '~/routes';import { useNavigate } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';

function ModalAddEmployee({ show, handleClose, setEmployees }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        picture: '',
        email: '',
        numberphone: '',
        dateOfBirth: '',
        workDay: '',
        userID: 0,
        storeID: 0,
        addressID: 0,
    });

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [noAddressAlert, setNoAddressAlert] = useState(false); // hiển thị thông báo nếu user chưa có address

    // Load dữ liệu khi show modal
    useEffect(() => {
        if (show) {
            const fetchData = async () => {
                try {
                    const [usersData, storesData, customersData] = await Promise.all([
                        userServices.getUser(),
                        storeServices.getStore(),
                        customerServices.getCustomer(),
                    ]);
                    setUsers(usersData || []);
                    setStores(storesData || []);
                    setCustomers(customersData || []);
                } catch (err) {
                    console.error('Lỗi lấy dữ liệu:', err);
                }
            };
            fetchData();
        }
    }, [show]);

    // Khi chọn user
    const handleUserChange = async (e) => {
        const selectedUserID = parseInt(e.target.value);
        setFormData((prev) => ({
            ...prev,
            userID: selectedUserID,
            addressID: 0,
            workDay: new Date().toISOString().split('T')[0],
        }));

        if (!selectedUserID) {
            setFormData((prev) => ({
                ...prev,
                firstName: '',
                lastName: '',
                picture: '',
                email: '',
                dateOfBirth: '',
                numberphone: '',
            }));
            setAddresses([]);
            setNoAddressAlert(false);
            return;
        }

        // Lấy thông tin customer
        const customer = customers.find((c) => c.userID === selectedUserID);
        if (customer) {
            setFormData((prev) => ({
                ...prev,
                firstName: customer.firstName || '',
                lastName: customer.lastName || '',
                picture: customer.picture || '',
                email: customer.email || '',
                dateOfBirth: customer.dateOfBirth || '',
                numberphone: customer.numberphone || '',
            }));
        }

        // Lấy địa chỉ của user
        try {
            const allAddresses = await addressServices.getAddress();
            const userAddresses = allAddresses.filter((addr) => addr.userID === selectedUserID);
            setAddresses(userAddresses);

            if (userAddresses.length === 0) {
                setNoAddressAlert(true);
            } else {
                setNoAddressAlert(false);
            }
        } catch (err) {
            console.error('Lỗi lấy address:', err);
            setAddresses([]);
            setNoAddressAlert(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = () => {
        // Chuyển về trang User
        navigate('/account/user');
    };

    const handleSubmit = async () => {
        if (!formData.userID || formData.userID === 0) {
            alert('Vui lòng chọn người dùng!');
            return;
        }
        if (!formData.storeID || formData.storeID === 0) {
            alert('Vui lòng chọn cửa hàng!');
            return;
        }
        if (!formData.addressID || formData.addressID === 0) {
            setNoAddressAlert(true);
            return;
        }

        try {
            const employeeData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                picture: formData.picture,
                email: formData.email,
                numberphone: formData.numberphone,
                dateOfBirth: formData.dateOfBirth,
                workDay: new Date().toISOString(),
                userID: formData.userID,
                storeID: formData.storeID,
                addressID: formData.addressID,
            };

            const res = await employeeServices.createEmployee(employeeData);

            setEmployees((prev) => [...prev, res]);
            handleCloseModal();
        } catch (err) {
            console.error('Lỗi thêm nhân viên:', err);
            alert('Có lỗi xảy ra khi thêm nhân viên. Kiểm tra console để biết chi tiết.');
        }
    };

    const handleCloseModal = () => {
        handleClose();
        setFormData({
            firstName: '',
            lastName: '',
            picture: '',
            email: '',
            numberphone: '',
            dateOfBirth: '',
            workDay: '',
            userID: 0,
            storeID: 0,
            addressID: 0,
        });
        setAddresses([]);
        setNoAddressAlert(false);
    };

    const isButtonEnabled =
        formData.userID > 0 &&
        formData.storeID > 0 &&
        formData.addressID > 0 &&
        addresses.length > 0;

    return (
        <Modal show={show} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Nhân Viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Người Dùng</Form.Label>
                        <Form.Select value={formData.userID} onChange={handleUserChange}>
                            <option value={0}>Chọn User</option>
                            {users.map((user) => (
                                <option key={user.userID} value={user.userID}>
                                    {user.userName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {noAddressAlert && (
                        <Alert variant="warning">
                            User này chưa có địa chỉ. Vui lòng{' '}
                            <span
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={handleAddAddress}
                            >
                                thêm địa chỉ mới
                            </span>
                            .
                        </Alert>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Họ & Tên Lót</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type="text" name="lastName" value={formData.lastName} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hình</Form.Label>
                        <Form.Control type="text" value={formData.picture} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={formData.email} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" name="numberphone" value={formData.numberphone} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày Sinh</Form.Label>
                        <Form.Control type="date" value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày Vào Làm</Form.Label>
                        <Form.Control type="date" name="workDay" value={formData.workDay} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cửa Hàng</Form.Label>
                        <Form.Select name="storeID" value={formData.storeID} onChange={handleChange}>
                            <option value={0}>Chọn Cửa Hàng</option>
                            {stores.map((store) => (
                                <option key={store.storeID} value={store.storeID}>
                                    {store.storeName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Địa Chỉ</Form.Label>
                        <Form.Select
                            name="addressID"
                            value={formData.addressID}
                            onChange={handleChange}
                            disabled={addresses.length === 0}
                        >
                            <option value={0}>Chọn Địa Chỉ</option>
                            {addresses.map((addr) => (
                                <option key={addr.addressID} value={addr.addressID}>
                                    {`${addr.currentAddress}, ${addr.subDistrict}, ${addr.district}`}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Hủy
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={!isButtonEnabled}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddEmployee;
