import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional } from "class-validator"
export class AdminDto{
@IsEmail()
@IsNotEmpty()   
email:string
@IsNotEmpty()
password:string
@IsNotEmpty()
firstName:string
@IsNotEmpty()
lastName:string
@IsNotEmpty()
nationalId:string
@IsNotEmpty()
username:string
@IsNotEmpty()
level:string

}
