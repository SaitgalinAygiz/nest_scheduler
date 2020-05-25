import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Query, ValidationPipe} from "@nestjs/common";
import {StudentService} from "./student.service";
import {CreateStudentDto} from "./dto/create-student.dto";
import {IStudent} from "./student.interface";
import {FindGroupDto} from "../group/dto/find-group.dto";
import {IGroup} from "../group/group.interface";
import {FindStudentDto} from "./dto/find-student.dto";

@ApiTags('student')
@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {
    }

    @Post("/create")
    async create(@Body(new ValidationPipe()) createStudentDto: CreateStudentDto): Promise<IStudent> {
        return this.studentService.create(createStudentDto);
    }

    @Post("/findById")
    async findById(@Body(new ValidationPipe()) findStudentDto: FindStudentDto): Promise<IStudent> {
        return await this.studentService.findById(findStudentDto);
    }

    @Post("/all")
    async getAll(): Promise<IStudent[]> {
        return this.studentService.all();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.studentService.delete(id)
    }

}
