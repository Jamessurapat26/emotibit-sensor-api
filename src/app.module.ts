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
      dbName: 'emotibit_data',
      maxPoolSize: 10, // Maximum number of connections
      minPoolSize: 5,  // Minimum number of connections
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      serverSelectionTimeoutMS: 5000, // How long to try to connect
      socketTimeoutMS: 45000, // How long a send or receive on a socket can take
      bufferCommands: false, // Disable mongoose buffering
    }),
    SensorsModule,
    PersonalDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
