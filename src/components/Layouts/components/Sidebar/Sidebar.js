import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames/bind';

import config from '~/config';
import images from '~/assets/images';
import { SidebarNav } from './SidebarNav';
import navigation from '~/components/Layouts/components/Nav';
import Image from '~/components/common/Image';
import styles from './Sidebar.module.scss';
import { changeState } from '~/redux/slice/sidebarSlice';
import { sidebarSelector } from '~/redux/selectors';
const cx = classNames.bind(styles);
const Sidebar = () => {
    const dispatch = useDispatch();
    const { sidebarShow } = useSelector(sidebarSelector);

    return (
        <CSidebar
                className={cx('sidebar')}

            position="fixed"
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch(
                    changeState({
                        sidebarShow: visible,
                    }),
                );
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to={config.routes.home}>
                <Image className={cx('logo-image')} src={images.site_logo} alt="logo" />
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <SidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
        </CSidebar>
    );
};

export default React.memo(Sidebar);
