import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';
import { IMailGunData } from './interfaces/mail.interface';

@Injectable()
export class MailService {

  private mg: Mailgun.Mailgun

  constructor(private readonly configService: ConfigService) {
    this.mg = Mailgun({
      apiKey: 'a4a49be01282bd9f407705275b5756b9-915161b7-4ad5a7c7',
      domain: 'https://api.mailgun.net/v3/sandbox252f33f8acb743f185fc275bcf888803.mailgun.org'
    })
  }

  send(data: IMailGunData): Promise<Mailgun.messages.SendResponse> {
    return new Promise((res, rej) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) {
          rej(error)
        }
        res(body)
      })
    })
  }

}
