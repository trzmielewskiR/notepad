export interface User {
    username: string,
    password: string,
    note?: string;
};

export type Users = User[];