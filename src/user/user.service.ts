import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
 /**
   * Retrieves a user by their ID.
   *
   * @param {number} userId - The ID of the user to retrieve.
   * @throws {NotFoundException} If the user is not found.
   * @return {Promise<User>} The user data if found.
   */
  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
 /**
   * Creates a new user with the given name, email, and city.
   *
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} city - The city derived from the user's coordinates.
   * @return {Promise<User>} The created user entity.
   */
  async createUser(name: string, email: string, city: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const user = this.userRepository.create({ name, email, city });
    return this.userRepository.save(user);
  }
}
