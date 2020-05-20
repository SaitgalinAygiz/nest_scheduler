import {ApiBody, ApiConsumes, ApiQuery, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete, Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {TeacherService} from "./teacher.service";
import {CreateStudentDto} from "../students/dto/create-student.dto";
import {ITeacher} from "./teacher.interface";
import {CreateTeacherDto} from "./dto/create-teacher.dto";
import {FileInterceptor} from "@nestjs/platform-express"
import {UploadFileDto} from "./dto/upload-file.dto";

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService) {
    }

    @Post("/create")
    async create(@Body(new ValidationPipe()) createTeacherDto: CreateTeacherDto): Promise<ITeacher> {
        return this.teacherService.create(createTeacherDto);
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Преподаватель',
        type: UploadFileDto,
    })
    async uploadFile(@UploadedFile() file, @Body() teacherId) {
        let teacher = JSON.parse(JSON.stringify(teacherId)).teacherId
        return await this.teacherService.uploadFile(file, teacher)
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
        console.log(image.toString())
        return res.sendFile(image, {root: 'upload'})
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.teacherService.delete(id)
    }
}
