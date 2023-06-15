export interface User{
    email:string;
    password?:string;
    firstName:string;
    lastName:string;
    iat?: number,
    exp?: number
}
