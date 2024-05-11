import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { userEntityMock } from './user.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('authentication', () => {
    it('should return a user if authentication is successful', async () => {
      jest.spyOn(authService, 'authentication').mockResolvedValue(userEntityMock);
      const username = 'testuser';
      const password = 'testpassword';

      const result = await authService.authentication(username, password);

      expect(result).toEqual(userEntityMock);
    });

    it('should return undefined if authentication fails', async () => {
      const username = 'testuser';
      const password = 'wrongpassword';

      const result = await authService.authentication(username, password);

      expect(result).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should generate an access token', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue({access_token: "string_aleatoria"});
      const mockUser = {
        username: 'testuser',
        userId: 1,
      };

      const result = await authService.login(mockUser);

      expect(result).toEqual({access_token: "string_aleatoria"});
    });
  });
});

