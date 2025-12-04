import React from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const DefaultLayout = () => {
    return (
        <div>
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header />
                <div className="body flex-grow-1 px-3">
                    <Content />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
