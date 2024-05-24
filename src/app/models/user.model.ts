export interface User {
    id?: string; 
    uid: string; 
    name: string;
    email: string;
    password?: string; 
    isAdmin?: boolean;
}