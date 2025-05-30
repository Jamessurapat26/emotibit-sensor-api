import { Injectable } from '@nestjs/common';
import { CreatePersonalDatumDto } from './dto/create-personal_datum.dto';
import { UpdatePersonalDatumDto } from './dto/update-personal_datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonalData, PersonalDataDocument } from './schemas/personal_data.schema';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectModel(PersonalData.name) private personalDataModel: Model<PersonalDataDocument>,
  ) { }

  create(createPersonalDatumDto: CreatePersonalDatumDto) {
    const createdPersonalData = new this.personalDataModel(createPersonalDatumDto);
    return createdPersonalData.save();
  }

  findAll() {
    return `This action returns all personalData`;
  }

  findOne(id: string) {

    // Assuming you want to find a personal data entry by its ID
    return this.personalDataModel.find({ device_id: id }).exec();
  }

  update(id: string, updatePersonalDatumDto: UpdatePersonalDatumDto) {
    return this.personalDataModel.findOneAndUpdate({ device_id: id }, updatePersonalDatumDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.personalDataModel.deleteOne({ device_id: id }).exec();
  }
}
