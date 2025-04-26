import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { IndexModule } from 'src/modules/index.module';

export class SwaggerConfig {
    static swaggerBuilder(app: INestApplication, config: ConfigService) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Anonymous Board API Docs')
            .setVersion('1.0')
            .addApiKey(
                {
                    type: 'apiKey',
                    name: 'swagger-api-key',
                    in: 'header',
                },
                'swagger-api-key',
            )
            .build();

        const swaggerCustomOptions: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
        };

        const document = SwaggerModule.createDocument(app, swaggerConfig, {
            include: [IndexModule],
            deepScanRoutes: true,
        });

        SwaggerModule.setup(
            config.get('SWAGGER_END_POINT') ?? 'anonymous_board_swagger',
            app,
            document,
            swaggerCustomOptions,
        );
    }
}
