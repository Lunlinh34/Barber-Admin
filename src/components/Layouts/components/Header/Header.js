import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CContainer, CHeader, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavLink, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons';

import Breadcrumb from '../Breadcrumb';
import HeaderDropdown from './HeaderDropdown.';
import { changeState } from '~/redux/slice/sidebarSlice';
import { sidebarSelector } from '~/redux/selectors';

const AppHeader = () => {
    const dispatch = useDispatch();
    const { sidebarShow } = useSelector(sidebarSelector);

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() =>
                        dispatch(
                            changeState({
                                sidebarShow: !sidebarShow,
                            }),
                        )
                    }
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/dashboard" component={NavLink}>
                            Dashboard
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Users</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Settings</CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilList} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg" />
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <HeaderDropdown />
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid>
                <Breadcrumb />
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
