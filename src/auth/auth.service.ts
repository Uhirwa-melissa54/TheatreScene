import { AdminDto } from "src/dto/AdminDto";
import * as argon2 from "argon2";

export class AuthService{
    async signUp(admindto:AdminDto){
    const hashedPassword=await argon2.hash(admindto.password)

    }
}