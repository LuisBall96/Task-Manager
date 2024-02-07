import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private taskRepository : Repository<Task>) {}


  async create(createTaskInput: CreateTaskInput): Promise <Task> {
    
    const createdTask = await this.taskRepository.create(createTaskInput)

    const newTask = await this.taskRepository.save(createdTask)

    return newTask

  }

  findAll() {
    return this.taskRepository.find()
  }

  async findOne(id: string): Promise <Task> {
    
    const findingTask = await this.taskRepository.findOneBy({ id })

    if (!findingTask) throw new NotFoundException(`Task with id ${findingTask.id} not found`)

    return findingTask;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {

    const findingTask = await this.taskRepository.findOneBy({ id })

    if (!findingTask) throw new NotFoundException(`Task with id ${findingTask.id} not found`)

    const updatingTask = await this.taskRepository.update(updateTaskInput.id, updateTaskInput)

    return findingTask

  }

  async remove(id: string): Promise <Task>  {
    const findingTask = await this.taskRepository.findOneBy({ id })

    if (!findingTask) throw new NotFoundException(`Task with id ${findingTask.id} not found`)

    const deletignTask = this.taskRepository.delete(id)
    
    return findingTask
    
  }
}
