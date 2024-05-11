import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let UserRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue:{
            find: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock)
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    UserRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(UserRepository).toBeDefined();
  });

  it('should return a user by email', async () => {
    jest.spyOn(service, 'find').mockResolvedValue(userEntityMock);
    const user = await service.find(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return undefined by email', async () => {
    jest.spyOn(service, 'find').mockResolvedValue(undefined);
    const user = await service.find(userEntityMock.email);

    expect(user).toEqual(undefined);
  });

  it('should return a user when saving', async () => {
    jest.spyOn(service, 'save').mockResolvedValue(userEntityMock);
    const user = await service.save(userEntityMock);

    expect(user).toEqual(userEntityMock);
  });

});
