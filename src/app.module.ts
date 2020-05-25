import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import {GroupModule} from "./group/group.module";
import { StudentModule } from './students/student.module';
import {TeacherModule} from "./teacher/teacher.module";
import {ConsultationModule} from "./consultation/consultation.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    GroupModule,
    configModule,

    MongooseModule.forRoot(
      'mongodb+srv://saitgalin:M6uJ3ZiPm5By3sN@cluster0-mmftm.azure.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    TokenModule,
    MailModule,
    StudentModule,
      TeacherModule,
      ConsultationModule
  ],
})
export class AppModule {}
