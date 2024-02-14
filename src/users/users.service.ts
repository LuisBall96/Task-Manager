import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { UserRoles } from '../auth/enum/user-types.enum';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>) {}

  async create(signupInput: SignupInput) : Promise <User> {

      const findUser = await this.userRepository.findOne({
        where : {
          email: signupInput.email
        }
      });
  
      if (findUser){
        throw new ConflictException (`User with email ${findUser.email} already registrered`)
      }
  
      const createUser = await this.userRepository.create({
        ...signupInput, password: bcrypt.hashSync( signupInput.password, 10 )
      })
  
      const newUser = await this.userRepository.save(createUser)
  
  
      return newUser;
  }

  findAll(): Promise<User[]> {
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

  async findOneByEmail(email: string): Promise <User> {
    
    const findUser = await this.userRepository.findOneByOrFail({email})
    
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

    const userUpdated = await this.userRepository.save(findUser)

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