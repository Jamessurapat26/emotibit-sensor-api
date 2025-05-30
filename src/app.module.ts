import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsModule } from './sensors/sensors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalDataModule } from './personal_data/personal_data.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/', {
      dbName: 'emotibit_data'
    }),
    SensorsModule,
    PersonalDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
