import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonNew.module.scss';

const cx = classNames.bind(styles);

function ButtonNew({
    children,
    onClick,
    type = 'button', // button / submit
    variant = 'primary', // primary / lightBlue / outline
    size = 'medium', // small / medium / large
    rounded = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    ...props
}) {
    const classes = cx('wrapper', variant, size, { rounded, disabled }, className);

    return (
        <button
            type={type}
            className={classes}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            {...props}
        >
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </button>
    );
}

ButtonNew.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'lightBlue', 'outline']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
};

export default ButtonNew;
