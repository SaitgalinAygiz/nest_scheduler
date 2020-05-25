import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, NativeError} from "mongoose";
import {ITeacher} from "./teacher.interface";
import {CreateTeacherDto} from "./dto/create-teacher.dto";
import {FindTeacherDto} from "./dto/find-teacher.dto";

@Injectable()
export class TeacherService {

    constructor(
        @InjectModel('Teacher')
        private readonly teacherModel: Model<ITeacher>
    ){
    }

    async create(createTeacherDto: CreateTeacherDto) {
        const createdTeacher = new this.teacherModel()
        createdTeacher.name = createTeacherDto.name
        createdTeacher.picture = null

        return await createdTeacher.save();
    }


    async delete(id: string) {
        return await this.teacherModel.deleteOne({'name': id}).exec();
    }

    async uploadFile(file: any, teacherId: string) {
        await this.teacherModel.findOne({'_id': teacherId})
            .exec(async function (err: NativeError, teacher: ITeacher){
            teacher.picture = file.filename
            return await teacher.save()
        })
    }

    async all() {
        return this.teacherModel.find();
    }

    async findById(findTeacherDto: FindTeacherDto) {
        return this.teacherModel.findById(findTeacherDto.id);
    }
}
