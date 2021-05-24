import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Courses } from './courses.entity';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';


@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}
  
 @Get()
  getAllCourses():Promise<Courses[]>{
    return this.coursesService.getAllCourses();
  }
  @Get('/:id')
  getCourseById(@Param('id', ParseIntPipe) id: number): Promise<Courses>{
    return this.coursesService.getCourseById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCourse(@Body() createCourseDto: CourseDto): Promise<Courses>{
    return this.coursesService.createCourse(createCourseDto);
  }

  @Delete('/:id')
  deleteCourse(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.coursesService.deleteCourse(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateCourse(
    @Body() updateCourseDto: CourseDto,
    @Param('id', ParseIntPipe) id: number
  ) :Promise<Courses>{
    return this.coursesService.updateCourse(id, updateCourseDto);
  }
}
