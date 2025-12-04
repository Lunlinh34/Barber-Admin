import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginNew';
import Register from './Pages/RegisterNeu';
import Page404 from './Pages/page404/Page404';
import Page500 from './Pages/page500/Page500';
import DefaultLayout from './components/Layouts/DefaultLayout';
import config from './config';

function App() {
    return (
        <HashRouter>
            <Suspense>
                <Routes>
                    <Route exact path={config.routes.login} name="Login Page" element={<Login />} />
                    <Route exact path={config.routes.register} name="Register Page" element={<Register />} />
                    <Route exact path={config.routes.error404} name="Page 404" element={<Page404 />} />
                    <Route exact path={config.routes.error500} name="Page 500" element={<Page500 />} />
                    <Route path="*" name="Home" element={<DefaultLayout />} />
                </Routes>
            </Suspense>
        </HashRouter>
    );
}   

export default App;
