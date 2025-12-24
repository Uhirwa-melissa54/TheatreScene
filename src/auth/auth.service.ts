import { AdminDto } from "src/dto/AdminDto";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "src/dto/LoginAdminDto";

export class AuthService{
    constructor(
          private prisma: PrismaService,  
    ){}
    async signUp(admindto:AdminDto){
    const hashedPassword=await argon2.hash(admindto.password)
     const admin = await this.prisma.admin.create({
        data: {
          firstName:admindto.firstName,
          lastName:admindto.lastName,
          email:admindto.email,
          password:hashedPassword,
          level:admindto.level,
          username:admindto.username,
          nationalId:admindto.nationalId
        },
      });

      


    }
    async login(logindto: LoginDto) {
  
  const user = await this.prisma.admin.findUnique({
    where: { email: logindto.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }
  const passwordMatch = await argon2.verify(
    user.password,
    logindto.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  
  return {
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
}

}