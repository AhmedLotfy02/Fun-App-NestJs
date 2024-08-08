import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * Retrieves user profile information by ID.
   *
   * @param {string} userId - The ID of the user.
   * @throws {BadRequestException} If the user ID is invalid.
   * @return {Promise<User>} The user data if found.
   */
  @Get(':user_id')
  async getUser(@Param('user_id') userId: string): Promise<User> {
    try {
        return await this.userService.getUserById(Number(userId));
      } catch (error) {
        throw new BadRequestException(`Error retrieving user: ${error.message}`);
      }
  }
  /**
   * Signs up a new user with the given details.
   *
   * @param {CreateUserDto} createUserDto - The DTO containing user sign-up information.
   * @throws {BadRequestException} If the location is not in Egypt.
   * @return {Promise<User>} The newly created user.
   */
  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  async signUp(
    @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto,
  ): Promise<User> {
    const { name, email, latitude, longitude } = createUserDto;
    if (!this.isInEgypt(latitude, longitude)) {
      throw new BadRequestException('Location not in Egypt');
    }

    const city = this.getCityFromCoordinates(latitude, longitude);
    return this.userService.createUser(name, email, city);
  }
   /**
   * Checks if the given coordinates are within Egypt's boundaries.
   *
   * @param {number} latitude - The latitude coordinate.
   * @param {number} longitude - The longitude coordinate.
   * @return {boolean} True if the coordinates are in Egypt, otherwise false.
   */
  private isInEgypt(latitude: number, longitude: number): boolean {
    // Egypt bounding box (approx):
    return latitude >= 22.0 && latitude <= 31.0 && longitude >= 25.0 && longitude <= 35.0;
  }
/**
   * Derives the city name based on the given coordinates.
   *
   * @param {number} latitude - The latitude coordinate.
   * @param {number} longitude - The longitude coordinate.
   * @return {string} The derived city name.
   */
  private getCityFromCoordinates(latitude: number, longitude: number): string {
    // Simplified city retrieval based on coordinates
    if (latitude >= 30.0) {
      return 'Alexandria';
    }
    if (latitude >= 25.0) {
      return 'Luxor';
    }
    if (latitude >= 22.0) {
      return 'Aswan';
    }

    return 'Cairo';
  }
}
