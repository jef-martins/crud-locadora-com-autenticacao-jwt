import { Test, TestingModule } from '@nestjs/testing';
import { LocadoraService } from '../service/locadora.service';
import { FilmEntity } from '../entity/locadora.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { filmEntityMock } from './locadora.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LocadoraService', () => {
  let service: LocadoraService;
  let filmRepository: Repository<FilmEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocadoraService,
        {
          provide: getRepositoryToken(FilmEntity),
          useValue:{
            getOne: jest.fn().mockResolvedValue(filmEntityMock),
            getAll: jest.fn().mockResolvedValue(filmEntityMock),
            create: jest.fn().mockResolvedValue(filmEntityMock),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({})
          }
        }
      ],
    }).compile();

    service = module.get<LocadoraService>(LocadoraService);
    filmRepository = module.get<Repository<FilmEntity>>(getRepositoryToken(FilmEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(filmRepository).toBeDefined();
  });

  it('should return a film when getOne', async () => {
    jest.spyOn(service, 'getOne').mockResolvedValue(filmEntityMock);
    const film = await service.getOne(filmEntityMock.id);

    expect(film).toEqual(filmEntityMock);
  });

  it('should return undefined when getOne', async () => {
    jest.spyOn(service, 'getOne').mockResolvedValue(undefined);
    const film = await service.getOne(filmEntityMock.id);

    expect(film).toEqual(undefined);
  });

  it('should return all film when getAll', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([filmEntityMock]);
    const film = await service.getAll();

    expect(film).toEqual([filmEntityMock]);
  });

  it('should return empty array when getAll', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([]);
    const film = await service.getAll();

    expect(film).toEqual([]);
  });

  it('should return a film when create', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(filmEntityMock);
    const film = await service.create(filmEntityMock);

    expect(film).toEqual(filmEntityMock);
  });

  it('should throw an HttpException with the correct code status when update', async () => {
    jest.spyOn(service, 'update').mockRejectedValueOnce(new HttpException("Alterado com Sucesso!!", HttpStatus.OK))
    try {
      await service.update(filmEntityMock.id, filmEntityMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe("Alterado com Sucesso!!");
      expect(error.status).toBe(HttpStatus.OK);
    }
  });

  it('should throw an HttpException with the fail code status when update', async () => {
    jest.spyOn(service, 'update').mockRejectedValueOnce(new HttpException('Falha ao atualizar', HttpStatus.BAD_REQUEST))
    try {
      await service.update(filmEntityMock.id, filmEntityMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe("Falha ao atualizar");
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should throw an HttpException with the correct code status when delete', async () => {
    jest.spyOn(service, 'delete').mockRejectedValueOnce(new HttpException("", HttpStatus.NO_CONTENT))
    try {
      await service.delete(filmEntityMock.id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe("");
      expect(error.status).toBe(HttpStatus.NO_CONTENT);
    }
  });

  it('should throw an HttpException with the fail code status when delete', async () => {
    jest.spyOn(service, 'delete').mockRejectedValueOnce(new HttpException('Falha ao apagar', HttpStatus.BAD_REQUEST))
    try {
      await service.delete(filmEntityMock.id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Falha ao apagar');
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

});
