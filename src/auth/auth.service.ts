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
          password:hashedPassword,
          level:admindto.level,
          username:admindto.username,
          nationalId:admindto.nationalId
        },
      });

      


    }
    async login(logindto: LoginDto) {
  // 1. find user
  const user = await this.prisma.user.findUnique({
    where: { email: logindto.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. verify password
  const passwordMatch = await argon2.verify(
    user.password,
    logindto.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. return user (later → JWT)
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