import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData, SensorDataDocument } from './schemas/sensors.schema';
import { ActiveSensor, ActiveSensorDocument } from './schemas/activeSensor.schema';
import { timestamp } from 'rxjs';

@Injectable()
export class SensorsService {

  constructor(
    @InjectModel(SensorData.name) private sensorDataModel: Model<SensorDataDocument>,
    @InjectModel(ActiveSensor.name) private activeSensorModel: Model<ActiveSensorDocument>
  ) { }

  async findAll(): Promise<SensorData[]> {
    return this.sensorDataModel.find().exec();
  }

  async findByDeviceId(device_id: string, limit: number = 1): Promise<SensorData[]> {
    // Get the most recent entries for the specified device_id
    const results = await this.sensorDataModel
      .find({ device_id: device_id })
      .sort({ timestamp: -1 })  // Sort by timestamp descending (newest first)
      .limit(limit)            // Limit to the specified number (default: 1)
      .exec();

    return results;
  }

  async findStatusSensors(): Promise<ActiveSensor[]> {
    console.log('Finding active sensors...');
    console.log('Collection name:', this.activeSensorModel.collection.name);

    const uniqueDeviceIds = await this.activeSensorModel.distinct("device_id");
    console.log("Unique device IDs:", uniqueDeviceIds);

    const count = await this.activeSensorModel.countDocuments().exec();
    console.log('Total documents in collection:', count);

    const result = await this.activeSensorModel.aggregate([
      { $match: { device_id: { $in: uniqueDeviceIds } } }, // Filter only needed device IDs
      { $sort: { timestamp: -1 } }, // Sort by latest
      { $group: { _id: "$device_id", doc: { $first: "$$ROOT" } } }, // Get the latest document per device_id
      { $replaceRoot: { newRoot: "$doc" } } // Flatten output
    ]);

    return result;
  }
}
