import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

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





}
