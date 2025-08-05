export interface StateType {
    _id: string;
    name: string;
    code: string;
    boundaries: object;
}

export interface Region extends StateType {
    state: string;
}

export interface District extends StateType {
    region: string;
}
export interface village extends StateType {
    district: string;
}
export interface branch extends StateType {
    village: string;
}