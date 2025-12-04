import React from 'react';
import CIcon from '@coreui/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { cilBell, cilCalculator, cilCursor, cilNotes, cilPuzzle, cilSpeedometer } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import classNames from 'classnames/bind';

import styles from './_nav.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);
const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} className={cx('nav-icon')} />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'Components',
    },
    {
        component: CNavGroup,
        name: 'Account',
        to: '/account',
        icon: <CIcon icon={cilPuzzle} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'User',
                to: '/account/user',
            },
            {
                component: CNavItem,
                name: 'Role',
                to: '/account/role',
            },
            {
                component: CNavItem,
                name: 'Customer',
                to: '/account/customer',
            },
            {
                component: CNavItem,
                name: 'Employee',
                to: '/account/employee',
            },
            {
                component: CNavItem,
                name: 'UserAll',
                to: '/UserManagement',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Booking',
        to: '/booking',
        icon: <CIcon icon={cilCursor} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Dịch Vụ',
                to: '/booking/service',
            },
            {
                component: CNavItem,
                name: 'Loại Dịch Vụ',
                to: '/booking/serviceCategory',
            },
            {
                component: CNavItem,
                name: 'Lịch Đặt',
                to: '/booking/bookings',
            },
            {
                component: CNavItem,
                name: 'Nhà Cung Cấp',
                to: '/booking/producer',
            },
            {
                component: CNavItem,
                name: 'Sản Phẩm',
                to: '/booking/product',
            },
            {
                component: CNavItem,
                name: 'Loại Sản Phẩm',
                to: '/booking/category',
            },
            {
                component: CNavItem,
                name: 'Danh Sách Đặt Hàng',
                to: '/booking/order',
            },
            {
                component: CNavItem,
                name: 'Danh Sách Xác Nhận Đặt Hàng  ',
                to: '/booking/productOrder',
            },
            {
                component: CNavItem,
                name: ' Loại Thanh Toán',
                to: '/booking/payment',
            },
        ],
    },
     {
        component: CNavGroup,
        name: 'Quản Lý Đơn Đăng Ký Cửa Hàng ',
        icon: <CIcon icon={cilBell} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Quản Lý Đơn Đăng Ký ',
                to: '/AdminStoreRequestsPage',
            },
            {
                component: CNavItem,
                name: 'Evaluate',
                to: '/notifications/evaluate',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'WarehousePage',
        icon: <CIcon icon={cilCalculator} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Nhà Kho',
                to: '/warehousePage',
            },
            {
                component: CNavItem,
                name: 'Tạo Thống Kê Mới',
                to: '/revenue/generate',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'bookingOrderStatistic',
        icon: <CIcon icon={cilCalculator} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Thống Kê',
                to: '/BookingOrder-Statistic',
            },
            {
                component: CNavItem,
                name: 'Tạo Thống Kê Mới',
                to: '/revenue/generate',
            },
        ],
    },

    {
        component: CNavGroup,
        name: 'Stores',
        icon: <CIcon icon={cilNotes} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Store',
                to: '/storeManagementPage',
            },
            {
                component: CNavItem,
                name: 'Warehouse',
                to: '/stores/warehouse',
            },
            {
                component: CNavItem,
                name: 'WorkingHour',
                to: '/stores/workingHour',
            },
            {
                component: CNavItem,
                name: 'ServiceManagement',
                to: '/stores/serviceManagement',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Notifications',
        icon: <CIcon icon={cilBell} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Notification',
                to: '/notifications/Notification',
            },
            {
                component: CNavItem,
                name: 'Evaluate',
                to: '/notifications/evaluate',
            },
        ],
    },
    ,
    {
        component: CNavGroup,
        name: 'Location',
        icon: <CIcon icon={cilCalculator} className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'LocationStore',
                to: '/location/locationStore',
            },
            {
                component: CNavItem,
                name: 'Country',
                to: '/location/country',
            },
            {
                component: CNavItem,
                name: 'City',
                to: '/location/city',
            },
            {
                component: CNavItem,
                name: 'Address',
                to: '/location/address',
            },
        ],
    },
    {
        component: CNavTitle,
        name: 'Extras',
    },
    {
        component: CNavGroup,
        name: 'Settings',
        icon: <IconSettings className={cx('nav-icon')} />,
        items: [
            {
                component: CNavItem,
                name: 'Login',
                to: '/LoginNew',
            },
            {
                component: CNavItem,
                name: 'Register',
                to: config.routes.register,
            },
            {
                component: CNavItem,
                name: 'Error 404',
                to: config.routes.error404,
            },
            {
                component: CNavItem,
                name: 'Error 500',
                to: config.routes.error500,
            },
        ],
    },
];

export default _nav;
