export interface User {
    username: string,
    password: string,
    salt: string,
    note:  string;
};

export type Users = User[];

