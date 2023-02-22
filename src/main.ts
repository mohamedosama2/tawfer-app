import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/http-exception.filter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import PaginatedDto from './utils/pagination/paginated.dto';
import { User } from './users/models/_user.model';
import { FilterQueryOptionsUser } from './users/dto/filterQueryOptions.dto';
import ParamsWithId from './utils/paramsWithId.dto';
import * as helmet from 'helmet';
import * as logger from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  // swagger config
  const options = new DocumentBuilder()
    .setTitle('NEST STRUCTURE')
    .setDescription('The Nest.js structure API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [PaginatedDto, User, FilterQueryOptionsUser, ParamsWithId],
  });
  SwaggerModule.setup('api', app, document, customOptions);
  await app.listen(80);
}
bootstrap();
