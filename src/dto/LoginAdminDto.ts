import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional } from "class-validator"
export class LoginDto {
  @IsEmail() 
  @IsNotEmpty() 
  email: string;
  @IsNotEmpty()
  password: string;
}
