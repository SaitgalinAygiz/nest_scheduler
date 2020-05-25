import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, NativeError} from "mongoose";
import {IGroup} from "./group.interface";
import {CreateGroupDto} from "./dto/create-group.dto";
import {FindGroupDto} from "./dto/find-group.dto";
import {IStudent} from "../students/student.interface";
import {GroupStatusEnum} from "./enums/group-status.enum";

@Injectable()
export class GroupService {

    constructor(
        @InjectModel('Group')
        private readonly groupModel: Model<IGroup>,

        @InjectModel('Student')
        private readonly studentModel: Model<IStudent>

    ) {}

    async create(createGroupDto: CreateGroupDto): Promise<IGroup> {
        const createdGroup = new this.groupModel()
        createdGroup.name = createGroupDto.name
        createdGroup.students = []
        createdGroup.status = GroupStatusEnum.active

        return await createdGroup.save()
    }

    async findById(findGroupDto: FindGroupDto): Promise<IGroup> {
        return this.groupModel.findById(findGroupDto.id);
    }

    // TODO: пиздцкц
    async delete(name: string) {
        const studentModel = this.studentModel;
        await this.groupModel.findOne({'name': name})
            .exec(async function (err: NativeError, group: IGroup) {
                for (const student of group.students) {
                    await studentModel
                        .findOneAndDelete({'name': student})
                        .exec();
                }
            });

        return this.groupModel.deleteOne({'name': name}).exec();
    }

    async all(): Promise<IGroup[]> {
        return this.groupModel.find()
    }

}
