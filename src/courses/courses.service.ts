import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from './courses.entity';
// import { Courses } from './courses.model';
import { CoursesRepository } from './courses.repository';
import { CourseDto } from './dto/course.dto';


@Injectable()
export class CoursesService {
    constructor(
      @InjectRepository(CoursesRepository)
      private coursesRepository: CoursesRepository,
    ){}

    async getAllCourses():Promise<Courses[]>{
      return this.coursesRepository.getAllCourses();
    }
    async getCourseById(id: number): Promise<Courses>{
      const found = await this.coursesRepository.findOne(id);
        if(!found){
          throw new NotFoundException('Course Not Found!!');
        }
        return found;
    }

    async createCourse(createCourseDto: CourseDto): Promise<Courses>{
      return this.coursesRepository.createCourse(createCourseDto);
    }

    async deleteCourse(id: number): Promise<string>{
      const result = await this.coursesRepository.delete(id);
      if(result.affected === 0){
        throw new NotFoundException('Course to be deleted, Not Found !!');
      }
      return "Deleted";
    }

    async updateCourse(id:number, updateCourseDto: CourseDto): Promise<Courses>{
      const course = await this.getCourseById(id);
      const {course_title, course_description, course_price, course_rating} = updateCourseDto;
  
      course.course_title = course_title;
      course.course_description = course_description;
      course.course_price = course_price;
      course.course_rating = course_rating;
  
      await this.coursesRepository.save(course);
  
      return course;
    }
  
  
}
