import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { ConfigProvider } from 'antd';
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
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#7267F0', 
                    borderRadius: 5, 
                   
                },
            }}
        >
            <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
                    width={deviceWidth}
                />
                <div className="container mx-auto p-4 overflow-y-auto relative">
                    <Header onMenuClick={() => setSidebarOpen(true)}
                        width={deviceWidth}
                    />
                    <Outlet />
                </div>

            </div>
        </ConfigProvider>
    );
};

export default RootLayout;