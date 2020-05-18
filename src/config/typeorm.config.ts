import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '29H-pNH-mzv-ziT',
    database: 'scheduler',
    synchronize: true,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
    ]
};
