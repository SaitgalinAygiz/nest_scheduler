import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {TeacherSchema} from "./schemas/teacher.schema";
import {TeacherService} from "./teacher.service";
import {TeacherController} from "./teacher.controller";
import {MulterModule} from "@nestjs/platform-express";
import {GroupSchema} from "../group/schemas/group.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: "Teacher", schema: TeacherSchema
        }
        ]
    ),
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload',
            }),
        })
    ],
    providers: [TeacherService],
    exports: [TeacherService, MongooseModule.forFeature([
        {
            name: 'Group', schema: GroupSchema
        }
    ])],
    controllers: [TeacherController]
})
export class TeacherModule {

}
