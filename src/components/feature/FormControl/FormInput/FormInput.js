import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput({ medium, ...props }, ref) {
    const {
        labelStyle,
        placeholder,
        value,
        name,
        type,
        setCurrentLogin,
        labelTitle,
        labelComeback,
        setUserName_L,
        setPassword_L,
        setFirstName,
        setLastName,
        setEmail,
        personal,
        otherLabel,
        setPhone,
        orderSize,
    } = props;

    const wrapperClass = cx('wrapper', {
        personal,
    });

    const labelClass = cx('form-label', {
        otherLabel,
    });

    const classer = cx('inputWrap', {
        medium,
        orderSize,
    });
    const classers = cx('label', {
        medium,
        otherLabel,
    });
    const classes = cx('labelGroup', {
        labelStyle,
    });

    const classComeback = cx('label', 'right', {
        labelComeback,
    });
    const handleInputValue = (e) => {
        switch (name) {
            case 'username':
                setUserName_L(e.target.value);
                break;
            case 'password':
                setPassword_L(e.target.value);
                break;
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            default:
                return;
        }
    };
    return (
        <div className={wrapperClass}>
            {personal ? (
                <div className={labelClass}>
                    <label className={cx('label-Name')}>{labelTitle}</label>
                </div>
            ) : (
                <div className={classes}>
                    <label className={classers}>{labelTitle}</label>
                    <label
                        className={classComeback}
                        onClick={() => {
                            setCurrentLogin(true);
                        }}
                    >
                        Quay lại
                    </label>
                </div>
            )}
            <div className={classer}>
                <input
                    ref={ref}
                    value={value}
                    onChange={handleInputValue}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    maxLength={40}
                />
            </div>
        </div>
    );
}

export default forwardRef(FormInput);
