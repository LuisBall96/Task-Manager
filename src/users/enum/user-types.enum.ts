import { registerEnumType } from "@nestjs/graphql";

export enum UserStatus{
    Admin = "Admin",
    User = "User"
} 

registerEnumType(UserStatus,{name:'BlockLocation'});