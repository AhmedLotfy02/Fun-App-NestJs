import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return user data if found', async () => {
      const user = new User();
      user.id = 1;
      user.name = 'John Doe';
      user.email = 'johndoe@example.com';
      user.city = 'Cairo';

      jest.spyOn(service, 'getUserById').mockResolvedValue(user);

      expect(await controller.getUser('1')).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(service, 'getUserById').mockRejectedValue(new NotFoundException());

      await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        latitude: 30.0444,
        longitude: 31.2357,
      };

      const user = new User();
      user.name = 'Jane Doe';
      user.email = 'janedoe@example.com';
      user.city = 'Cairo';

      jest.spyOn(service, 'createUser').mockResolvedValue(user);

      expect(await controller.signUp(createUserDto)).toEqual(user);
    });

    it('should throw BadRequestException if location is not in Egypt', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        latitude: 50.0444, // Out of Egypt bounds
        longitude: 10.2357,
      };

      await expect(controller.signUp(createUserDto)).rejects.toThrowError('Location not in Egypt');
    });
  });
});
