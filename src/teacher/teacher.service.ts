import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, NativeError} from "mongoose";
import {ITeacher} from "./teacher.interface";
import {CreateTeacherDto} from "./dto/create-teacher.dto";
import {FindTeacherDto} from "./dto/find-teacher.dto";
import {SetTokenDto} from "./dto/set-token.dto";

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
        createdTeacher.phoneNumber = createTeacherDto.phoneNumber

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

    async findByName(name: string) {
        return this.teacherModel.findOne({'name': name}).exec();
    }

    async findByPhoneNumber(number: string) {
        return this.teacherModel.findOne({'phoneNumber': number}).exec();
    }

    async setAuthToken(setTokenDto: SetTokenDto) {
        return await this.teacherModel.findOne({'name': setTokenDto.name})
            .exec(async function (err: NativeError, teacher: ITeacher){
            teacher.authToken = setTokenDto.authToken
            return await teacher.save()
        })
    }
}
