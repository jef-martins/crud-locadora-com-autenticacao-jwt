import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocadoraModule } from './locadora/locadora.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './locadora/entity/locadora.entity';
import { UserEntity } from './locadora/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
			envFilePath: ['.env']
		}),
    TypeOrmModule.forRoot({ 
			type: 'postgres',
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			entities: [FilmEntity,UserEntity],
			migrations: [`${__dirname}/locadora/migration/{.ts,*.js}`],
      		migrationsRun: true,
		}),
    LocadoraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
