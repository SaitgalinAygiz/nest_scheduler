import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class SetTokenDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly authToken: string
}
