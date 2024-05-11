import { Module } from '@nestjs/common';
import { LocadoraService } from './service/locadora.service';
import { LocadoraController } from './controller/locadora.controller';
import { FilmEntity } from './entity/locadora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    TypeOrmModule.forFeature([FilmEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    LocadoraService, 
    UserService, 
    AuthService, 
    FilmEntity, 
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [LocadoraController, UserController]
})
export class LocadoraModule {}
