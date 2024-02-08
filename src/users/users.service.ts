import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>) {}

  async create(createUserInput: CreateUserInput) : Promise <User> {

    const findUser = await this.userRepository.findOne({
      where : {
        email: createUserInput.email
      }
    });

    if (findUser){
      throw new ConflictException (`User with email ${findUser.email} already registrered`)
    }

    const createUser = await this.userRepository.create(createUserInput)

    const newUser = await this.userRepository.save(createUser)


    return newUser;
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string): Promise <User> {
    
    const findUser = await this.userRepository.findOne({
      where: {
        id
      }
    }) 

    if (!findUser){
      throw new NotFoundException(`User with ${ id } not found`)
    }

    return findUser

  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise <User> {

    const findUser = await this.userRepository.findOne({
      where: {
        id
      }
    }) 

    if (!findUser){
      throw new NotFoundException(`User with ${ id } not found`)
    }

    const user = await this.userRepository.update(updateUserInput.id, updateUserInput)

    return findUser;
    
  }

  async remove(id: string): Promise <User> {
    const findUser = this.userRepository.findOne({
      where: {
        id
      }
    }) 

    if (!findUser){
      throw new NotFoundException(`User with ${ id } not found`)
    }

    const user = await this.userRepository.delete((await findUser).id)

    return findUser;

  }
}