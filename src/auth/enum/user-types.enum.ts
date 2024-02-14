import { registerEnumType } from "@nestjs/graphql";

export enum UserStatus{
    admin = "admin",
    user = "user"
} 

registerEnumType(UserStatus,{name:'BlockLocation'});