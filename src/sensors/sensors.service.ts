import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData, SensorDataDocument } from './schemas/sensors.schema';
import { ActiveSensor, ActiveSensorDocument } from './schemas/activeSensor.schema';

@Injectable()
export class SensorsService {

  constructor(
    @InjectModel(SensorData.name) private sensorDataModel: Model<SensorDataDocument>,
    @InjectModel(ActiveSensor.name) private activeSensorModel: Model<ActiveSensorDocument>
  ) { }

  async findAll(): Promise<SensorData[]> {
    // Add projection to only return needed fields and limit results
    return this.sensorDataModel
      .find({}, { __v: 0 }) // Exclude version field
      .limit(1000) // Add reasonable limit
      .lean() // Return plain objects instead of Mongoose documents
      .exec();
  }

  async findByDeviceId(device_id: string, limit: number = 1): Promise<SensorData[]> {
    // Optimized with lean() and field projection
    const results = await this.sensorDataModel
      .find({ device_id }, { __v: 0 }) // Only find by device_id, exclude __v
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean() // Return plain objects for better performance
      .exec();

    return results;
  }

  async findStatusSensors(): Promise<ActiveSensor[]> {
    console.log('Finding active sensors...');

    // Optimized aggregation pipeline
    const result = await this.activeSensorModel.aggregate([
      // Sort first to use index efficiently
      { $sort: { device_id: 1, timestamp: -1 } },

      // Group by device_id and get the latest document
      {
        $group: {
          _id: "$device_id",
          latestDoc: { $first: "$$ROOT" }
        }
      },

      // Replace root to flatten the structure
      { $replaceRoot: { newRoot: "$latestDoc" } },

      // Project only needed fields (exclude MongoDB internal fields)
      {
        $project: {
          __v: 0
        }
      }
    ]).exec();

    console.log(`Found ${result.length} active sensors`);
    return result;
  }

  // Add new optimized method for getting latest sensor data per device
  async getLatestSensorDataPerDevice(deviceIds?: string[]): Promise<SensorData[]> {
    const matchStage = deviceIds?.length
      ? { $match: { device_id: { $in: deviceIds } } }
      : { $match: {} };

    return this.sensorDataModel.aggregate([
      matchStage,
      { $sort: { device_id: 1, timestamp: -1 } },
      {
        $group: {
          _id: "$device_id",
          latestData: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$latestData" } },
      { $project: { __v: 0 } }
    ]).exec();
  }

  // Add method to get sensor data within time range
  async findByDeviceIdAndTimeRange(
    device_id: string,
    startTime: number,
    endTime: number,
    limit: number = 100
  ): Promise<SensorData[]> {
    return this.sensorDataModel
      .find({
        device_id,
        timestamp: { $gte: startTime, $lte: endTime }
      }, { __v: 0 })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }
}
