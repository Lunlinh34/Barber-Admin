import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

import config from '~/config';
import { publicRoutes } from '~/routes';

const Content = () => {
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {publicRoutes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element />}
                                />
                            )
                        );
                    })}
                    <Route path={config.routes.home} element={<Navigate to="dashboard" replace />} />
                </Routes>
            </Suspense>
        </CContainer>
    );
};

export default React.memo(Content);
