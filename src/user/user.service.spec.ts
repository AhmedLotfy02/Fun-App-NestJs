import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const user = new User();
      user.id = 1;
      user.name = 'John Doe';
      user.email = 'johndoe@example.com';
      user.city = 'Cairo';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.getUserById(1)).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.getUserById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'johndoe@example.com';
      user.city = 'Cairo';

      // Mock the create and save methods directly
      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.createUser('John Doe', 'johndoe@example.com', 'Cairo')).toEqual(user);
    });
  });
});
