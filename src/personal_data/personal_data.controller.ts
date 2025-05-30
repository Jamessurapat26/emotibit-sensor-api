import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalDataService } from './personal_data.service';
import { CreatePersonalDatumDto } from './dto/create-personal_datum.dto';
import { UpdatePersonalDatumDto } from './dto/update-personal_datum.dto';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) { }

  @Post()
  create(@Body() createPersonalDatumDto: CreatePersonalDatumDto) {
    return this.personalDataService.create(createPersonalDatumDto);
  }

  @Get()
  findAll() {
    return this.personalDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalDatumDto: UpdatePersonalDatumDto) {
    return this.personalDataService.update(id, updatePersonalDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalDataService.remove(id);
  }
}
