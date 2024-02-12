import { BadGatewayException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs/login.input';
import { JwtService } from '@nestjs/jwt';

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

    const token = this.jwtService.sign({ id: user.id  })
    return { token, user }

   } 

   async login ( loginInput: LoginInput) : Promise <AuthResponse>{

      const { email, password } = loginInput

      const user = await this.userService.findOneByEmail(email)

      if ( !bcrypt.compareSync( password ,user.password )){
         throw new BadGatewayException('Email / Password do not match ')
      }  

      const token = this.jwtService.sign({ id: user.id  })

      return { token, user }

   }





}
