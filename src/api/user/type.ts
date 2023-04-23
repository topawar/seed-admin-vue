export interface User {
    id: number,
    uid: string,
    name: string,
    password: string,
    gender: string,
    age: number,
    effectiveTag: number,
    imageurl: string,
    role: number,
    create_time: string,
    update_time: string,
}



export interface UpdateUser{
    id: number,
    name: string,
    password: string,
    gender: string,
    age: number,
    effectiveTag: number,
    role: number,
    updateTime?:string,
    imageurl:string,
}

export interface LoginParam{
    name: string,
    password: string,
}