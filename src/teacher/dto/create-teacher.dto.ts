import {ApiProperty} from "@nestjs/swagger";
import {IS_MOBILE_PHONE, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class CreateTeacherDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsPhoneNumber('RU')
    @IsNotEmpty()
    readonly phoneNumber: string
}
