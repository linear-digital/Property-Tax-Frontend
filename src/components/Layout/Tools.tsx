/* eslint-disable @typescript-eslint/no-explicit-any */
import { faBuilding, faChartPie, faFileInvoiceDollar, faGear, faUserLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router';

const Tools = () => {
    return (
        <div className='md:min-w-[350px] min-w-full'>
            <h2 className='text-lg p-4'>Shortcuts</h2>
            <div className="grid grid-cols-2 border-t border-l  border-gray-600">
                <ShortcutCard
                    path={'/property'}
                    title='Properties'
                    subtitle='Manage Properties'
                    icon={faBuilding}
                />
                <ShortcutCard
                    path={'/billing/invoices'}
                    title='Tax Bills'
                    subtitle='Manage Tax Bills'
                    icon={faFileInvoiceDollar}
                />
                <ShortcutCard
                    path={'/users/list'}
                    title='Users'
                    subtitle='Manage Users'
                    icon={faUsers}
                />
                <ShortcutCard
                    path={'/roles'}
                    title='Roles & Permissions'
                    subtitle='Manage Roles & Permissions'
                    icon={faUserLock}
                />
                <ShortcutCard
                    path={'/'}
                    title='Dashboard'
                    subtitle='Dashboard'
                    icon={faChartPie}
                />
                <ShortcutCard
                    path={'/'}
                    title='Setting'
                    subtitle='Account Settings'
                    icon={faGear}
                />
                
            </div>
        </div>
    );
};

export default Tools;

const ShortcutCard = ({ path, title, subtitle, icon }: {
    path: string,
    title: string,
    subtitle: string,
    icon?: any
}) => {
    const navigate = useNavigate();
    return <div
        onClick={() => navigate(path)}
        className='p-4 cursor-pointer flex flex-col justify-center items-center border-r border-gray-600 border-b'>
        <div className='p-3 rounded-full flex items-center justify-center dark:bg-dark bg-gray-200 lg:h-[50px] h-[40px] lg:w-[50px] w-[40px]'>
            <FontAwesomeIcon icon={icon} className='lg:text-xl text-lg dark:text-white text-dark' />
        </div>
        <h3 className='text-base mt-1'>{title}</h3>
        <h3 className='text-xs'>{subtitle}</h3>
    </div>
}