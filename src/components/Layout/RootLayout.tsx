import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setDeviceWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} 
                width={deviceWidth}
            />
            <div className="container mx-auto p-4">
                <Header onMenuClick={() => setSidebarOpen(true)}
                    width={deviceWidth}
                />
                <Outlet />
            </div>

        </div>
    );
};

export default RootLayout;