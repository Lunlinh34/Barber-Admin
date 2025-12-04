import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './FormControl.module.scss';
import FormInput from './FormInput';

const cx = classNames.bind(styles);

function FormControl({ ...props }, ref) {
    const {
        medium,
        labelStyle,
        placeholder,
        name,
        type,
        value,
        setCurrentLogin,
        labelTitle,
        labelComeback,
        setUserName_L,
        setPassword_L,
        setFirstName,
        setLastName,
        setEmail,
        setPhone,
        personal,
        otherLabel,
        orderSize,
    } = props;

    return (
        <div className={cx('wrapper')}>
            <FormInput
                medium={medium}
                ref={ref}
                labelStyle={labelStyle}
                labelTitle={labelTitle}
                placeholder={placeholder}
                value={value}
                name={name}
                type={type}
                setCurrentLogin={setCurrentLogin}
                labelComeback={labelComeback}
                setUserName_L={setUserName_L}
                setPassword_L={setPassword_L}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setPhone={setPhone}
                personal={personal}
                otherLabel={otherLabel}
                orderSize={orderSize}
            />
        </div>
    );
}

export default forwardRef(FormControl);
