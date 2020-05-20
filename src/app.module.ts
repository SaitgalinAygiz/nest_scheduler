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

@Module({
  imports: [
    UserModule,
    AuthModule,
    GroupModule,
    configModule,

    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    TokenModule,
    MailModule,
    StudentModule,
      TeacherModule
  ],
})
export class AppModule {}
