import { Injectable } from '@nestjs/common';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async authentication(username: string, password: string): Promise<UserDto | undefined>{
        const response = await this.userService.find(username)

        if (response && bcrypt.compareSync(password, response.password)) {
            return response;
        }

        return undefined
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
