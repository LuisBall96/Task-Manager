import { BadGatewayException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs/login.input';

@Injectable()
export class AuthService {

   constructor(
    private readonly userService: UsersService
   ) {}

   async signup ( signupInput: SignupInput ) : Promise <AuthResponse>{

    const user = await this.userService.create( signupInput );

    const token = 'ABC123';

    return { token, user }

   } 

   async login ( loginInput: LoginInput) : Promise <AuthResponse>{

      const { email, password } = loginInput

      const user = await this.userService.findOneByEmail(email)

      if ( !bcrypt.compareSync( password ,user.password )){
         throw new BadGatewayException('Email / Password do not match ')
      }  

      const token = 'ABC123';

      return { token, user }

   }





}
