import {Injectable, Logger} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {ConsultationService} from "../consultation/consultation.service";
import {IConsultation} from "../consultation/consultation.interface";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import {TeacherService} from "../teacher/teacher.service";
import {ITeacher} from "../teacher/teacher.interface";
import * as Request from "request"
import {IStudent} from "../students/student.interface";
import {StudentService} from "../students/student.service";

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);
    private readonly firebase = require("firebase-admin");

    constructor(
        private readonly consultationService: ConsultationService,
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService
    ) {}

    //TODO: поставить на каждый час
    @Cron(CronExpression.EVERY_HOUR)
    async handleMessage() {
        const moment = extendMoment(Moment);

        let consultation: IConsultation[] = await this.consultationService.all();
        let comingConsultations = consultation.filter(
            consultation => {
                const consultationTime = consultation.time;
                if (consultationTime === null) {
                    return;
                }

                const nowPlusSevenDays = moment().add( 7,'days')
                const nowPlusSevenDaysAndOneHour = moment(nowPlusSevenDays).add(2, 'hour')
                const range = moment.range(nowPlusSevenDays, nowPlusSevenDaysAndOneHour)

                return range.contains(consultationTime)
            }
        )

        for (const consultation of comingConsultations) {
            Logger.debug("Has one consultation")
            let message = "У Вас через неделю состоится " + consultation.consultationType + " " + consultation.name
            const teacher: ITeacher = await this.teacherService
                .findByName(consultation.teacher)
            await this.sendMessageToUser(teacher.phoneNumber, message)

            for (const student of consultation.students) {
                const studentModel: IStudent = await this.studentService.findByName(student)
                await this.sendMessageToUser(studentModel.phoneNumber, message)
            }
        }
    }

    async sendMessageToUser(phoneNumber: string, message: string) {
        Request({
            url: 'https://fcm.googleapis.com/fcm/send',
            method: 'POST',
            headers: {
                'Content-Type' :' application/json',
                'Authorization': 'key=' + 'AAAA-KnUpyk:APA91bEusJlcUZfYVZFONHiDIHa5xA2FkMgUs9SMzrhW2k-ejtTowSIjSKmxZwP7YAfUKPem97n5Fqrp7WsQ0lxyydNklP9-NqG8sIY5C444hMDDWVtvWr6_9yPM1Lk5Mht3d_KrFCto'
            },
            body: JSON.stringify(
                { "data": {
                        "message": message
                    },
                    "to" : phoneNumber
                }
            )
        }, function(error, response, body) {
            if (error) {
                console.error(error, response, body);
            }
            else if (response.statusCode >= 400) {
                console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
            }
            else {
                console.log('Done!')
                console.log(response)
            }
        });
    }
}
