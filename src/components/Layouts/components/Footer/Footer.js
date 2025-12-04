import React from 'react';
import { CFooter } from '@coreui/react';

const Footer = () => {
    return (
        <CFooter>
            <div>
                <a href="/" target="_blank" rel="Barber shop">
                    BarberShop
                </a>
                <span className="ms-1">&copy; .</span>
            </div>
        </CFooter>
    );
};

export default React.memo(Footer);
