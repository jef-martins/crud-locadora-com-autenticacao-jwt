import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ){}

    async save(params: UserDto): Promise<UserEntity>{
        const saltRounds = 10;
        return this.repository.save({
            ...params,
            password: bcrypt.hashSync(params.password, saltRounds)
        });
    }

    async find(email: string): Promise<UserDto | undefined>{
        const response = await this.repository.findOne({
            where: {
              email: email
            }
        });
        return response;
    }
} 
