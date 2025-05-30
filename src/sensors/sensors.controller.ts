import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get('active')
  findStatusSensors() {
    return this.sensorsService.findStatusSensors();
  }

  @Get(':device_id')
  findByDeviceId(@Param('device_id') device_id: string) {
    return this.sensorsService.findByDeviceId(device_id);
  }


}
