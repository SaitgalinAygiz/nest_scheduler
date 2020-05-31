import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConsultationSchema} from "./schemas/consultation.schema";
import {ConsultationService} from "./consultation.service";
import {ConsultationController} from "./consultation.controller";
import {TeacherService} from "../teacher/teacher.service";
import {TeacherModule} from "../teacher/teacher.module";
import {StudentModule} from "../students/student.module";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Consultation', schema: ConsultationSchema
        },

    ]),
        TeacherModule,
        StudentModule
    ],
    providers: [ConsultationService],
    controllers: [ConsultationController],
    exports: [ConsultationService]
})
export class ConsultationModule {

}
