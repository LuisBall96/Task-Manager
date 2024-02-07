import { registerEnumType } from "@nestjs/graphql";


export enum TaskStatus{
    Todo = 'To do',
    InProgress = 'En Progreso',
    Completed = 'Completed',
}

registerEnumType(TaskStatus, { name: 'TaskStatus' })