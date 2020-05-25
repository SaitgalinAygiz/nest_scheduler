import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('UKRTB Api')
    .setDescription('Scheduler Api')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 80);
}
bootstrap();
