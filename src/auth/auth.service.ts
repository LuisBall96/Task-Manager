import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

   constructor(
    private readonly userService: UsersService,
    private readonly jwtService : JwtService
   ) {}

   private getJwtToken( userId: string ) {
      return this.jwtService.sign({ id: userId })
   }

   async signup ( signupInput: SignupInput ) : Promise <AuthResponse>{

    const user = await this.userService.create( signupInput );

    const token = this.getJwtToken(user.id)
    return { token, user }

   } 

   async login ( loginInput: LoginInput) : Promise <AuthResponse>{

      const { email, password } = loginInput

      const user = await this.userService.findOneByEmail(email)

      if ( !bcrypt.compareSync( password ,user.password )){
         throw new BadGatewayException('Email / Password do not match ')
      }  

      const token = this.getJwtToken(user.id)

      return { token, user }

   }

   async validateUser ( id: string ) : Promise <User>{

      const user = await this.userService.findOne(id);

      if (!user.isActive)
         throw new UnauthorizedException(`The user is inactive `)

      delete user.password

      return user;
      
   }

   revalidateToken( user: User ) : AuthResponse {

      const token = this.getJwtToken(user.id)

      return { token, user }

   }

}
