import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'postgres',
    password:'000000',
    database:'courses',
    entities: ['dist/**/*.entity.js'],
    synchronize: true
}