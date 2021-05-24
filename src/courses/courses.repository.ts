import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Courses } from "./courses.entity";
import { CourseDto } from "./dto/course.dto";


@EntityRepository(Courses)
export class CoursesRepository extends Repository<Courses>{

    async getAllCourses(): Promise<Courses[]>{
        const query = this.createQueryBuilder('courses');
        const courses = await query.getMany();

        return courses;
    }

    async createCourse(createCourseDto: CourseDto): Promise<Courses>{
        const {course_title, course_description, course_price, course_rating} = createCourseDto;
        const course = new Courses();
        course.course_title = course_title;
        course.course_description = course_description;
        course.course_price = course_price;
        course.course_rating = course_rating;
        
        await course.save();

        return course;
    }
}