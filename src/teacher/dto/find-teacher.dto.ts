import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class FindTeacherDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly id: string
}
