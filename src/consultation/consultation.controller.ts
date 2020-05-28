import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, ValidationPipe} from "@nestjs/common";
import {GroupService} from "../group/group.service";
import {ConsultationService} from "./consultation.service";
import {CreateGroupDto} from "../group/dto/create-group.dto";
import {IGroup} from "../group/group.interface";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {IConsultation} from "./consultation.interface";
import {FindByNameDto} from "./dto/find-by-name.dto";

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

    @Post("/findByName")
    async findByName(@Body(new ValidationPipe()) findByNameDto: FindByNameDto): Promise<IConsultation[]> {
        return this.consultationService.findConsultationsByName(findByNameDto.name)
    }
}
