import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLayout from './UserLayout';

const queryClient = new QueryClient();
const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const pathname = useLocation().pathname;
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
        <QueryClientProvider client={queryClient}>
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
                <Toaster />
                {
                    pathname === '/login' || pathname === '/register' ?
                        <div className='flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900'>
                            <Outlet />
                        </div>
                        :
                        <UserLayout>
                        
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
                        </UserLayout>
                }
            </ConfigProvider>
        </QueryClientProvider>
    );
};

export default RootLayout;