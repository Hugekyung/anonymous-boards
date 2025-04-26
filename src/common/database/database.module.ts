import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get<string>('DB_HOST'),
                port: parseInt(config.get('DB_PORT') ?? '3306', 10),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                synchronize: config.get<boolean>('DB_SYNC') === true,
                logging: config.get<boolean>('DB_LOGGING') === true,
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
