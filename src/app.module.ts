import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { IndexModule } from './modules/index.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'prod.env',
        }),
        DatabaseModule,
        IndexModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
