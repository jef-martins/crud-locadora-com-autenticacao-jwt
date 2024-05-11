import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { } 

    @UseGuards(AuthGuard('local'))
    @Post('authenticate')
    async authentication(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }
    
    @Post('save')
    async save(@Body() bodyParams: UserDto): Promise<any> {
        return this.userService.save(bodyParams);
    }
}
