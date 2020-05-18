import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly group: string


}
