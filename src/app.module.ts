import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  // or your PostgreSQL server IP address
      port: 5432,
      username: 'postgres', // your PostgreSQL username
      password: 'postgres', // your PostgreSQL password
      database: 'funapp_db', // your PostgreSQL database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
