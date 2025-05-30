import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorData, SensorDataSchema } from './schemas/sensors.schema';
import { ActiveSensor, ActiveSensorSchema } from './schemas/activeSensor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorData.name, schema: SensorDataSchema },
      { name: ActiveSensor.name, schema: ActiveSensorSchema }
    ])
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule { }
