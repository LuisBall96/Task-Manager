import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UserRoles } from './enum/user-types.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup'})
  async signup (
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse>{
      return this.authService.signup( signupInput )
  }


  @Mutation(() => AuthResponse, { name: 'login' })
  async login (
    @Args('loginInput') loginInput: LoginInput
  ): Promise <AuthResponse>{
    return this.authService.login( loginInput )
  }

  @Query(() => AuthResponse, { name: 'revalite' } )
  @UseGuards( JwtAuthGuard )
  revaliteToken(
    @CurrentUser([ UserRoles.admin ]) user: User
  ): AuthResponse{
    return this.authService.revalidateToken( user )

  }

}
