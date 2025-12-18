import { AdminDto } from "src/dto/AdminDto";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";

export class AuthService{
    constructor(
          private prisma: PrismaService,  
    ){}
    async signUp(admindto:AdminDto){
    const hashedPassword=await argon2.hash(admindto.password)
     const admin = await this.prisma.user.create({
        data: {
          firstName:admindto.firstName,
          lastName:admindto.lastName,
          email:admindto.email,
          password:admindto.password,
          level:admindto.level,
          username:admindto.username,
          nationalId:admindto.nationalId

        
        },
      });


    }
}