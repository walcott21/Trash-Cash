
interface User{
    _id:string
    name:string
    email:string,
    access_token?:string,
    count?:any
    token_type:string
    disabled?:boolean
}

export type {User}