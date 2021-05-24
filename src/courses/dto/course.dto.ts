import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";


export class CourseDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    course_title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    course_description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    course_price: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    course_rating: number;
}