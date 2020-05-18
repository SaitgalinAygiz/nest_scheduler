import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {IGroup} from "./group.interface";
import * as _ from "lodash";
import {CreateGroupDto} from "./dto/create-group.dto";
import {FindGroupDto} from "./dto/find-group.dto";
import {IStudent} from "../students/student.interface";

@Injectable()
export class GroupService {

    constructor(
        @InjectModel('Group')
        private readonly groupModel: Model<IGroup>,

        @InjectModel('Student')
        private readonly studentModel: Model<IStudent>

    ) {}

    async create(createGroupDto: CreateGroupDto): Promise<IGroup> {
        const createdGroup = new this.groupModel(_.assignIn(createGroupDto))
        return await createdGroup.save()
    }

    async findById(findGroupDto: FindGroupDto): Promise<IGroup> {
        return this.groupModel.findById(findGroupDto.id);
    }

    async delete(_id: string) {
        return this.groupModel.deleteOne({_id});
    }

    async all(): Promise<IGroup[]> {
        return this.groupModel.find()
    }

}
