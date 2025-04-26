import {
    BadRequestException,
    Logger,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/utils/swagger-builder.utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);
    SwaggerConfig.swaggerBuilder(app, config);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // * mapping class로 변환을 허용한다.
            transformOptions: {
                enableImplicitConversion: true, // * 암묵적으로 타입을 변환 시켜준다.
            },
            exceptionFactory: (errors: ValidationError[]) =>
                new BadRequestException({
                    resultCode: -1,
                    data: errors[0].constraints,
                }),
        }),
    );

    const port: number = +config.get('SERVER_PORT') || 3030;
    await app.listen(port, () => {
        Logger.log(`ANONYMOUS_BOARD SERVER WITH ${port}PORT CONNECTED`);
    });

    app.enableShutdownHooks();
}
bootstrap();
