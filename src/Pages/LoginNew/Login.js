import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { IconEyeClosed, IconEye, IconLoader2 } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import Button from '~/components/common/Button';
import Image from '~/components/common/Image';
import SignInButton from '~/components/feature/SignInButton';
import FormControl from '~/components/feature/FormControl';
import styles from './Login.module.scss';
import config from '~/config';

import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function Login() {
    const inputNameRef = useRef();
    const [currentLogin, setCurrentLogin] = useState(true);
    const [currentUser, setCurrentUser] = useState(false);
    const [userName_L, setUserName_L] = useState('');
    const [password_L, setPassword_L] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        if (!userName_L || !password_L) {
            toast.error('Bạn chưa nhập tài khoản mật khẩu!');
            return;
        }
        setLoading(true);
        const result = await userServices.loginUser(userName_L, password_L);
        // console.log("vip", result);
        if (result?.data && result?.status === 200) {
            localStorage.setItem('token', result?.data);
            setCurrentUser(true);
            navigate('/book');
        } else if (result?.data === undefined) {
            inputNameRef.current.focus();
            toast.error('Tài khoản hoặc mặt khẩu sai!');
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
                        <Button href={config.routes.local}>
                            <Image
                                className={cx('logo')}
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-bat' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M17 16c.74 -2.286 2.778 -3.762 5 -3c-.173 -2.595 .13 -5.314 -2 -7.5c-1.708 2.648 -3.358 2.557 -5 2.5v-4l-3 2l-3 -2v4c-1.642 .057 -3.292 .148 -5 -2.5c-2.13 2.186 -1.827 4.905 -2 7.5c2.222 -.762 4.26 .714 5 3c2.593 0 3.889 .952 5 4c1.111 -3.048 2.407 -4 5 -4z' /%3E%3Cpath d='M9 8a3 3 0 0 0 6 0' /%3E%3C/svg%3E"
                                alt="web khóa học"
                            />
                        </Button>

                        <h1 className={cx('title')}>Đăng nhập vào Web</h1>
                    </div>
                    <div className={cx('body')}>
                        {currentLogin ? (
                            <div className={cx('mainStep')} onClick={() => handleShowForm()}>
                                <SignInButton />
                            </div>
                        ) : (
                            <>
                                <div className={cx('formBody')}>
                                    <FormControl
                                        ref={inputNameRef}
                                        labelTitle="Tên đăng nhâp"
                                        placeholder="Tên đăng nhập"
                                        name="username"
                                        type="text"
                                        value={userName_L}
                                        setUserName_L={setUserName_L}
                                        setCurrentLogin={setCurrentLogin}
                                    />
                                    <div className={cx('inputPassword')}>
                                        <FormControl
                                            labelStyle
                                            placeholder="Mật khẩu"
                                            name="password"
                                            type={inputType}
                                            value={password_L}
                                            setPassword_L={setPassword_L}
                                        />
                                        <IconPassword
                                            className={cx('icon')}
                                            size={20}
                                            onClick={() => setIsShowPassword(!isShowPassword)}
                                        />
                                    </div>

                                    <Button
                                        className={userName_L && password_L ? cx('btnSubmit') : cx('btnDisabled')}
                                        disabled={userName_L && password_L ? false : true}
                                        onClick={() => handleLogin()}
                                    >
                                        {loading && <IconLoader2 className={cx('loading')} size={20} />}
                                        &nbsp;Đăng nhập
                                    </Button>
                                </div>
                            </>
                        )}
                        <p className={cx('dontHaveAcc')}>
                            Bạn chưa có tài khoản?
                            <Link to="/register">Đăng ký</Link>
                        </p>
                        {currentLogin ? (
                            <div className={cx('displayNone')}></div>
                        ) : (
                            <p className={cx('forgotPassword')}>Quên mật khẩu?</p>
                        )}
                    </div>
                    <div className={cx('footer')}>
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <a href="http://localhost:3003/terms">Điều khoản sử dụng</a>
                        của chúng tôi.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
