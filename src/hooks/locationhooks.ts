// src/hooks/useFindData.ts
import { useEffect, useState } from 'react';
import { useLocation } from '../contexts/LocationContext';
import type { branch, District, Region, village } from '../types/locations';

type FindDataProps = {
    query: string;
};

export function useFindRegion({ query }: FindDataProps) {
    const { regions: data } = useLocation(); // assuming this gives all region data
    const [regions, setRegions] = useState<Region[]>([]);

    useEffect(() => {
        if (!query) {
            setRegions([]);
        } else {
            const filtered = data.filter((item) =>
                item.state === query
            );
            setRegions(filtered);
        }
    }, [query, data]); // added `data` dependency

    return regions;
}
export function useFindDistrict({ query }: FindDataProps) {
    const { districts: data } = useLocation(); // assuming this gives all region data
    const [districts, setDistricts] = useState<District[]>([]);
    useEffect(() => {
        if (!query) {
            setDistricts([]);
        } else {
            const filtered = data.filter((item) =>
                item.region === query
            );
            setDistricts(filtered);
        }
    }, [query, data]); // added `data` dependency

    return districts;
}

export function useFindVillage({ query }: FindDataProps) {
    const { villages: data } = useLocation(); // assuming this gives all region data
    const [districts, setDistricts] = useState<village[]>([]);

    useEffect(() => {
        if (!query) {
            setDistricts([]);
        } else {
            const filtered = data.filter((item) =>
                item.district === query
            );
            setDistricts(filtered);
        }
    }, [query, data]); // added `data` dependency

    return districts;
}
export function useFindBranch({ query }: FindDataProps) {
    const { branches: data } = useLocation(); // assuming this gives all region data
    const [districts, setDistricts] = useState<branch[]>([]);

    useEffect(() => {
        if (!query) {
            setDistricts([]);
        } else {
            const filtered = data.filter((item) =>
                item.village === query
            );
            setDistricts(filtered);
        }
    }, [query, data]); // added `data` dependency

    return districts;
}

