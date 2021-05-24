import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Courses extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course_title: string;

    @Column()
    course_description: string;

    @Column({type: "float"})
    course_price: number;

    @Column()
    course_rating: number;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
    created_date: Date;
    
    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
    updated_date: Date;
}
