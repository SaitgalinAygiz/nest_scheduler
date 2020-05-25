import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDate, IsNotEmpty, IsString} from "class-validator";

export class CreateConsultationDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    consultationType: string

    @ApiProperty()
    @IsArray()
    students: Array<string>

    @ApiProperty()
    @IsString()
    teacher: string

    @ApiProperty()
    @IsDate()
    time: Date
}
