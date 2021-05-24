import { NotFoundException } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

const mockCoursesRepository = ()=>({
    getAllCourses: jest.fn(),
    createCourse: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
});

describe('CoursesService', ()=>{
    let coursesService;
    let coursesRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers:[
                CoursesService,
                {provide: CoursesRepository, useFactory: mockCoursesRepository},
            ],
        }).compile();

        coursesService = await module.get<CoursesService>(CoursesService);
        coursesRepository = await module.get<CoursesRepository>(CoursesRepository);
    });

    describe('getCourses', ()=>{
        it('get all tasks', async()=>{
            coursesRepository.getAllCourses.mockResolvedValue('courses');

            expect(coursesRepository.getAllCourses).not.toHaveBeenCalled();
            const result = await coursesService.getAllCourses();
            expect(coursesRepository.getAllCourses).toHaveBeenCalled();
            expect(result).toEqual('courses');

        })
    });

    describe('getTaskById',()=>{
        it('calls coursesRepository.findOne() and successfully retrives and returns a value',async ()=>{
            const mockCourse = {course_title: 'some course', description: 'some description'}
            coursesRepository.findOne.mockResolvedValue(mockCourse);

            const result = await coursesService.getCourseById(1);
            expect(coursesRepository.findOne).toHaveBeenCalled();
            expect(result).toEqual(mockCourse);

            expect(coursesRepository.findOne).toHaveBeenCalledWith(1);
        });

        it('throws an error as course is not found',()=>{
            coursesRepository.findOne.mockResolvedValue(null);
            expect(coursesService.getCourseById(1)).rejects.toThrow(NotFoundException);
        });
    })

    describe('create course', ()=>{
        it('calls courseRepository.createCourse and returns the result', async ()=>{
            coursesRepository.createCourse.mockResolvedValue('create course');

            const course = {course_title:'course',course_description: 'course description',
                            course_price: 20, course_rating: 5}

            expect(coursesRepository.createCourse).not.toHaveBeenCalled();
            const result = await coursesService.createCourse(course);
            expect(coursesRepository.createCourse).toHaveBeenCalledWith(course);
            expect(result).toEqual('create course');
        })
    });

    describe('delete course', ()=>{
        it('calls courseRepository.delete and deletes the coure', async () => {
            coursesRepository.delete.mockResolvedValue({affected: 1});

            expect(coursesRepository.delete).not.toHaveBeenCalled();
            await coursesService.deleteCourse(1);
            expect(coursesRepository.delete).toHaveBeenCalledWith(1);
        });

        it('throws an error as course not found', async()=>{
            coursesRepository.delete.mockResolvedValue({affected: 0});
            expect(coursesService.deleteCourse(1)).rejects.toThrow(NotFoundException);
        })
    });

    describe('update course', ()=>{
        it('updates a task', async()=>{
            coursesService.getCourseById = jest.fn().mockResolvedValue({
                course_title : 'course title',
                course_description : 'course description',
                course_price : 'course price',
                course_rating : 'course rating'
            });

            expect(coursesService.getCourseById).not.toHaveBeenCalled();
            const result = await coursesService.updateCourse(1, {
                course_title : 'title',
                course_description : 'course description',
                course_price : 'course price',
                course_rating : 'course rating'
            });
            expect(coursesService.getCourseById).toHaveBeenCalled();
            expect(coursesRepository.save).toHaveBeenCalled();
            expect(result.course_title).toEqual('title');
        })
    })
})