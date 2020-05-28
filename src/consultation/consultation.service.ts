import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, NativeError} from "mongoose";
import {IConsultation} from "./consultation.interface";
import {CreateConsultationDto} from "./dto/create-consultation.dto";

@Injectable()
export class ConsultationService {

    constructor(
        @InjectModel('Consultation')
        private readonly consultationModel: Model<IConsultation>,
    ) {

    }

    async create(createConsultationDto: CreateConsultationDto) {
        let createdConsultation = new this.consultationModel()
        createdConsultation.name = createConsultationDto.name
        createdConsultation.time = new Date(createConsultationDto.time)
        createdConsultation.consultationType = createConsultationDto.consultationType
        createdConsultation.description = createConsultationDto.description
        createdConsultation.students = createConsultationDto.students
        createdConsultation.teacher = createConsultationDto.teacher

        return await createdConsultation.save()
    }

    async all(): Promise<IConsultation[]> {
        return this.consultationModel.find();
    }

    //pizdec
    async findConsultationsByName(name: string): Promise<IConsultation[]> {
        const consultationModel = this.consultationModel;
        await this.consultationModel.find({'teacher': name})
            .exec(async function (err: NativeError, consultations: IConsultation[]) {
                if (consultations.length !== 0) {
                    return consultations;
                }
                await consultationModel.find({'students' : name})
                    .exec(async function (err: NativeError, consultations: IConsultation[]) {
                        if (consultations.length !== 0) {
                            return consultations;
                        }
                    })
            })
        return null;
    }
}
