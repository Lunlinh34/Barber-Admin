import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { IconEyeClosed, IconEye } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Register.module.scss';
import Button from '~/components/common/Button';
import Image from '~/components/common/Image';
import SignInButton from '~/components/feature/SignInButton';
import FormControl from '~/components/feature/FormControl';

//Service
import * as userServices from '~/services/userServices';
import * as customerServices from '~/services/customerService';

const cx = classNames.bind(styles);

function Register() {
    const inputNameRef = useRef();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentLogin, setCurrentLogin] = useState(true);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleSaveUser = async () => {
        const result = await userServices.registerUser(userName, password);
        if (result?.status === 200) {
            const fetchApi = async () => {
                await customerServices.createCustomer(firstName, lastName, email, result?.data?.userID);
            };
            fetchApi();
            setUserName('');
            setPassword('');
            navigate('/login');
            toast.success('Đăng ký thành công...!');
        } else {
            inputNameRef.current.focus();
            toast.error('Đăng ký thất bại...!');
        }
    };

    let IconPassword = IconEyeClosed;

    let inputType = 'password';
    if (isShowPassword) {
        IconPassword = IconEye;
        inputType = 'text';
    }

    const handleShowForm = () => {
        setCurrentLogin(false);
    };

    return (
        <div className={cx('wrapper', 'hasBg')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Button href="http://localhost:3003/">
                            <Image
                                className={cx('logo')}
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-bat' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M17 16c.74 -2.286 2.778 -3.762 5 -3c-.173 -2.595 .13 -5.314 -2 -7.5c-1.708 2.648 -3.358 2.557 -5 2.5v-4l-3 2l-3 -2v4c-1.642 .057 -3.292 .148 -5 -2.5c-2.13 2.186 -1.827 4.905 -2 7.5c2.222 -.762 4.26 .714 5 3c2.593 0 3.889 .952 5 4c1.111 -3.048 2.407 -4 5 -4z' /%3E%3Cpath d='M9 8a3 3 0 0 0 6 0' /%3E%3C/svg%3E"
                                alt="web khóa học"
                            />
                        </Button>

                        <h1 className={cx('title')}>Đăng ký tài khoản</h1>
                    </div>
                    <div className={cx('body')}>
                        {currentLogin ? (
                            <div className={cx('mainStep')} onClick={() => handleShowForm()}>
                                <SignInButton />
                            </div>
                        ) : (
                            <>
                                <div className={cx('formBody')}>
                                    <div className={cx('form-name')}>
                                        <FormControl
                                            value={firstName}
                                            labelTitle="Họ"
                                            placeholder="Họ & Tên đệm"
                                            name="firstName"
                                            type="text"
                                            labelComeback
                                            setFirstName={setFirstName}
                                        />
                                        <FormControl
                                            medium="medium"
                                            value={lastName}
                                            labelTitle="Tên"
                                            placeholder="Tên"
                                            name="lastName"
                                            type="text"
                                            labelComeback
                                            setLastName={setLastName}
                                        />
                                    </div>
                                    <FormControl
                                        ref={inputNameRef}
                                        value={userName}
                                        labelComeback
                                        labelTitle="Tên đăng nhâp"
                                        placeholder="Tên đăng nhập"
                                        name="username"
                                        type="text"
                                        setUserName_L={setUserName}
                                    />

                                    <FormControl
                                        value={email}
                                        labelTitle="Email"
                                        placeholder="Địa chỉ email"
                                        name="email"
                                        type="text"
                                        setCurrentLogin={setCurrentLogin}
                                        setEmail={setEmail}
                                    />

                                    <div className={cx('inputPassword')}>
                                        <FormControl
                                            value={password}
                                            labelStyle
                                            placeholder="Mật khẩu"
                                            name="password"
                                            type={inputType}
                                            setPassword_L={setPassword}
                                        />

                                        <IconPassword
                                            className={cx('icon')}
                                            size={20}
                                            onClick={() => setIsShowPassword(!isShowPassword)}
                                        />
                                    </div>

                                    <Button
                                        className={userName && password ? cx('btnSubmit') : cx('btnDisabled')}
                                        disabled={userName && password ? false : true}
                                        onClick={() => handleSaveUser()}
                                    >
                                        Đăng ký
                                    </Button>
                                </div>
                            </>
                        )}
                        <p className={cx('dontHaveAcc')}>
                            Bạn chưa có tài khoản?
                            <Link to="/login">Đăng nhập</Link>
                        </p>
                        {currentLogin ? (
                            <div className={cx('displayNone')}></div>
                        ) : (
                            <p className={cx('forgotPassword')}>Quên mật khẩu?</p>
                        )}
                    </div>
                    <div className={cx('footer')}>
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <a href="http://locLinklhost:3003/terms">Điều khoản sử dụng</a>
                        của chúng tôi.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
