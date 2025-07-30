import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { ConfigProvider, theme } from 'antd';
const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [isDarkMode, setIsDarkMode] = useState(false);
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
                    colorBgBase: isDarkMode ? '#24293C' : '#ffffff', // sets background
          colorBgContainer: isDarkMode ? '#24293C' : '#ffffff',
                },
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <div className='flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900'>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
                    width={deviceWidth}
                />
                <div className="container mx-auto p-4 overflow-y-auto relative">
                    <Header onMenuClick={() => setSidebarOpen(true)}
                        setIsDarkMode={setIsDarkMode}
                        width={deviceWidth}
                    />
                    <Outlet />
                </div>

            </div>
        </ConfigProvider>
    );
};

export default RootLayout;