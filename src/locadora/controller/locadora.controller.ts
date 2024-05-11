import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LocadoraService } from '../service/locadora.service';
import { FilmDto } from '../dtos/locadora.dto';
import { FilmEntity } from '../entity/locadora.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('locadora')
export class LocadoraController {

    constructor(
        private readonly locadoraService: LocadoraService
    ) { } 

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getOne(@Param('id') id: number): Promise<FilmEntity> {
        return await this.locadoraService.getOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<FilmEntity[]> {
        return await this.locadoraService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() bodyParams: FilmDto): Promise<FilmEntity> {
        return await this.locadoraService.create(bodyParams);
    }
 
    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async update(@Param('id') id: number, @Body() bodyParams: FilmDto): Promise<any> {
        return await this.locadoraService.update(id, bodyParams);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param('id') id: number): Promise<any> {
        return await this.locadoraService.delete(id);
    }
}
