import { Module } from '@nestjs/common';
import { PersonalDataService } from './personal_data.service';
import { PersonalDataController } from './personal_data.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalData, PersonalDataSchema } from './schemas/personal_data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalData.name, schema: PersonalDataSchema },
    ]),
  ],
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
})
export class PersonalDataModule { }
