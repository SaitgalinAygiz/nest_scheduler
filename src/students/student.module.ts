import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {StudentSchema} from "./schemas/student.schema";
import {StudentService} from "./student.service";
import {StudentController} from "./student.controller";
import {GroupModule} from "../group/group.module";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Student', schema: StudentSchema
        }
    ]),
        GroupModule
    ],
    providers: [StudentService],
    exports: [
        StudentService,
        MongooseModule.forFeature([
        {
            name: 'Student', schema: StudentSchema
        }
    ])
    ],
    controllers: [StudentController]}
)
export class StudentModule {}
