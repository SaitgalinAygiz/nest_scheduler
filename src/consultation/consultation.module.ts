import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConsultationSchema} from "./schemas/consultation.schema";
import {ConsultationService} from "./consultation.service";
import {ConsultationController} from "./consultation.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Consultation', schema: ConsultationSchema
        }
    ])],
    providers: [ConsultationService],
    controllers: [ConsultationController],
    exports: [ConsultationService]
})
export class ConsultationModule {

}
