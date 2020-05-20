import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Param, Post, ValidationPipe} from "@nestjs/common";
import {CreateGroupDto} from "./dto/create-group.dto";
import {GroupService} from "./group.service";
import {FindGroupDto} from "./dto/find-group.dto";
import {IGroup} from "./group.interface";

@ApiTags('group')
@Controller('group')
export class GroupController {

    constructor(private readonly groupService: GroupService) {
    }

    @Post("/create")
    async create(@Body(new ValidationPipe()) createGroupDto: CreateGroupDto): Promise<IGroup> {
        return await this.groupService.create(createGroupDto);
    }

    @Post("/findById")
    async findById(@Body(new ValidationPipe()) findGroupDto: FindGroupDto): Promise<IGroup> {
        return await this.groupService.findById(findGroupDto);
    }

    @Post("/all")
    async getAll(): Promise<IGroup[]> {
        return this.groupService.all();
    }

    @Delete(':name')
    async delete(@Param('name') name: string) {
        return this.groupService.delete(name)
    }
}
