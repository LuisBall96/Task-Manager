import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserRoles } from "../enum/user-types.enum";
import { User } from "../../users/entities/user.entity";



export const CurrentUser =  createParamDecorator((roles: UserRoles[] = [], context: ExecutionContext ) => {

    const ctx = GqlExecutionContext.create( context );
    const user: User = ctx.getContext().req.user;

    if (!user)
        throw new InternalServerErrorException(`No user inside`)
 
    if( roles.length === 0 ) return user;

    for (const role of user.roles) {
        if( roles.includes( role as UserRoles )) {
            return user;
        }
    }

    throw new ForbiddenException( `User ${ user.fullName } need a valid role [ ${ roles } ]` )
});