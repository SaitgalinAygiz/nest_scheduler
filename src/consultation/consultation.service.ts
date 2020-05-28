import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IConsultation} from "./consultation.interface";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import * as _ from "lodash";

@Injectable()
export class ConsultationService {

    constructor(
        @InjectModel('Consultation')
        private readonly consultationModel: Model<IConsultation>,
    ) {

    }

    async create(createConsultationDto: CreateConsultationDto) {
        const createdConsultation = new this.consultationModel(_.assignIn(createConsultationDto))

        return await createdConsultation.save()
    }

    async all(): Promise<IConsultation[]> {
        return this.consultationModel.find();
    }
}
