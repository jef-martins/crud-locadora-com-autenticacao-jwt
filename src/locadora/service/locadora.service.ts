import { Repository } from 'typeorm';
import { FilmEntity } from '../entity/locadora.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDto } from '../dtos/locadora.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LocadoraService {

    constructor(
        @InjectRepository(FilmEntity)
        private readonly repository: Repository<FilmEntity>
    ){}

    async getOne(id: number): Promise<FilmEntity | undefined>{
        return await this.repository.findOne({
            where: {
              id
            }
        });
    }

    async getAll(): Promise<FilmEntity[]>{
        return await this.repository.find();
    }

    async create(params: FilmDto): Promise<FilmEntity>{
        return await this.repository.save(params);
    }
 
    async update(id: number, params: FilmDto): Promise<void>{
        const response =  await this.repository.update({id: id}, params);

        if(response.affected > 0)
            throw new HttpException("Alterado com Sucesso!!", HttpStatus.OK);
        else
            throw new HttpException('Falha ao atualizar', HttpStatus.BAD_REQUEST);
    }

    async delete(id: number): Promise<void>{
        const response = await this.repository.delete({id: id});
        
        if(response.affected > 0)
            throw new HttpException("", HttpStatus.NO_CONTENT);
        else
            throw new HttpException('Falha ao apagar', HttpStatus.BAD_REQUEST);
    }
}
 