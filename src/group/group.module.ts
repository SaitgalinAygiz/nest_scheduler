import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from "./schemas/group.schema";
import {GroupService} from "./group.service";
import {GroupController} from "./group.controller";
import {StudentModule} from "../students/student.module";
import {StudentSchema} from "../students/schemas/student.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Group', schema: GroupSchema
            }
        ]),
        MongooseModule.forFeature([
            {
                name: 'Student', schema: StudentSchema
            }
        ])
    ],
    providers: [GroupService],
    exports: [
        GroupService,
        MongooseModule.forFeature([
            {
                name: 'Group', schema: GroupSchema
            }
        ])
    ],
    controllers: [GroupController]
})
export class GroupModule {}
