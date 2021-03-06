import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    @IsDateString()
    time: Date
}
