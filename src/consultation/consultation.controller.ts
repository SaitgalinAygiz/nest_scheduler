import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, ValidationPipe} from "@nestjs/common";
import {GroupService} from "../group/group.service";
import {ConsultationService} from "./consultation.service";
import {CreateGroupDto} from "../group/dto/create-group.dto";
import {IGroup} from "../group/group.interface";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {IConsultation} from "./consultation.interface";

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {

    constructor(
        private readonly consultationService: ConsultationService
    ) {}

    @Post("create")
    async create(@Body(new ValidationPipe()) createConsultationDto: CreateConsultationDto): Promise<IConsultation> {
        return await this.consultationService.create(createConsultationDto);
    }

    @Post("/all")
    async getAll(): Promise<IConsultation[]> {
        return this.consultationService.all();
    }
}
