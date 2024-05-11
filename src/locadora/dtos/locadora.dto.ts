import { IsDate, IsNumber, IsString } from "class-validator";

export class FilmDto {
    @IsNumber()
    id: number;
    @IsString()
    title: string;
    @IsString() 
    sinopse: string;
    @IsString()
    director: string;
    @IsString() 
    actors: string;
    @IsDate() 
    release_date: Date;
  }