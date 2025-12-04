import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import * as userServices from '~/services/userServices';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Nếu đã login, kiểm tra role
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            if (currentUser.roleID === 1) {
                navigate('/dashboard'); // admin
            } else {
                alert('Bạn không có quyền truy cập trang này!');
                localStorage.removeItem('currentUser');
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const res = await userServices.loginUser(username, password);
            if (res && res.data) {
                const user = res.data;
                if (user.roleID === 1) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Đăng nhập thành công!');
                    navigate('/dashboard');
                } else {
                    alert('Bạn không có quyền truy cập trang này!');
                }
            } else {
                setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Đã xảy ra lỗi khi đăng nhập.');
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleLogin}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>

                                        {errorMessage && (
                                            <p className="text-danger">{errorMessage}</p>
                                        )}

                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>

                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Nếu bạn chưa có tài khoản thì bạn có thể đăng ký tài khoản tại đây.</p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
