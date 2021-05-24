import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CoursesRepository])
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
