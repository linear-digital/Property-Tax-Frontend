import React from 'react';
import { UserProvider } from '../../contexts/UserContext';
import { LocationProvider } from '../../contexts/LocationContext';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocationProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </LocationProvider>
    );
};

export default UserLayout;