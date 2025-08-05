import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetcher } from '../util/axios.instance';
import { Spin } from 'antd';
import toast from 'react-hot-toast';
import { errorMessage } from '../util/errorMessage';
import type { branch, District, Region, StateType, village } from '../types/locations';

interface LocationContextType {
    states: StateType[]
    regions: Region[]
    districts: District[]
    villages: village[]
    branches: branch[]
    loading: boolean
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [states, setStates] = useState<StateType[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<village[]>([]);
    const [branches, setBranches] = useState<branch[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchLocations = async () => {
        try {
            setLoading(true)
            const data = await fetcher({
                path: '/location'
            })
            console.log(data);
            setStates(data.states || [])
            setRegions(data.regions || [])
            setDistricts(data.districts || [])
            setVillages(data.villages || [])
            setBranches(data.branches || [])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
            toast.error(errorMessage(error))
        }
    }
    useEffect(() => {
        fetchLocations()
    }, [])
    return (
        <LocationContext.Provider value={{
            states,
            regions,
            districts,
            villages,
            branches,
            loading
        }}>
            {
                loading ? <Spin spinning fullscreen size='large' /> :
                    children}
        </LocationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a ThemeProvider');
    }
    return context;
};