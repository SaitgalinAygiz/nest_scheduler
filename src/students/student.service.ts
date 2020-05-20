import {InjectModel} from "@nestjs/mongoose";
import {IStudent} from "./student.interface";
import {Injectable} from "@nestjs/common";
import {Model, NativeError} from "mongoose";
import * as _ from "lodash";
import {CreateStudentDto} from "./dto/create-student.dto";
import {IGroup} from "../group/group.interface";

@Injectable()
export class StudentService {

    constructor(
        @InjectModel('Student')
        private readonly studentModel: Model<IStudent>,
        @InjectModel('Group')
        private readonly groupModel: Model<IGroup>
    ) {
    }

    async create(createStudentDto: CreateStudentDto): Promise<IStudent> {
        const createdStudent = new this.studentModel(_.assignIn(createStudentDto))
        const query = this.groupModel.findOne({ 'name': `${createStudentDto.group}` })

        await query.exec(async function (err: NativeError, group: IGroup) {
            group.students.push(createdStudent.name)
            await group.save()
        })

        return await createdStudent.save();
    }

    async all(): Promise<IStudent[]> {
        return this.studentModel.find();
    }

    // TODO: простите за говнокод, пишу ускоренно диплом
    async delete(id: string): Promise<void> {
        let studentName = null
        let studentGroup = null
        await this.studentModel.findOne({'_id': id})
            .exec(async function (err: NativeError, student: IStudent) {
            studentName = student.name;
            studentGroup = student.group
        })

        const query = this.studentModel.findOneAndDelete({'_id': id});
        await query.exec()

        await this.groupModel.findOne({'name' : studentGroup})
            .exec(async function (err: NativeError, group: IGroup){
                group.students = group.students.filter(student => {
                    return student.toString() !== studentName.toString()
                })
                return await group.save()
            })
    }

}
