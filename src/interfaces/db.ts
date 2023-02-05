export interface User {
    id?: number;
    jwtoken?: string;
    username: string;
    password?: string;
}
export interface UserAddress {
    id?: number;
    userId?: number;
    receiveAddress: string;
}
export interface UserBalance {
    id?: number;
    userId: number;
    amount: number;
}

export enum paymentMethod {
    BTC = 'BTC',
    LN = 'LN',
}

export enum recurringType {
    hourly = 'hourly',
    daily = 'daily',
    weekly = 'weekly',
    monthly = 'monthly',
}

export interface order {
    id?: number;
    userId: number;
    amount: number;
    outputAddress: string;
    layer: paymentMethod;
    payableOn: Date;
    recurring?: recurringType;
}

export interface TransactionLogs {
    id?: number;
    userId?: number;
    amount: number;
    txid: string;
    status: number;
    type: string;
}