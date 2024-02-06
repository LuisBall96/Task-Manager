import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

  async create(createUserInput: CreateUserInput) {

    const findUser = await this.userRepository.findOne({
      where : {
        userName: createUserInput.userName
      }
    });

    if (findUser){
      return new HttpException('User already registrered',
      HttpStatus.CONFLICT)
    }

    const createUser = await this.userRepository.create(createUserInput)

    const newUser = await this.userRepository.save(createUser)


    return newUser;
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    
    const findUser = this.userRepository.findOne({
      where: {
        id
      }
    }) 

    if (!findUser){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return findUser

  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
