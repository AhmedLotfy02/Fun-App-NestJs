// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The latitude coordinate of the user', example: 30.0444 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'The longitude coordinate of the user', example: 31.2357 })
  @IsNumber()
  longitude: number;
}
