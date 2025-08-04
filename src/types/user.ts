import type { Role } from "./role";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    mobile: string;
    designation: string;
    nid: string;
    state: string;
    region: string;
    district: string;
    village: string;
    branch: string;
    roles: Role[];
    disabled: boolean;
}