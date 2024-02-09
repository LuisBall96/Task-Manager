import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup'})
  async signup (
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse>{
      return this.authService.signup( signupInput  )
  }


}
