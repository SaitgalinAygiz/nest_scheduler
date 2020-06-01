import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IConsultation} from "./consultation.interface";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {MessageService} from "../message/message.service";
import * as Moment from 'moment';
import {extendMoment} from "moment-range";
import {ITeacher} from "../teacher/teacher.interface";
import {IStudent} from "../students/student.interface";
import {TeacherService} from "../teacher/teacher.service";
import {StudentService} from "../students/student.service";

@Injectable()
export class ConsultationService {
    private readonly admin

    constructor(
        @InjectModel('Consultation')
        private readonly consultationModel: Model<IConsultation>,
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService
    ) {
        this.admin = require("firebase-admin");
        const serviceAccount = {
            "type": "service_account",
            "project_id": "schedular-app-9225f",
            "private_key_id": "99050da9f8ecf544491eba34236ebf1ce142f44f",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpDoshQ2PQejJi\n+v2N/fvBaLODoa1bl/jgHC4wLApGYKHZEHFpsePx2c4VTFawXfIFkLa6ug5YOeZ4\nPD8IrogB7rP/f0MLrBgF95bS71Jh8HJ4R5a/d3tQBrjrjEPl4tfcWoSBJbLXr/JF\nV7hHxmtJ2vYz/ZQYsPvU58n2FpqLvOQHLISxie6MHb1KhCBAq+jtlygDM/jGX8c1\nT+xR2DfiO7XcyT2Szud09jwMk6JUgHZDHymb8fAZDrQCRYj9DL2O56fjc4D9rD/l\nTVpunMb18HzIgd7YXisU4TZftvvptXH7QR2rBRcxhrWAzzkI1afgwiPMJZe0upar\nfPs51goJAgMBAAECggEABcsowjdG+PaZGl/c4jmk1TOJ/w4NQifGrg0qhDjcJ3OJ\nabuTfBfDjAQmzioiCJRdoRUc/Vr3NyI7111u279Zy/bS3m6Ncl1/q25ZMenPo6mG\neMAGUZHjYleVTTA5mvZ0/JlHCXiB5PxOWT6YzdqQo8owLhGyhQ1FV3NpQ34HO5hA\nwLWZE/u7zLzE142dNcsuS15YfyNRCWvSNdcgmUW4lSwBuGt+1DtIEws9GCuIGaol\nonX1iM0jir+BjWonmHxewzKMTBAhbkGAcivo6Pla4IwRa9vw42HToTJNOJ6+bNVT\nXnZS3ru+71K1kRgElgCOB4P4sKB3TiQJ3xakR6pVgQKBgQDthyB43CI33jM/V7c6\nMUzrOleouAED18E+w7NdFVH8YLudB3UVJ5fMhHK0+NWpS601GRpvyGRvCxSdWl6w\nD5AaFRpPGLjuSzjJE/KdcCeRQJy/XBtZjaR0b74eCDalhWZL7JJdXP+5jHq3nveU\nZQwznTIBMUNZvIzlPrVUXicuiQKBgQC2ND8nU885ljuoUWbBKzDC1QN9xp2tPkVw\nzqinQprezEvEfp7Ur+CLGp0XacP5OwZ77JECq2Wb7espGMmOtEzPEP9wItwahmKv\niZ+mgBtEHBkdH/Pwpn14679iTm8neXeTPSHdOeAme8rgpPYW1qeS8hlC3+bBwlIP\nxNu/KI0fgQKBgQCPTIBoqdXzApjEVDT0ZJ3VJAOShEAIg3fQV9y0AZLOwcUuPTuD\noblQ528UgzLTyhYa/KQYYDtHStYLAGQzr4/uTGDs6ytWiAcgOGqcVPdqCCMIx5aw\ndmWK4Yc/MxFU1qAamgTLUrnsxTWb5cnTuwqbcPCkC4ZocvpFq4lV9t+IkQKBgA3l\nMiPHqngT0vzlKFb2+kMBh8Ch0wiRRS5zND19QN5Y6jZUCbzipNc28mAEuuNY8wek\nZPK1K4yWumZp84Ukju8DttdQcUS8lu4YKsrB3lJ1ahzkgPALYmpEYFYY8TUreEkM\nUnbSoRuOOUykh/f56tG0EOUeujRwo118f922M/0BAoGBAJjolqFOJz1V6KMvRSgE\n0Ci5tpHdpcp7jdXLlOZox81Z0+xTfv18cqWviNdwa5Nl63HBuBmBOSnyNpv/qjMR\ntzamtGnT96u+0ySvloeH1WXnEwJPIuJzhQyl18uwT92cO69Em0Jh2aTWHtSvFLiB\nb83PaObHEzOnIgCrFC6TdHnJ\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-4uzct@schedular-app-9225f.iam.gserviceaccount.com",
            "client_id": "110001624730053218891",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4uzct%40schedular-app-9225f.iam.gserviceaccount.com"
        };
        this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
            databaseURL: "https://schedular-app-9225f.firebaseio.com"
        });
    }

    async create(createConsultationDto: CreateConsultationDto) {
        let createdConsultation = new this.consultationModel()
        createdConsultation.name = createConsultationDto.name
        createdConsultation.time = new Date(createConsultationDto.time)
        createdConsultation.consultationType = createConsultationDto.consultationType
        createdConsultation.description = createConsultationDto.description
        createdConsultation.students = createConsultationDto.students
        createdConsultation.teacher = createConsultationDto.teacher

        const moment = extendMoment(Moment);

        const time = moment(createdConsultation.time)

        const message = 'Вам назначили ' + createdConsultation.name +
            ". Дата: " + time.format('MM/DD/YYYY') + " в " + time.format('hh:mm')
        Logger.debug(message)

        const teacher: ITeacher = await this.teacherService.findByName(createdConsultation.teacher)
            if (teacher.authToken !== null && teacher.authToken !== undefined) {
                await MessageService.sendMessageToUser(teacher.authToken, message, this.admin)
            }

            for (const student of createdConsultation.students) {
                const studentModel: IStudent = await this.studentService.findByName(student)
                if (studentModel.authToken !== null && studentModel.authToken !== undefined) {
                    await MessageService.sendMessageToUser(studentModel.authToken, message, this.admin)
                }
            }

        return await createdConsultation.save()
    }

    async all(): Promise<IConsultation[]> {
        return this.consultationModel.find();
    }

    //pizdec
    async findConsultationsByName(name: string): Promise<IConsultation[]> {
        let consultations = await this.consultationModel
            .find({'teacher': name})
            .exec()
        if (consultations !== undefined && consultations.length !== 0) {
            return consultations;
        }

        consultations = await this.consultationModel
            .find({'students': name})
            .exec()

        return consultations;
    }

}
